import React from "react";

export default function WeatherPill({ weather }) {
  if (!weather) return null;

  return (
    <div className="weather-pill">
      <span className="weather-city">{weather.city}</span>
      <span className="weather-temp">
        {weather.temperature}°C
      </span>
      <span className="weather-sep">•</span>
      <span className="weather-wind">
        💨 {weather.windspeed} km/h
      </span>
    </div>
  );
}