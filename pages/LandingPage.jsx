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

      <div className="group-grid">
        {/* Architect Assist */}
        <div className="group-box">
          <h2 className="group-title">Architect Assist</h2>
          <div className="agent-grid">
            <div className="agent-card" onClick={() => handleCardClick({
              id: 1,
              name: "Architecture Consultant Agent",
              description: "Answers developer questions on architectural standards, best practices, and product info..."
            })}>
              <h3>Architecture Consultant Agent</h3>
            </div>
            <div className="agent-card" onClick={() => handleCardClick({
              id: 2,
              name: "Tech Capability Recommender",
              description: "Recommends technology products based on developer use cases..."
            })}>
              <h3>Tech Capability Recommender</h3>
            </div>
          </div>
        </div>

        {/* Automated Mappings */}
        <div className="group-box">
          <h2 className="group-title">Automated Mappings</h2>
          <div className="agent-grid">
            <div className="agent-card" onClick={() => handleCardClick({
              id: 3,
              name: "App to BPPA Mapper Agent",
              description: "Automates mapping of applications to BPPA capability domains..."
            })}>
              <h3>App to BPPA Mapper Agent</h3>
            </div>
            <div className="agent-card" onClick={() => handleCardClick({
              id: 4,
              name: "Tech Product to BPPA Mapper Agent",
              description: "Automates mapping of technology products to BPPA domains..."
            })}>
              <h3>Tech Product to BPPA Mapper Agent</h3>
            </div>
          </div>
        </div>

        {/* Enterprise Architecture Common Agents */}
        <div className="group-box">
          <h2 className="group-title">Enterprise Architecture Common Agents</h2>
          <div className="agent-grid">
            <div className="agent-card" onClick={() => handleCardClick({
              id: 5,
              name: "Common Capability Recommender Agent",
              description: "Identifies and recommends common capabilities across applications..."
            })}>
              <h3>Common Capability Recommender Agent</h3>
            </div>
            <div className="agent-card" onClick={() => handleCardClick({
              id: 6,
              name: "Vendor Product Comparator Agent",
              description: "Creates side-by-side comparisons of vendor products..."
            })}>
              <h3>Vendor Product Comparator Agent</h3>
            </div>
            <div className="agent-card" onClick={() => handleCardClick({
              id: 7,
              name: "Contract Analyzer",
              description: "Analyzes contracts to identify services, products, and compliance gaps..."
            })}>
              <h3>Contract Analyzer</h3>
            </div>
          </div>
        </div>

        {/* Investment Planning */}
        <div className="group-box">
          <h2 className="group-title">Investment Planning</h2>
          <div className="agent-grid">
            <div className="agent-card" onClick={() => handleCardClick({
              id: 11,
              name: "Investment Optimization Recommendation Agent",
              description: "Analyzes portfolios and investment data for optimization..."
            })}>
              <h3>Investment Optimization Recommendation Agent</h3>
            </div>
            <div className="agent-card" onClick={() => handleCardClick({
              id: 12,
              name: "Investment Common Capability Assessment Agent",
              description: "Identifies common capabilities in portfolios for review..."
            })}>
              <h3>Investment Common Capability Assessment Agent</h3>
            </div>
          </div>
        </div>

        {/* Strategic Partnership */}
        <div className="group-box">
          <h2 className="group-title">Strategic Partnership</h2>
          <div className="agent-grid">
            <div className="agent-card" onClick={() => handleCardClick({
              id: 13,
              name: "Strategic Partnership Support Agent",
              description: "Identifies BPPA domains and architects for startup collaborations..."
            })}>
              <h3>Strategic Partnership Support Agent</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedAgent && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
              &times;
            </button>
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

