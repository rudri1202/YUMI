

import React from "react";
import { speakText } from "../utils/speak";

export default function BotMessage({ content, language }) {
  return (
    <div className="bubble assistant">
      <div className="bot-text">{content}</div>

      {/* subtle listen button */}
      <button
        className="listen-btn"
        onClick={() => speakText(content, language)}
        aria-label="Read aloud"
      >
        🔊
      </button>
    </div>
  );
}

