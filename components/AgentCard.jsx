import React, { useState } from "react";
import "./AgentCard.css";

const AgentCard = ({ agent, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`agent-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="card-content">
        {!hovered ? <h3>{agent.name}</h3> : <p>{agent.description}</p>}
      </div>
    </div>
  );
};

export default AgentCard;
