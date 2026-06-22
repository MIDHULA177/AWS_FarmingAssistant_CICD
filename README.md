# 🌾 KarshakaAI — Kerala Farmer AI Assistant

> AI-powered agricultural assistant built for Kerala farmers — providing real-time weather, crop advisory, disease detection, market prices, and government scheme information in one platform.

---

## 🧠 Problem Statement

Kerala farmers face fragmented access to critical agricultural information. Weather updates, crop advice, disease diagnosis, market prices, and government schemes are spread across multiple platforms — most of which are not accessible in Malayalam or optimized for rural users.

**KarshakaAI** solves this by unifying all these services into a single, mobile-friendly web application with AI at its core.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌤️ Weather Forecast | Real-time weather by location or GPS — temperature, humidity, wind, rainfall |
| 🌾 Crop Advisory | Season-wise crop recommendations specific to Kerala (Monsoon / Winter / Summer) |
| 🔬 Disease Detection | Upload a leaf photo → CNN model identifies disease + recommends treatment |
| 🧪 Fertilizer & Pesticide Guide | Dosage, usage, and application tips for organic and chemical inputs |
| 💰 Market Prices | Live crop prices from major Kerala markets (Kochi, Thrissur, Palakkad, etc.) |
| 🏛️ Government Schemes | PM-KISAN, Fasal Bima Yojana, Kisan Credit Card, Kerala-specific subsidies |
| 🤖 AI Chat Assistant | 24/7 Chatbase-powered chatbot for farming guidance in Malayalam |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    User (Browser)                   │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│           Frontend — Next.js (Netlify)              │
│   Pages: Home, Weather, Crops, Disease Detection,   │
│          Market Prices, Schemes, AI Assistant       │
└──────────┬──────────────────────────┬───────────────┘
           │                          │
┌──────────▼───────────┐   ┌──────────▼───────────────┐
│  Backend — Node.js   │   │   ML Service — Flask      │
│  Express (Render)    │   │   TensorFlow CNN (Render) │
│                      │   │                           │
│  - Auth (JWT)        │   │  - Plant disease classify │
│  - Weather API proxy │   │  - 38 disease categories  │
│  - Crops / Schemes   │   │  - Treatment suggestions  │
│  - Market Prices     │   │                           │
└──────────┬───────────┘   └───────────────────────────┘
           │
┌──────────▼───────────┐   ┌───────────────────────────┐
│   MongoDB Atlas      │   │   OpenWeatherMap API       │
│   (User Auth Data)   │   │   (Real-time Weather)      │
└──────────────────────┘   └───────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js** (React) — SSR, routing
- **CSS Modules** — scoped, theme-consistent styling
- Deployed on **Netlify**

### Backend
- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — user data
- **JWT + bcryptjs** — authentication
- **Axios** — weather API proxy
- Deployed on **Render**

### ML Service
- **Python + Flask** — ML API server
- **TensorFlow / Keras** — CNN model
- **NumPy + Pillow** — image preprocessing
- Classifies **38 plant disease categories**

### External Services
- **OpenWeatherMap** — real-time weather
- **Chatbase** — Malayalam AI chatbot

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- Python >= 3.9
- MongoDB Atlas account
- OpenWeatherMap API key

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/karshaka-ai.git
cd karshaka-ai
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

### 4. ML Service setup
```bash
cd backend
pip install -r requirements.txt
python ml_api.py
```

Visit: `http://localhost:3000`

---

## ⚙️ Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<your_jwt_secret>
WEATHER_API_KEY=<your_openweathermap_api_key>
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_BACKEND_URL=<your_render_backend_url>
NEXT_PUBLIC_CHATBASE_ID=<your_chatbase_bot_id>
```

---

## 📁 Project Structure

```
karshaka-ai/
├── backend/
│   ├── server.js          # Express API (auth, weather, crops, schemes)
│   ├── ml_api.py          # Flask ML API for disease detection
│   ├── plant_disease_cnn.py  # CNN model training script
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/         # Next.js pages
│   │   ├── components/    # Reusable UI components
│   │   └── styles/        # CSS Modules
│   └── public/
├── docker-compose.yml     # Local multi-container setup
├── buildspec.yml          # AWS CodeBuild pipeline
├── appspec.yml            # AWS CodeDeploy (ECS)
└── README.md
```

---

## 🐳 Run with Docker

```bash
docker-compose up --build
```

Starts both frontend (port 3000) and backend (port 5000) in containers.

---

## 🌍 Deployment

| Service | Platform |
|---|---|
| Frontend | Netlify |
| Backend | Render |
| Database | MongoDB Atlas |
| ML Model | Render (Python) |

---

## 👥 Team

Built with ❤️ for Kerala farmers as part of a Design Thinking project.

---

## 📄 License

MIT License
