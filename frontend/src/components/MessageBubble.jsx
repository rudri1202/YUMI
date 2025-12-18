import React, { useState } from "react";
import { speakText, stopSpeaking } from "../utils/speak";

export default function MessageBubble({ message, language }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
    } else {
      speakText(message.content, language);
      setSpeaking(true);

      // Auto reset when finished
      setTimeout(() => setSpeaking(false), 5000);
    }
  };

  if (message.role === "thinking") {
    return (
      <div className="bubble assistant thinking">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    );
  }

  return (
    <div className={`bubble ${message.role}`}>
      <p>{message.content}</p>

      {message.role === "assistant" && (
        <button className="speak-btn" onClick={handleSpeak}>
          {speaking
            ? language === "ja"
              ? "停止"
              : "Stop"
            : language === "ja"
            ? "🔊 聞く"
            : "🔊 Listen"}
        </button>
      )}
    </div>
  );
}
