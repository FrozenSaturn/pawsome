import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// --- Gemini API Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn("Warning: GEMINI_API_KEY is not defined in your .env file. PawBuddy chat might not function as expected.");
}
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const geminiModel = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

// --- In-memory Data Storage ---
let actionSnippets = [
  { id: 1, type: 'event', text: 'Join our pet vaccination camp in Birati this Sunday!' },
  { id: 2, type: 'urgent', text: 'Temporary fosters needed for 5 puppies rescued from Dum Dum Park' },
  { id: 3, type: 'adoption', text: 'Raja - a 2 year old indie dog looking for a loving home in North Dumdum' },
  { id: 4, type: 'event', text: 'Pet care workshop at North Dumdum community center next Saturday' }
];

let impactStories = [
  {
    id: 1,
    title: "Luna's Journey: From Streets to Forever Home",
    location: "Birati, North Dumdum",
    summary: "When Luna was found injured near Birati Railway Station, local volunteers rallied. She received care and found her forever family in North Dumdum.",
    fullStory: "Luna was discovered one rainy evening in July, hiding under a parked car near Birati Railway Station... (full story text)...",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
    author: "Maya D.",
    date: "2024-03-15" // Consistent date format
  },
  {
    id: 2,
    title: "Rani the Community Cat Gets a Second Chance",
    location: "Nagerbazar, Dumdum",
    summary: "Rani, a beloved community cat in Nagerbazar, was found with a severe eye infection. Coordinated efforts from residents ensured she got timely treatment and a safe recovery spot.",
    fullStory: "Rani was a familiar face in the Nagerbazar market area... (full story text)...",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    author: "Mr. Banerjee",
    date: "2024-01-20"
  },
  {
    id: 3,
    title: "Lost & Found: Max Reunites with Family",
    location: "Dum Dum Cantonment",
    summary: "Max, a playful Labrador, went missing during a walk. Thanks to a quick alert on the platform and vigilant community members, he was reunited within hours.",
    fullStory: "The Das family was distraught when their 3-year-old Labrador, Max, bolted... (full story text)...",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
    author: "Priya S.",
    date: "2024-04-05"
  }
];

let localGroups = [
  {
    id: 1,
    name: "North Dumdum Morning Walkers",
    image: "https://images.unsplash.com/photo-1601758174944-c2926b1ce22e?auto=format&fit=crop&w=600&h=350",
    members: 24,
    nextMeetup: "Sunday, 7:00 AM",
    location: "Dumdum Park",
    description: "Early morning dog walking group for North Dumdum pet parents."
  },
  // ... other groups
];

let adoptablePets = [
  {
    id: 1,
    name: "Raja",
    type: "Dog",
    breed: "Indian Pariah",
    age: "2 years",
    gender: "Male",
    description: "Raja is a friendly, energetic boy who loves playing fetch...",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
    contact: "Maya D. (9876543210)",
    location: "North Dumdum"
  },
  // ... other pets
];

let mapResources = [
    {
    id: 1,
    name: "Dr. Sharma's Pet Clinic",
    type: 'vet',
    address: "24B, Jessore Road, North Dumdum",
    contact: "+91 98765 43210",
    hours: "Mon-Sat: 10AM - 8PM",
    description: "Full-service veterinary clinic...",
    addedBy: "Priya M.",
    latitude: 22.6512,
    longitude: 88.4035
  },
  // ... other resources (from ResourceMap.tsx MOCK_RESOURCES_WITH_COORDS)
];

let knowledgeBaseArticles = [
  {
    id: 1,
    title: "Vets in North Dumdum: A Comprehensive Directory",
    excerpt: "Detailed information about veterinary clinics in North Dumdum...",
    author: "Dr. Sharma",
    category: "Healthcare",
    fullContent: "Full content of the vet directory..." // Add full content for display
  },
  // ... other articles
];

let actionBoardPosts = [
   {
    id: 1,
    type: 'transport',
    title: "Need transport for injured stray dog to vet",
    description: "Found an injured stray near Dumdum metro station...",
    location: "Near Dumdum Metro Station",
    postedBy: "Amit S.",
    postedTime: "2 hours ago", // For dynamic time, you'd store a timestamp
    status: 'active'
  },
  // ... other posts
];

// --- Helper for new IDs ---
const getNextId = (arr) => arr.length > 0 ? Math.max(...arr.map(item => item.id)) + 1 : 1;

// --- API Endpoints ---

// GET Endpoints (existing)
app.get('/api/action-snippets', (req, res) => res.json(actionSnippets));
app.get('/api/impact-stories', (req, res) => res.json(impactStories));
app.get('/api/impact-stories/:id', (req, res) => {
  const story = impactStories.find(s => s.id === parseInt(req.params.id));
  story ? res.json(story) : res.status(404).json({ error: 'Story not found' });
});
app.get('/api/local-groups', (req, res) => res.json(localGroups));
app.get('/api/adoptable-pets', (req, res) => res.json(adoptablePets));
app.get('/api/resources', (req, res) => res.json(mapResources));
app.get('/api/knowledge-base', (req, res) => res.json(knowledgeBaseArticles));
app.get('/api/action-board', (req, res) => res.json(actionBoardPosts));


// POST Endpoints (New)

// List a new pet for adoption
app.post('/api/adoptable-pets', (req, res) => {
  const { name, type, breed, age, gender, description, image, contact, location } = req.body;
  if (!name || !type || !breed || !age || !gender || !description || !contact || !location) {
    return res.status(400).json({ error: 'Missing required fields for adoptable pet.' });
  }
  const newPet = {
    id: getNextId(adoptablePets),
    name, type, breed, age, gender, description,
    image: image || `https://placekitten.com/400/300?image=${Date.now()}`, // Default image if none provided
    contact, location
  };
  adoptablePets.push(newPet);
  console.log("Added new adoptable pet:", newPet);
  res.status(201).json({ message: 'Pet listed successfully!', pet: newPet });
});

