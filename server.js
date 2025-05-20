
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data
const actionSnippets = [
  { id: 1, type: 'event', text: 'Join our pet vaccination camp in Birati this Sunday!' },
  { id: 2, type: 'urgent', text: 'Temporary fosters needed for 5 puppies rescued from Dum Dum Park' },
  { id: 3, type: 'adoption', text: 'Raja - a 2 year old indie dog looking for a loving home in North Dumdum' },
  { id: 4, type: 'event', text: 'Pet care workshop at North Dumdum community center next Saturday' }
];

const impactStories = [
  {
    id: 1,
    title: "Luna's Journey: From Streets to Forever Home",
    location: "Birati, North Dumdum",
    summary: "When Luna was found injured near Birati Railway Station in North Dumdum, local volunteers rallied together. Through community support, she received medical care, rehabilitation, and eventually found her forever family right here in North Dumdum.",
    fullStory: "Luna was discovered one rainy evening in July, hiding under a parked car near Birati Railway Station. She had a badly infected wound on her leg and was severely malnourished. Amit, a local resident, noticed her whimpering and immediately posted on the North Dumdum Pet Network's Action Board. Within hours, three community members responded. Priya offered to transport Luna to Dr. Sharma's clinic, while Rahul provided a temporary foster space. Dr. Sharma treated Luna's wound and provided necessary vaccinations at a subsidized rate for the rescue case. The community raised funds for her treatment through the Network. After two months of recovery in Rahul's care, Luna was featured in an adoption drive. The Chatterjee family from Dum Dum Park fell in love with her resilient spirit and welcomed her into their home. Today, Luna enjoys long walks in the neighborhood park and has become an ambassador for local adoption, often appearing at community events to inspire others.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    author: "Maya D.",
    date: "March 15, 2023"
  }
];

const localGroups = [
  {
    id: 1,
    name: "North Dumdum Morning Walkers",
    image: "https://images.unsplash.com/photo-1601758174944-c2926b1ce22e",
    members: 24,
    nextMeetup: "Sunday, 7:00 AM",
    location: "Dumdum Park",
    description: "Early morning dog walking group for North Dumdum pet parents. We meet regularly for social walks and pet exercise."
  },
  {
    id: 2,
    name: "Birati Cat Welfare",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    members: 18,
    nextMeetup: null,
    location: "Birati, North Dumdum",
    description: "Dedicated to cat welfare in Birati area. We help with TNR programs, cat adoptions and provide care information."
  },
  {
    id: 3,
    name: "Dumdum Pet Parents",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    members: 32,
    nextMeetup: "Saturday, 5:30 PM",
    location: "Community Garden, North Dumdum",
    description: "A general group for all pet parents in North Dumdum. We share resources, organize meetups and support each other."
  }
];

const adoptablePets = [
  {
    id: 1,
    name: "Raja",
    type: "Dog",
    breed: "Indian Pariah",
    age: "2 years",
    gender: "Male",
    description: "Raja is a friendly, energetic boy who loves playing fetch and going for walks. He's good with children and would make a perfect family companion.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    contact: "Maya D. (9876543210)",
    location: "North Dumdum"
  },
  {
    id: 2,
    name: "Mithu",
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "1 year",
    gender: "Female",
    description: "Mithu is a gentle, affectionate cat who enjoys lounging in sunny spots and playing with string toys. She's litter trained and good with other cats.",
    image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d",
    contact: "Priya M. (8765432109)",
    location: "Birati, North Dumdum"
  },
  {
    id: 3,
    name: "Bruno",
    type: "Dog",
    breed: "Labrador Mix",
    age: "3 years",
    gender: "Male",
    description: "Bruno is a calm, well-behaved dog who loves cuddles and short walks. He'd be perfect for a senior owner or someone looking for a low-energy pet.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    contact: "Rahul S. (7654321098)",
    location: "Dum Dum Park"
  }
];

// Mock AI chatbot responses
const chatbotResponses = {
  'veterinarian': 'Dr. Sharma\'s Pet Clinic at 24B, Jessore Road, North Dumdum is highly recommended by our community. They're open Mon-Sat: 10AM - 8PM and can be reached at +91 98765 43210.',
  'rescue': 'If you've found an animal that needs rescue in North Dumdum, please post on our Action Board with details and location. Our community members will help coordinate rescue efforts.',
  'adoption': 'Check our Adoption page for pets currently available in North Dumdum. You can also join our Birati Cat Welfare group if you're specifically interested in adopting a cat.',
  'volunteer': 'We have several volunteer opportunities in North Dumdum! You can help with transport, fostering, or participating in awareness campaigns. Check our Volunteer page for details.',
  'default': 'Hi! I\'m PawBuddy, your North Dumdum Pet Assistant. I can help with information about local veterinarians, pet adoption, volunteering, or pet-friendly places in North Dumdum. How can I help you today?'
};

// API Routes
app.get('/api/action-snippets', (req, res) => {
  res.json(actionSnippets);
});

app.get('/api/impact-stories', (req, res) => {
  res.json(impactStories);
});

app.get('/api/impact-stories/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const story = impactStories.find(s => s.id === id);
  
  if (story) {
    res.json(story);
  } else {
    res.status(404).json({ error: 'Story not found' });
  }
});

app.get('/api/local-groups', (req, res) => {
  res.json(localGroups);
});

app.get('/api/adoptable-pets', (req, res) => {
  res.json(adoptablePets);
});

// Simple keyword-based chatbot response
app.post('/api/pawbuddy-chat', (req, res) => {
  const message = req.body.message.toLowerCase();
  let response;
  
  if (message.includes('vet') || message.includes('doctor') || message.includes('clinic')) {
    response = chatbotResponses.veterinarian;
  } else if (message.includes('rescue') || message.includes('help animal') || message.includes('found stray')) {
    response = chatbotResponses.rescue;
  } else if (message.includes('adopt') || message.includes('adoption')) {
    response = chatbotResponses.adoption;
  } else if (message.includes('volunteer') || message.includes('help out')) {
    response = chatbotResponses.volunteer;
  } else {
    response = chatbotResponses.default;
  }
  
  res.json({ response });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
