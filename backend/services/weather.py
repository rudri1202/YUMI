import requests


def get_weather(city: str):
    """
    Fetches current weather for a given city using Open-Meteo.
    Returns None if city is invalid or API fails.
    """

    try:
        # 1️⃣ Geocoding API
        geo_res = requests.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            params={"name": city, "count": 1},
            timeout=5,
        ).json()

        if "results" not in geo_res or not geo_res["results"]:
            return None

        loc = geo_res["results"][0]
        lat, lon = loc["latitude"], loc["longitude"]

        # 2️⃣ Weather API
        weather_res = requests.get(
            "https://api.open-meteo.com/v1/forecast",
            params={
                "latitude": lat,
                "longitude": lon,
                "current_weather": True,
            },
            timeout=5,
        ).json()

        current = weather_res.get("current_weather")
        if not current:
            return None

        return {
            "city": loc.get("name", city),
            "temperature": current.get("temperature"),
            "windspeed": current.get("windspeed"),
            "weathercode": current.get("weathercode"),
        }

    except Exception:
        # Any network / parsing error → gracefully fail
        return None
