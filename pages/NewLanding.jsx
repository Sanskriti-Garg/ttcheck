import React, { useState } from "react";
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

  const agentCard = (agent) => (
    <div className="agent-card" onClick={() => handleCardClick(agent)}>
      <h3>{agent.name}</h3>
    </div>
  );

  return (
    <div className="landing-container">
      <h1 className="landing-header">Choose Your Agent Assistant</h1>

      <div className="card-grid">

        {/* Card 1 */}
        <div className="card card-1">
          <h2>Architect Assist</h2>
          {agentCard({ id: 1, name: "Architecture Consultant Agent" })}
          {agentCard({ id: 2, name: "Tech Capability Recommender" })}
        </div>

        {/* Card 2 */}
        <div className="card card-2">
          <h2>Vendor Product Spend Management</h2>
          {agentCard({ id: 3, name: "Third party tech spend Assesor Agent" })}
          {/* {agentCard({ id: 4, name: "Tech Product to BPPA Mapper Agent" })} */}
        </div>

        {/* Card 3 */}
        <div className="card card-3">
          <h2>Investment Planning</h2>
          {agentCard({ id: 11, name: "Investment Optimization Agent" })}
          {agentCard({ id: 12, name: "Common Capability Assessment Agent" })}
        </div>

        {/* Card 4 (Tall) */}
        <div className="card card-4">
          <h2>Wells Fargo Technology Strategy</h2>
          {agentCard({ id: 13, name: "Strategic Insight generator" })}
          {agentCard({ id: 13, name: "Identifying common genai agents" })}
          {agentCard({ id: 13, name: "Strategic Partnership Support Agent" })}
          {agentCard({ id: 13, name: "Strategic Partnership Support Agent" })}
          {agentCard({ id: 13, name: "Strategic Partnership Support Agent" })}
        </div>

       <div className="card card-5">
  <h2>EA Common Agents</h2>
  <div className="subcard-grid">
    {agentCard({ id: 5, name: "Common Capability Recommender Agent" })}
    {agentCard({ id: 6, name: "Vendor Product Comparator Agent" })}
    {agentCard({ id: 7, name: "Contract Analyzer" })}
    {agentCard({ id: 8, name: "Architecture Review Support Agent" })}
  </div>
</div>

        {/* Card 6 */}
        <div className="card card-6">
          <h2>Contract Tools</h2>
          {agentCard({ id: 7, name: "Contract Analyzer" })}
          {agentCard({ id: 7, name: "Contract Analyzer" })}
        </div>

        {/* Card 7 */}
        <div className="card card-7">
          <h2>Product Analysis</h2>
          {agentCard({ id: 8, name: "Product Assessment Agent" })}
        </div>
      </div>
      <div className="card card-8">
  <h2>Enterprise Architecture Common Agents</h2>
  <div className="subcard-grid horizontal">
    {Array.from({ length: 6 }).map((_, index) =>
      agentCard({ id: 100 + index, name: "Contract Analyzer" })
    )}
  </div>
</div>

      {/* Modal */}
      {showModal && selectedAgent && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>&times;</button>
            <h3>{selectedAgent.name}</h3>
            <p>Description coming soon...</p>
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






















const allAgents: Agent[] = [
  { id: 1, name: "Architecture Consultant Agent" },
  { id: 2, name: "Tech Capability Recommender" },
  { id: 3, name: "Third party tech spend Assesor Agent" },
  { id: 11, name: "Investment Optimization Agent" },
  { id: 12, name: "Common Capability Assessment Agent" },
  { id: 13, name: "Strategic Insight generator" },
  { id: 14, name: "Identifying common genai agents" },
  { id: 15, name: "Strategic Partnership Support Agent" },
  { id: 5, name: "Common Capability Recommender Agent" },
  { id: 6, name: "Vendor Product Comparator Agent" },
  { id: 7, name: "Contract Analyzer" },
  { id: 8, name: "Architecture Review Support Agent" },
  { id: 9, name: "Product Assessment Agent" },
  ...Array.from({ length: 6 }).map((_, index) => ({
    id: 100 + index,
    name: "Contract Analyzer",
  })),
];
