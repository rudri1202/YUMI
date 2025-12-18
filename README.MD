YUMI – Bilingual Weather-Aware Voice Assistant

YUMI is a bilingual (Japanese & English) conversational assistant that helps users decide what essentials to carry when going out, based on real-time weather conditions.
The project demonstrates the integration of LLMs, external APIs, voice interfaces, and a clean frontend–backend architecture.

1. Core Idea

Users often check the weather before stepping out but still have to decide what to carry.
YUMI bridges this gap by:

Understanding natural language (text or voice)

Fetching live weather data

Generating practical, contextual suggestions

Supporting both Japanese and English users

2. Tech Stack
   Frontend

React (Vite) – UI and state management

Web Speech API

SpeechRecognition → Speech-to-Text

SpeechSynthesis → Text-to-Speech (Read Aloud)

Custom CSS – ChatGPT-style chat UI (no UI framework)

Backend

FastAPI (Python) – REST API

Open-Meteo API

Geocoding API (city → coordinates)

Weather API (current weather)

Groq LLM API

Natural language understanding

Weather-aware response generation

LLM

Groq-hosted LLaMA model

Prompt-engineered for:

Polite Japanese language norms

Emoji-free, friendly tone

Longer, informative responses

Structured JSON output

3. High-Level Architecture
   User
   │
   │ (Text / Voice)
   ▼
   Frontend (React)
   │
   │ POST /chat
   ▼
   Backend (FastAPI)
   │
   ├─ City extraction
   ├─ Weather fetch (Open-Meteo)
   ├─ Prompt construction
   └─ LLM inference (Groq)
   │
   ▼
   Frontend
   │
   ├─ Chat bubbles
   ├─ Product cards
   └─ Read-aloud (TTS)

4. End-to-End Flow

User types or speaks a message

Language toggle determines Japanese or English

City name is extracted from the query

Weather data is fetched using Open-Meteo

Weather context + user query are sent to the LLM

LLM returns:

A friendly, informative message

A list of recommended essentials

Frontend:

Displays the response

Shows product cards

Allows optional read-aloud

5. Frontend Architecture
   Key Components
   Component Responsibility
   App.jsx Global state (messages, language)
   Header.jsx Bot identity & language toggle
   ChatWindow.jsx Message routing by role
   UserMessage.jsx User message bubble
   BotMessage.jsx Assistant bubble + read aloud
   ChatInput.jsx Text input + microphone
   ProductCards.jsx Recommended items
   ThinkingBubble.jsx Loading indicator

Voice features are handled entirely on the frontend to reduce latency and backend complexity.

6. Backend Architecture
   main.py

API entry point

CORS configuration

/chat endpoint

weather.py

Calls Open-Meteo Geocoding and Weather APIs

Returns structured weather data

Fails gracefully for invalid locations

llm.py

Builds prompts

Calls Groq LLM

Ensures structured JSON output

prompt.py

Centralized system prompt

Controls tone, language, verbosity

Enforces emoji-free responses

7. Voice Design
   Speech-to-Text

Browser-native Web Speech API

Supports ja-JP and en-US

Voice input fills text box (user confirms before sending)

Text-to-Speech

Browser-native SpeechSynthesis

Language-aware voice selection

Subtle speaker icon per assistant message

8. Running the Project
   Backend

From the project root:

uvicorn backend.main:app --reload

Backend runs at:

http://localhost:8000

Swagger UI:

http://localhost:8000/docs

Frontend
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173

9. Design Decisions

Frontend-based voice handling → faster, no extra cost

Prompt-driven logic → minimal hard-coded rules

Stateless backend → simple and scalable

No emojis → avoids rendering and TTS issues

10. Conclusion

This project demonstrates:

Practical use of LLMs with external APIs

Voice-enabled web interaction

Clean separation of concerns

Real-world, user-centric problem solving

The architecture is intentionally simple, extensible, and focused on clarity and usefulness.
