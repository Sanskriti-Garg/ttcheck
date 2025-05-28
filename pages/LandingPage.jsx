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
