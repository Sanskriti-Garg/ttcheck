import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import agents from "../data/agents";
import { FaRobot, FaSmile, FaArrowLeft, FaTrash } from "react-icons/fa";
import "./ChatPage.css";

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const agent = agents.find(a => a.id === parseInt(id));
  const [messages, setMessages] = useState([
    { type: "bot", text: `${agent.description} How can I help you?` }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: "user", text: input }]);

    try {
      const response = await fetch(agent.api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })  // ✅ Updated key to "prompt"
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { type: "bot", text: data.response || "Sorry, I couldn't understand that." }  // ✅ Updated response key
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { type: "bot", text: "Sorry, an error occurred." }
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <FaArrowLeft onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <h2>{agent.name}</h2>
        <FaTrash onClick={() => setMessages([])} style={{ cursor: "pointer" }} />
      </header>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.type}`}>
            {msg.type === "bot" && <FaRobot className="icon-bot" />}
            <div className={`message-bubble ${msg.type}`}>{msg.text}</div>
            {msg.type === "user" && <FaSmile className="icon-user" />}
          </div>
        ))}
      </div>

      <footer className="chat-footer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default ChatPage;
