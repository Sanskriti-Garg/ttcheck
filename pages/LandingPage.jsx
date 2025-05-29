import React from "react";
import agents from "../data/agents";
import AgentCard from "../components/AgentCard";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", fontSize: "32px" }}>
        Choose Your Agent
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          justifyContent: "center"
        }}
      >
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} onClick={() => navigate(`/chat/${agent.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;


































import React, { useState } from "react";
import agentsData from "../data/agents";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleChatClick = () => {
    if (selectedAgent) {
      navigate(`/chat/${selectedAgent.id}`);
    }
  };

  return (
    <div className="landing-container">
      <h1 className="landing-header">Choose Your Agent Assistant</h1>

      {agentsData.map((section, idx) => (
        <div key={idx} className="group-box">
          <h2 className="group-title">{section.section}</h2>
          <div className="agent-grid">
            {section.agents.map((agent) => (
              <div key={agent.id} className="agent-card" onClick={() => handleCardClick(agent)}>
                <h3>{agent.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showModal && selectedAgent && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedAgent.name}</h3>
            <p>{selectedAgent.description}</p>
            <button onClick={handleChatClick} className="chat-button">
              Chat with Agent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

