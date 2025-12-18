import React, { useState } from "react";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import WeatherPill from "./components/WeatherPill";

export default function App() {
  const [language, setLanguage] = useState("ja"); // "ja" | "en"
  const [weather, setWeather] = useState(null); // ✅ MUST be inside component

  const getWelcomeMessage = (lang) => ({
    role: "assistant",
    content:
      lang === "ja"
        ? "こんにちは🌸 ユミです。今日はどちらに行かれますか？"
        : " Hi 🌸 I’m YUMI. Tell me where you are today and I’ll help you prepare.",
  });

  const [messages, setMessages] = useState([
    getWelcomeMessage("ja"),
  ]);

  // Reset chat when language changes
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setWeather(null); // reset weather on language switch (clean UX)
    setMessages([getWelcomeMessage(lang)]);
  };

  return (
    <div className="app">
      {/* Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Weather pill (appears only when weather exists) */}
      <WeatherPill weather={weather} />

      {/* Chat messages */}
      <ChatWindow messages={messages}
       language = {language}
      />

      {/* Input */}
      <ChatInput
        messages={messages}
        setMessages={setMessages}
        language={language}
        setWeather={setWeather} // ✅ THIS is important
      />
    </div>
  );
}
