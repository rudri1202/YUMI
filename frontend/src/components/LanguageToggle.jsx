import React from "react";

export default function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="language-toggle">
      <button
        className={language === "ja" ? "active" : ""}
        onClick={() => setLanguage("ja")}
      >
        JP 日本語
      </button>
      <button
        className={language === "en" ? "active" : ""}
        onClick={() => setLanguage("en")}
      >
        EN English
      </button>
    </div>
  );
}
