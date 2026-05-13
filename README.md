# Kerala Farmer AI Assistant

AI-powered personal assistant for Kerala farmers with real-time weather, crop information, and pesticide/fertilizer recommendations.

## Features
- 🌤️ Real-time weather forecast
- 🌾 Seasonal crop information
- 🧪 Pesticides & fertilizers guide
- 🤖 AI chatbot integration (Chatbase)
- 📱 Responsive design

## Setup Instructions

### Backend (Node.js)
```bash
cd backend
npm install
npm run dev
```

### Frontend (Next.js + React)
```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:3000

## Chatbase Integration
1. Go to `frontend/src/chatbase-integration/ChatbaseWidget.jsx`
2. Add your Chatbase chatbot ID
3. Uncomment the integration code

## Environment Variables
- Backend: `.env` (PORT, WEATHER_API_KEY)
- Frontend: `.env.local` (BACKEND_URL)

## Tech Stack
- Frontend: React, Next.js
- Backend: Node.js, Express
- AI: Chatbase integration ready
