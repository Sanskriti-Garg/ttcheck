import React, { useEffect, useState } from 'react';
import './AgentCarousel.css';

const cards = [
  { color: '#FF6B6B', description: 'Answers developer questions and product info.' },
  { color: '#4ECDC4', description: 'Suggests tech based on use cases.' },
  { color: '#FFD93D', description: 'Automates capability mapping.' },
  { color: '#1A535C', description: 'Analyzes tech and vendor spend.' },
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
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="carousel-container">
      <div className="top-row">
        <h2 className="welcome-text">Welcome to the application</h2>
        <div
          className="card-row"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {cards.map((card, i) => {
            const isActive = i === index;
            const isBefore = (i + 1) % cards.length === index;
            const isAfter = (i - 1 + cards.length) % cards.length === index;

            return (
              <div
                key={i}
                className={`carousel-card-square ${
                  isActive ? 'active' : isBefore || isAfter ? 'blurred' : 'hidden'
                }`}
                style={{ backgroundColor: card.color }}
              >
                {card.description}
              </div>
            );
          })}
        </div>
      </div>

      <div className="search-bar-wrapper">{SearchComponent}</div>
    </div>
  );
};

export default AgentCarousel;






















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

























import React, { useEffect, useState } from 'react';
import './AgentCarousel.css';

const cards = [
  { color: '#FF6B6B', description: 'Answers developer questions and product info.' },
  { color: '#4ECDC4', description: 'Suggests tech based on use cases.' },
  { color: '#FFD93D', description: 'Automates capability mapping.' },
  { color: '#1A535C', description: 'Analyzes tech and vendor spend.' },
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
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="carousel-container">
      <div className="top-row">
        <h2 className="welcome-text">Welcome to the application</h2>
        <div
          className="card-row"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {cards.map((card, i) => {
            const isActive = i === index;
            const isBehind = (i > index || (index === cards.length - 1 && i === 0));

            let className = 'carousel-card-square';
            if (isActive) className += ' active';
            else if (isBehind) className += ' behind';
            else className += ' hidden';

            return (
              <div
                key={i}
                className={className}
                style={{ backgroundColor: card.color }}
              >
                {card.description}
              </div>
            );
          })}
        </div>
      </div>

      <div className="search-bar-wrapper custom-search">
        {SearchComponent}
      </div>
    </div>
  );
};

export default AgentCarousel;











//############//


import React, { useEffect, useState } from 'react';
import './AgentCarousel.css';

const cards = [
  {
    title: 'GitHub Copilot',
    description: 'AI pair programmer that helps you code faster.',
    icons: ['💻', '🤖', '⚙️'],
    color: '#FF6B6B',
  },
  {
    title: 'Dev Assistant',
    description: 'Provides coding support and API documentation.',
    icons: ['📘', '🧠', '🛠️'],
    color: '#4ECDC4',
  },
  {
    title: 'Tech Recommender',
    description: 'Recommends tech stack based on requirements.',
    icons: ['📦', '🌐', '🔍'],
    color: '#FFD93D',
  },
  {
    title: 'Spend Analyzer',
    description: 'Analyzes your technology and vendor spend.',
    icons: ['📊', '💰', '📉'],
    color: '#1A535C',
  },
];

interface Props {
  SearchComponent: React.ReactNode;
}

const AgentCarousel = ({ SearchComponent }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardClass = (i: number) => {
    if (i === index) return 'carousel-card-square active';
    if (i === (index - 1 + cards.length) % cards.length) return 'carousel-card-square prev';
    if (i === (index + 1) % cards.length) return 'carousel-card-square next';
    return 'carousel-card-square hidden';
  };

  return (
    <div className="carousel-container">
      <div className="top-row">
        <h2 className="welcome-text">Welcome to the application</h2>
        <div className="card-row">
          {cards.map((card, i) => (
            <div key={i} className={getCardClass(i)}>
              <div className="card-content">
                <div className="card-header" style={{ backgroundColor: card.color }}>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
                <div className="card-icons">
                  {card.icons.map((icon, j) => (
                    <span key={j} className="icon-circle">{icon}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="search-bar-wrapper custom-search">
        {SearchComponent}
      </div>
    </div>
  );
};

export default AgentCarousel;


