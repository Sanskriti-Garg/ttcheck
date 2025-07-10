
const descriptions = [
  {
    text: 'Answers developer questions on architectural standards, best practices, and product info.',
    color: '#FF6B6B',
  },
  {
    text: 'Recommends technology products based on use cases, considering cost and compliance.',
    color: '#4ECDC4',
  },
  {
    text: 'Automates application to capability mapping using AI rules.',
    color: '#FFD93D',
  },
  {
    text: 'Tracks and analyzes technology spending and vendor usage trends.',
    color: '#1A535C',
  },
];

return (
  <div
    className="rotating-desc-container"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
  >
    <div className="stack-wrapper">
      {descriptions.map((desc, i) => (
        <div
          key={i}
          className={`rotating-desc-card ${i === index ? 'active' : 'inactive'}`}
          style={{
            backgroundColor: desc.color,
            zIndex: i === index ? 10 : 1,
            transform: i === index ? 'scale(1)' : `scale(0.95) translateY(${(index - i) * 5}px)`,
            opacity: i === index ? 1 : 0.5,
            filter: i === index ? 'none' : 'blur(1px)',
          }}
        >
          {desc.text}
        </div>
      ))}
    </div>
  </div>
);























import React, { useEffect, useState } from 'react';
import './AgentCarousel.css';

const cards = [
  {
    color: '#FF6B6B',
    description: 'Answers developer questions and product info.',
  },
  {
    color: '#4ECDC4',
    description: 'Suggests tech based on use cases.',
  },
  {
    color: '#FFD93D',
    description: 'Automates capability mapping.',
  },
  {
    color: '#1A535C',
    description: 'Analyzes tech and vendor spend.',
  },
];

interface Props {
  SearchComponent: React.ReactNode;
}

const AgentCarousel = ({ SearchComponent }: Props) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h2 className="welcome-text">Welcome to the application</h2>
        <div className="search-bar-wrapper">{SearchComponent}</div>
      </div>

      <div
        className="card-slider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className={`carousel-card ${i === index ? 'active' : 'inactive'}`}
            style={{
              transform: `translateX(${(i - index) * 120}%)`,
            }}
          >
            <div className="card-body" style={{ backgroundColor: card.color }}>
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentCarousel;
