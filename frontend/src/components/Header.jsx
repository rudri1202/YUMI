import React from "react";

export default function Header({ language, onLanguageChange }) {
  return (
    <header className="header">
      {/* Bot Identity */}
      <div className="header-left">
        <div className="bot-avatar">🌸</div>

        <div className="bot-text">
          <div className="bot-name">YUMI</div>
          <div className="bot-subtitle">
            {language === "ja"
              ? "天気に合わせて外出をサポートします"
              : "Helping you prepare for the day with weather-aware tips"}
          </div>
        </div>
      </div>

      {/* Language Capsule Toggle */}
      <div className="lang-capsule">
        <button
          className={`lang-option ${language === "ja" ? "active" : ""}`}
          onClick={() => onLanguageChange("ja")}
        >
          日本語
        </button>

        <button
          className={`lang-option ${language === "en" ? "active" : ""}`}
          onClick={() => onLanguageChange("en")}
        >
          English
        </button>

        {/* Sliding indicator */}
        <div
          className={`lang-indicator ${
            language === "ja" ? "left" : "right"
          }`}
        />
      </div>
    </header>
  );
}
