# Pawsome Dumdum Connect

Pawsome Dumdum Connect is a hyper-local community platform focused on pet welfare, resources, adoption, and community engagement for the **North Dumdum area in West Bengal, India.** It aims to connect pet lovers, volunteers, and those looking to adopt, fostering a strong local pet-friendly ecosystem.

## Key Features

* **Homepage:** Dynamic overview with local action snippets, "How to Help," an interactive "Pet Pulse Map" (Leaflet), and featured local impact stories.
* **North Dumdum Network:** The core community hub featuring:
    * **Local Groups:** Discover and (mock) create local pet-related groups.
    * **Resource Map:** Interactive Leaflet map for community-sourced local pet resources.
    * **Action Board:** For immediate local needs and assistance.
    * **Knowledge Base:** Community-driven pet care information relevant to North Dumdum.
* **Adopt Page:** View and filter adoptable pets, with a form to (mock) list new pets.
* **Volunteer Page:** Information on volunteering and an interest form.
* **Stories Page:** Display and (mock) submit local impact stories.
* **PawBuddy AI Chatbot:** Integrated with Google Gemini API for helpful, AI-powered assistance.
* **Mock Backend:** Serves data and handles form submissions for a dynamic prototype experience.

## Tech Stack

* **Frontend:** Vite, React, TypeScript, Tailwind CSS, Shadcn UI, React Router DOM, TanStack Query (React Query), Leaflet, React-Leaflet.
* **Backend (Mock/Development):** Node.js, Express.js.
* **AI Chatbot:** Google Gemini API.

## Prerequisites

* Node.js (v18.x or later recommended)
* npm or yarn

## Setup & Running

1.  **Clone the repository (Conceptual):**
    ```bash
    # git clone [your-repo-url]
    # cd pawsome-dumdum-connect
    ```

2.  **Frontend (`pet-friendly-city-nd` directory from previous structure):**
    ```bash
    cd [frontend-directory-name] # e.g., pet-friendly-city-nd
    npm install
    npm run dev
    ```
    The frontend will typically run on `http://localhost:5173`.

3.  **Backend (`pet-friendly-city-nd-backend` directory from previous structure):**
    * Create a `.env` file in the backend directory.
    * Add your Google Gemini API key to the `.env` file:
        ```env
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
        ```
    * Install dependencies and run:
        ```bash
        cd [backend-directory-name] # e.g., pet-friendly-city-nd-backend
        npm install
        node server.js
        ```
    The backend will typically run on `http://localhost:3001`.

## Available Scripts (Frontend)

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the app for production.
* `npm run lint`: Lints the codebase.
* `npm run preview`: Serves the production build locally.

## Mock API Endpoints (Backend - http://localhost:3001)

* `GET /api/action-snippets`
* `GET /api/impact-stories`
* `POST /api/impact-stories`
* `GET /api/local-groups`
* `POST /api/local-groups`
* `GET /api/adoptable-pets`
* `POST /api/adoptable-pets`
* `POST /api/volunteer-submissions`
* `POST /api/pawbuddy-chat` (Proxies to Gemini API)
* *(And others as defined in `server.js`)*

---

*This project was inspired by the "Pet-Friendly City Campaign" and aims to provide a unique, hyper-local solution for the North Dumdum community. Content ideas from `collegetips.in/pfc/` were considered during initial ideation.*
