import React from "react";

const buildLinks = (item) => {
  const q = encodeURIComponent(item);

  return {
    mercari: `https://jp.mercari.com/search?keyword=${q}`,
    sevenNow: `https://7now.7eleven.co.jp/search?keyword=${q}`,
    amazon: `https://www.amazon.co.jp/s?k=${q}`,
    rakuten: `https://search.rakuten.co.jp/search/mall/${q}/`,
  };
};

export default function ProductCards({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="product-cards-scroll">
      <div className="product-cards">
        {items.map((item, idx) => {
          const links = buildLinks(item);

          return (
            <div className="product-card square" key={idx}>
              <div className="product-name">{item.toUpperCase()}</div>

              <div className="product-links">
                <a href={links.mercari} target="_blank" rel="noreferrer">
                  Mercari
                </a>
                <a href={links.sevenNow} target="_blank" rel="noreferrer">
                  7NOW
                </a>
                <a href={links.amazon} target="_blank" rel="noreferrer">
                  Amazon
                </a>
                <a href={links.rakuten} target="_blank" rel="noreferrer">
                  Rakuten
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
