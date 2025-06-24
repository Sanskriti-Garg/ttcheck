import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchAgents.css"; // optional for styling

type Agent = {
  id: number;
  name: string;
};

interface SearchAgentsProps {
  agents: Agent[];
}

const SearchAgents: React.FC<SearchAgentsProps> = ({ agents }) => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (agent: Agent) => {
    navigate(`/chat/${agent.id}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for agent"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && filteredAgents.length > 0 && (
        <ul className="search-results">
          {filteredAgents.map((agent) => (
            <li key={agent.id} onClick={() => handleSelect(agent)}>
              {agent.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchAgents;




































.search-container {
  margin: 20px auto;
  width: 60%;
  text-align: center;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  border-radius: 30px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  outline: none;
}

.search-results {
  margin-top: 8px;
  list-style: none;
  padding: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.search-results li {
  padding: 10px;
  cursor: pointer;
  text-align: left;
}

.search-results li:hover {
  background-color: #f2f2f2;
}
