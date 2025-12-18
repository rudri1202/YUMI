import React from "react";

export default function ItemCard({ item }) {
  const map = {
    umbrella: { en: "Umbrella", ja: "折りたたみ傘" },
    jacket: { en: "Light Jacket", ja: "薄手のジャケット" }
  };

  return (
    <div className="card">
      <strong>{map[item]?.en}</strong>
      <div className="links">
        <a href={`https://www.amazon.com/s?k=${map[item]?.en}`} target="_blank">Amazon</a>
        <a href={`https://search.rakuten.co.jp/search/mall/${map[item]?.ja}`} target="_blank">Rakuten</a>
      </div>
    </div>
  );
}
