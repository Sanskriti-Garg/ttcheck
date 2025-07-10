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






















import React, { useEffect, useState } from 'react';
import './RotatingDescriptions.css';

const descriptions = [
  'Answers developer questions on architectural standards, best practices, and product info.',
  'Recommends technology products based on use cases, considering cost and compliance.',
  'Automates application to capability mapping using AI rules.',
  'Tracks and analyzes technology spending and vendor usage trends.'
];

const RotatingDescriptions = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % descriptions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="rotating-desc-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="rotating-desc-card">
        {descriptions[index]}
      </div>
    </div>
  );
};

export default RotatingDescriptions;

