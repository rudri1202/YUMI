import React from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import ProductCards from "./ProductCards";
import ThinkingBubble from "./ThinkingBubble";

export default function ChatWindow({ messages, language }) {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => {
        if (msg.role === "user") {
          return (
            <UserMessage
              key={index}
              content={msg.content}
            />
          );
        }

        if (msg.role === "assistant") {
          return (
            <div key={index}>
              <BotMessage
                content={msg.content}
                language={language}
              />
              {msg.items && msg.items.length > 0 && (
                <ProductCards items={msg.items} />
              )}
            </div>
          );
        }

        if (msg.role === "thinking") {
          return <ThinkingBubble key={index} />;
        }

        return null;
      })}
    </div>
  );
}