// Submit a new impact story
app.post('/api/impact-stories', (req, res) => {
  const { title, location, summary, fullStory, image, author } = req.body;
   if (!title || !location || !summary || !fullStory || !author) {
    return res.status(400).json({ error: 'Missing required fields for impact story.' });
  }
  const newStory = {
    id: getNextId(impactStories),
    title, location, summary, fullStory,
    image: image || `https://source.unsplash.com/random/600x400?pets,community&sig=${Date.now()}`,
    author,
    date: new Date().toISOString().split('T')[0] // Current date
  };
  impactStories.push(newStory);
  console.log("Added new impact story:", newStory);
  res.status(201).json({ message: 'Impact story submitted successfully!', story: newStory });
});

// Submit volunteer interest
app.post('/api/volunteer-interest', (req, res) => {
  const volunteerData = req.body;
  if (!volunteerData.name || !volunteerData.email || !volunteerData.interests || volunteerData.interests.length === 0) {
      return res.status(400).json({ error: 'Name, email, and at least one interest are required.' });
  }
  console.log("New Volunteer Interest Received:", volunteerData);
  // In a real app, save to DB or send email
  res.status(200).json({ message: 'Volunteer interest form submitted successfully! We will contact you soon.' });
});

// Add a new resource to the map
app.post('/api/resources', (req, res) => {
  const { name, type, address, contact, hours, description, latitude, longitude, addedBy } = req.body;
  if (!name || !type || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'Name, type, address, latitude, and longitude are required for resources.' });
  }
  const newResource = {
    id: getNextId(mapResources),
    name, type, address, contact, hours, description, latitude, longitude,
    addedBy: addedBy || "Community Submission"
  };
  mapResources.push(newResource);
  console.log("Added new map resource:", newResource);
  res.status(201).json({ message: 'Resource added successfully!', resource: newResource });
});

// Add a new local group
app.post('/api/local-groups', (req, res) => {
    const { name, image, location, description } = req.body;
    if (!name || !location || !description) {
        return res.status(400).json({ error: 'Name, location, and description are required for local groups.' });
    }
    const newGroup = {
        id: getNextId(localGroups),
        name,
        image: image || `https://source.unsplash.com/random/600x350?community,pets&sig=${Date.now()}`,
        members: 1, // Starts with 1 member (the creator)
        nextMeetup: null, // Can be updated later
        location,
        description
    };
    localGroups.push(newGroup);
    console.log("Added new local group:", newGroup);
    res.status(201).json({ message: 'Local group created successfully!', group: newGroup });
});

// Add a new knowledge base article
app.post('/api/knowledge-base', (req, res) => {
    const { title, category, excerpt, fullContent, author } = req.body;
    if (!title || !category || !fullContent) { // Excerpt can be auto-generated or optional
        return res.status(400).json({ error: 'Title, category, and full content are required for articles.' });
    }
    const newArticle = {
        id: getNextId(knowledgeBaseArticles),
        title,
        category,
        excerpt: excerpt || fullContent.substring(0, 150) + (fullContent.length > 150 ? '...' : ''),
        fullContent,
        author: author || "Community Contributor"
    };
    knowledgeBaseArticles.push(newArticle);
    console.log("Added new knowledge base article:", newArticle);
    res.status(201).json({ message: 'Article added successfully!', article: newArticle });
});

// Add a new action board post
app.post('/api/action-board', (req, res) => {
    const { type, title, description, location, postedBy } = req.body;
    if (!type || !title || !description || !location) {
        return res.status(400).json({ error: 'Type, title, description, and location are required for action posts.' });
    }
    const newPost = {
        id: getNextId(actionBoardPosts),
        type,
        title,
        description,
        location,
        postedBy: postedBy || "Anonymous User",
        postedTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ", " + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short'}), // More readable time
        status: 'active'
    };
    actionBoardPosts.push(newPost);
    console.log("Added new action board post:", newPost);
    res.status(201).json({ message: 'Action post created successfully!', post: newPost });
});


// PawBuddy Chat Endpoint (Gemini)
app.post('/api/pawbuddy-chat', async (req, res) => {
  // ... (PawBuddy logic - keep as is)
  const userMessage = req.body.message;

  if (!GEMINI_API_KEY || !genAI || !geminiModel) {
    console.error("Gemini API not initialized. Check API Key.");
    return res.status(500).json({ response: "Sorry, I'm not available right now due to a configuration issue." });
  }

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const chat = geminiModel.startChat({
      generationConfig,
      safetySettings,
      history: [ 
          {
            role: "user",
            parts: [{ text: "You are PawBuddy, a helpful and friendly AI assistant for the Pawsome Dumdum Connect website. This website serves the North Dumdum area in West Bengal, India. Your goal is to assist users with pet-related queries specific to this local area. Provide concise, helpful, and empathetic answers. If a query is outside of pet-care or the North Dumdum locality, politely state you cannot help with that specific request but can help with local pet needs." }],
          },
          {
            role: "model",
            parts: [{ text: "Okay, I understand! I'm PawBuddy, your friendly pet assistant for North Dumdum. How can I phelp you with your pets in our local area today?" }],
          }
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const geminiResponse = result.response;
    const textResponse = geminiResponse.text();

    res.json({ response: textResponse });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ response: "Sorry, I encountered an error trying to respond. Please try again." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});