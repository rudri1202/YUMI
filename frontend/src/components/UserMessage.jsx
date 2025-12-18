import React from "react";

export default function UserMessage({ content }) {
  return (
    <div className="bubble user">
      {content}
    </div>
  );
}
