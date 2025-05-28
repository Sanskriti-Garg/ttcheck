import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import agents from "../data/agents";
import { FaRobot, FaSmile, FaArrowLeft, FaTrash } from "react-icons/fa";
import "./ChatPage.css";

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const agent = agents.find((a) => a.id === parseInt(id));
  const [messages, setMessages] = useState([
    { type: "bot", text: `${agent.description} How can I help you?` }
  ]);
  const [input, setInput] = useState("");

  const formatApiResponse = (rawText) => {
    let lines = rawText
      .replace(/[*\-]/g, "") // remove asterisks or dashes
      .replace(/\n+/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const formattedLines = lines.map((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(":").trim();
        return `${key}: ${value}`;
      }
      return line;
    });

    return formattedLines.join("\n");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);

    try {
      const res = await fetch(
        `https://ca04353-idetechspendservice-devide.apps.net/tachyon/search?query=${encodeURIComponent(input)}`
      );
      const data = await res.text(); // API returns raw text
      const formattedData = formatApiResponse(data);

      setMessages((prev) => [...prev, { type: "bot", text: formattedData }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "❌ Error: Could not fetch response from API." }
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
            <div className={`message-bubble ${msg.type}`}>
              {msg.type === "bot" ? <pre>{msg.text}</pre> : msg.text}
            </div>
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
