import React, { useEffect, useRef, useState } from "react";
import { sendMessage } from "../services/api";

export default function ChatInput({
  messages,
  setMessages,
  language,
  setWeather, // ✅ added
}) {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // -----------------------------
  // Init Speech Recognition
  // -----------------------------
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === "ja" ? "ja-JP" : "en-US";

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, [language]);

  // -----------------------------
  // Controls
  // -----------------------------
  const startListening = () => {
    if (!recognitionRef.current) return;
    setInput("");
    recognitionRef.current.start();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    // 1️⃣ Add user message + thinking buffer
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText },
      { role: "thinking" },
    ]);

    try {
      // 2️⃣ Call backend
      const res = await sendMessage({
        query: userText,
        language,
      });

      // ✅ Store weather for WeatherPill
      if (res.weather) {
        setWeather(res.weather);
      }

      // 3️⃣ Replace thinking with assistant response
      setMessages((prev) => {
        const withoutThinking = prev.filter(
          (m) => m.role !== "thinking"
        );
        return [
          ...withoutThinking,
          { role: "assistant", content: res.message, items: res.items || [] },
        ];
      });
    } catch (err) {
      console.error(err);

      setMessages((prev) => {
        const withoutThinking = prev.filter(
          (m) => m.role !== "thinking"
        );
        return [
          ...withoutThinking,
          {
            role: "assistant",
            content:
              language === "ja"
                ? "すみません、少し時間がかかっているようです 🙇‍♀️"
                : "Sorry, something went wrong 😔",
          },
        ];
      });
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className={`input-bar ${listening ? "listening" : ""}`}>
      <button
        className={`mic-btn ${listening ? "active" : ""}`}
        onClick={startListening}
        aria-label="Start voice input"
      >
        {listening ? "🎙️" : "🎤"}
      </button>

      <input
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          listening
            ? language === "ja"
              ? "聞いています…"
              : "Listening…"
            : language === "ja"
            ? "話すか入力してください…"
            : "Ask YUMI about weather, outfits, makeup…"
        }
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button
        className="send-btn"
        onClick={handleSend}
        disabled={!input.trim()}
      >
        {language === "ja" ? "送信" : "Send"}
      </button>
    </div>
  );
}
