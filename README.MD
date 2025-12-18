# YUMI – Weather-Aware Outing Assistant

YUMI is a bilingual AI chatbot (English / Japanese) that helps users decide **what essentials to carry before heading out**, based on **current weather conditions**, **location**, and **contextual intent**.

The system combines real-time weather APIs, large language models, and speech interfaces to deliver a smooth, practical, and user-friendly experience.

---

## Problem Statement

People often forget important items (umbrella, sunscreen, warm layers, etc.) because weather conditions change frequently and require context-based decisions.

YUMI solves this by:

- Understanding natural language input
- Fetching live weather data
- Generating tailored recommendations
- Communicating in a polite, friendly conversational style

---

## Key Features

- Weather-based essential item recommendations
- Bilingual support: English and Japanese
- Voice input using browser Speech-to-Text
- Read-aloud responses using Text-to-Speech
- LLM-powered contextual reasoning
- Product suggestion cards with quick links  
  (Amazon, Rakuten, Mercari, 7NOW)
- Chat-style UI inspired by modern assistants

---

## Tech Stack

### Frontend

- React (Vite)
- JavaScript
- Custom CSS
- Web Speech API (Speech-to-Text)
- Web Speech Synthesis API (Text-to-Speech)

### Backend

- Python
- FastAPI
- Uvicorn
- Requests

### AI & APIs

- Groq LLM API (LLaMA models)
- Open-Meteo Weather API
- Open-Meteo Geocoding API

---

## System Architecture

Frontend (React)
|
| REST API
v
Backend (FastAPI)
|
| Weather + Context
v
LLM (Groq)

---

## Application Flow

1. User inputs text or voice
2. Voice input is converted to text (if used)
3. Backend determines location (language-aware logic)
4. Weather data is fetched using Open-Meteo
5. Weather + user query are sent to the LLM
6. LLM generates:
   - Friendly explanation
   - List of essential items
7. Frontend displays:
   - Chat response
   - Product cards
   - Optional read-aloud audio

---

## Project Structure

backend/
├── main.py
├── services/
│ ├── llm.py
│ └── weather.py
└── utils/
└── prompt.py

src/
├── components/
├── services/
├── utils/
├── App.jsx
└── style.css

---

## Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
