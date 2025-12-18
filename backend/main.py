from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.services.weather import get_weather
from backend.services.llm import (
    generate_response,
    extract_city_from_message,
)

app = FastAPI()

# -----------------------------
# CORS (Frontend ↔ Backend)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request Schema
# -----------------------------
class ChatRequest(BaseModel):
    query: str
    language: str  # "en" or "ja"

# -----------------------------
# Chat Endpoint
# -----------------------------
@app.post("/chat")
def chat(req: ChatRequest):
    """
    Flow:
    1️⃣ LLM extracts city (or NONE)
    2️⃣ Weather API called only if city exists
    3️⃣ LLM generates final response using weather context
    """

    # 1️⃣ Ask LLM to extract city
    city = extract_city_from_message(req.query, req.language)

    # 2️⃣ Fetch weather if city exists
    weather = get_weather(city) if city else None

    # 3️⃣ Generate MIYO response
    result = generate_response(
        query=req.query,
        lang=req.language,
        weather=weather,
    )

    return {
        "message": result["message"],
        "items": result["items"],
        "weather": weather,
    }
