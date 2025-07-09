import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import SearchAgents from "./SearchAgents.tsx";

type Agent = {
  id: number;
  name: string;
};

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

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAgentClick = (agentId: number) => {
    window.open(`/chat/${agentId}`, "_blank");
  };

  const agentCard = (agent: Agent) => (
    <div
      key={agent.id}
      className="agent-card"
      onClick={() => handleAgentClick(agent.id)}
    >
      <h3>{agent.name}</h3>
      <div className="agent-description">Description coming soon...</div>
    </div>
  );

  return (
    <div className="landing-container">
      <h1 className="landing-header">Choose Your Agent Assistant</h1>

      <SearchAgents agents={allAgents} onAgentSelect={handleAgentClick} />

      <div className="card-grid">
        <div className="card card-1">
          <h2>Architect Assist</h2>
          {agentCard(allAgents[0])}
          {agentCard(allAgents[1])}
        </div>
        <div className="card card-2">
          <h2>Vendor Product Spend Management</h2>
          {agentCard(allAgents[2])}
        </div>
        <div className="card card-3">
          <h2>Investment Planning</h2>
          {agentCard(allAgents[3])}
          {agentCard(allAgents[4])}
        </div>
        <div className="card card-4">
          <h2>Wells Fargo Technology Strategy</h2>
          {agentCard(allAgents[5])}
          {agentCard(allAgents[6])}
          {agentCard(allAgents[7])}
        </div>
        <div className="card card-5">
          <h2>EA Common Agents</h2>
          <div className="subcard-grid">
            {agentCard(allAgents[8])}
            {agentCard(allAgents[9])}
            {agentCard(allAgents[10])}
            {agentCard(allAgents[11])}
          </div>
        </div>
        <div className="card card-6">
          <h2>Contract Tools</h2>
          {agentCard(allAgents[10])}
          {agentCard(allAgents[10])}
        </div>
        <div className="card card-7">
          <h2>Product Analysis</h2>
          {agentCard(allAgents[12])}
        </div>
        <div className="card card-8">
          <h2>Enterprise Architecture Common Agents</h2>
          <div className="subcard-grid horizontal">
            {allAgents.slice(13).map((agent) => agentCard(agent))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
