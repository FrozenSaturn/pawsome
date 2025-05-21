import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini API Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not defined in your .env file.");
  // process.exit(1); // Optionally exit if API key is critical
}
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const geminiModel = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null; // Or your preferred model

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


// Mock Data (keeping this for other endpoints for now)
const actionSnippets = [
  { id: 1, type: 'event', text: 'Join our pet vaccination camp in Birati this Sunday!' },
  { id: 2, type: 'urgent', text: 'Temporary fosters needed for 5 puppies rescued from Dum Dum Park' },
  { id: 3, type: 'adoption', text: 'Raja - a 2 year old indie dog looking for a loving home in North Dumdum' },
  { id: 4, type: 'event', text: 'Pet care workshop at North Dumdum community center next Saturday' }
];
// ... (keep other mock data: impactStories, localGroups, adoptablePets)
const impactStories = [
  {
    id: 1,
    title: "Luna's Journey: From Streets to Forever Home",
    location: "Birati, North Dumdum",
    summary: "When Luna was found injured near Birati Railway Station, local volunteers rallied. She received care and found her forever family in North Dumdum.",
    fullStory: "Luna was discovered one rainy evening in July, hiding under a parked car near Birati Railway Station. She had a badly infected wound on her leg and was severely malnourished. Amit, a local resident, noticed her whimpering and immediately posted on the North Dumdum Pet Network's Action Board. Within hours, three community members responded. Priya offered to transport Luna to Dr. Sharma's clinic, while Rahul provided a temporary foster space. Dr. Sharma treated Luna's wound and provided necessary vaccinations at a subsidized rate for the rescue case. The community raised funds for her treatment through the Network. After two months of recovery in Rahul's care, Luna was featured in an adoption drive. The Chatterjee family from Dum Dum Park fell in love with her resilient spirit and welcomed her into their home. Today, Luna enjoys long walks in the neighborhood park and has become an ambassador for local adoption, often appearing at community events to inspire others.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
    author: "Maya D.",
    date: "March 15, 2024"
  },
  {
    id: 2,
    title: "Rani the Community Cat Gets a Second Chance",
    location: "Nagerbazar, Dumdum",
    summary: "Rani, a beloved community cat in Nagerbazar, was found with a severe eye infection. Coordinated efforts from residents ensured she got timely treatment and a safe recovery spot.",
    fullStory: "Rani was a familiar face in the Nagerbazar market area, fed by several shopkeepers. When she appeared one morning with a badly swollen eye, Mrs. Ghosh, a local resident, immediately posted on the Pawsome Dumdum Connect Action Board. Several people offered advice and contacts. A young volunteer, Sameer, offered to help catch Rani gently. They managed to take her to a nearby vet who diagnosed a severe infection requiring daily medication. The shopkeepers pooled money for her treatment. During her recovery, Rani stayed at Mrs. Ghosh's covered verandah. After a few weeks, Rani's eye healed completely, and she's back to her old self, a testament to the Nagerbazar community's quick action and care.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    author: "Mr. Banerjee",
    date: "January 20, 2024"
  },
  {
    id: 3,
    title: "Lost & Found: Max Reunites with Family",
    location: "Dum Dum Cantonment",
    summary: "Max, a playful Labrador, went missing during a walk near Dum Dum Cantonment. Thanks to a quick alert on the platform and vigilant community members, he was reunited with his anxious family within hours.",
    fullStory: "The Das family was distraught when their 3-year-old Labrador, Max, bolted during his evening walk near the Cantonment area. They immediately posted Max's photo and details on Pawsome Dumdum Connect. The post was shared widely across local WhatsApp groups through the network. Just two hours later, a resident living a few blocks away recognized Max from the shared post when he saw him wandering near a local park. He contacted Mr. Das, and the tearful reunion happened shortly after. The family expressed immense gratitude for the platform and the quick response from the North Dumdum community.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
    author: "Priya S.",
    date: "April 05, 2024"
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
  // ... other groups
];

const adoptablePets = [
  {
    id: 1,
    name: "Raja",
    type: "Dog",
    breed: "Indian Pariah",
    age: "2 years",
    // ... other pet details
    location: "North Dumdum"
  },
  // ... other pets
];


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

// Updated PawBuddy Chat Endpoint using Gemini
app.post('/api/pawbuddy-chat', async (req, res) => {
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
      history: [ // You can build up a history for more contextual conversations
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!GEMINI_API_KEY) {
    console.warn("Warning: GEMINI_API_KEY is not set. PawBuddy chat will not function correctly.");
  }
});