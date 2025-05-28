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

    const userMessage = { type: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch(
        `${agent.api}?query=${encodeURIComponent(input)}`
      );
      const data = await res.text(); // API returns raw text string
      const botMessage = { type: "bot", text: data };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: "bot",
        text: "⚠️ Error: Could not fetch response from API."
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <FaArrowLeft onClick={() => navigate("/")} className="icon clickable" />
        <h2>{agent.name}</h2>
        <FaTrash onClick={() => setMessages([])} className="icon clickable" />
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
