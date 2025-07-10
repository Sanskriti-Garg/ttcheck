import React, { useEffect, useState } from 'react';
import './RotatingCards.css';

const cards = [
  { id: 1, text: 'Card 1 - Architecture', color: '#FF6B6B' },
  { id: 2, text: 'Card 2 - Mapping Engine', color: '#4ECDC4' },
  { id: 3, text: 'Card 3 - Spend Analyzer', color: '#FFD93D' },
  { id: 4, text: 'Card 4 - Vendor Tool', color: '#1A535C' },
];

const RotatingCards = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="rotating-card-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {cards.map((card, i) => (
        <div
          key={card.id}
          className={`card ${i === index ? 'active' : 'inactive'}`}
          style={{
            backgroundColor: card.color,
            zIndex: cards.length - i,
          }}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
};

export default RotatingCards;
