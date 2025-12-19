import os
import json
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

from backend.utils.prompt import system_prompt

# Load env
BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

MODEL = "llama-3.3-70b-versatile"  # ✅ supported


def get_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY not set")
    return Groq(api_key=api_key)


# 🔹 1️⃣ CITY EXTRACTION USING LLM
def extract_city_from_message(text: str, lang: str) -> str | None:
    client = get_client()

    prompt = (
        f'次の文章から都市名だけを抽出してください。なければ "NONE" と返してください。\n\n"{text}"'
        if lang == "ja"
        else f'Extract ONLY the city name from this sentence. If none, reply with "NONE".\n\n"{text}"'
    )

    res = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        max_tokens=10,
        messages=[{"role": "user", "content": prompt}],
    )

    city = res.choices[0].message.content.strip()
    if city.upper() == "NONE":
        return None
    return city


# 🔹 2️⃣ MAIN RESPONSE GENERATOR
def generate_response(query: str, lang: str, weather: dict | None):
    client = get_client()

    weather_context = (
        f"""
Weather info:
City: {weather.get('city')}
Temperature: {weather.get('temperature')}°C
Wind: {weather.get('windspeed')} km/h
"""
        if weather
        else "Weather info: NOT AVAILABLE"
    )

    user_prompt = f"""
User message:
"{query}"

{weather_context}

Rules:
- If weather info is NOT available:
  - Politely ask for user's city or location
  - Use friendly emojis 🌸✨
- If weather info IS available:
  - Suggest practical essentials based on weather
  - Keep it short and friendly

Return ONLY valid JSON:
{{
  "message": "string",
  "items": ["item1", "item2"]
}}
"""

    res = client.chat.completions.create(
        model=MODEL,
        temperature=0.8,
        messages=[
            {"role": "system", "content": system_prompt(lang, weather)},
            {"role": "user", "content": user_prompt},
        ],
    )

    raw = res.choices[0].message.content.strip()

    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        parsed = {"message": raw, "items": []}

    return parsed
