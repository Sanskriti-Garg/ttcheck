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

































import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import agents from "../data/agents";
import { FaRobot, FaSmile, FaArrowLeft, FaTrash } from "react-icons/fa";
import "./ChatPage.css";

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Flatten agents from grouped sections
  const allAgents = agents.flatMap(section => section.agents);
  const agent = allAgents.find(a => a.id === parseInt(id));

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: agent
        ? `${agent.description} How can I help you?`
        : "Welcome! How can I help you?"
    }
  ]);
  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: "user", text: input }]);

    try {
      const response = await fetch(agent.api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          text: data.response || "Sorry, I couldn't understand that."
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { type: "bot", text: "⚠️ Error: Could not fetch response from API." }
      ]);
    }

    setInput("");
  };

  if (!agent) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Agent not found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <button
          className="icon-button"
          onClick={() => navigate("/")}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h2>{agent.name}</h2>
        <button
          className="icon-button"
          onClick={() => setMessages([])}
          aria-label="Clear chat"
        >
          <FaTrash />
        </button>
      </header>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.type}`}>
            {msg.type === "bot" && <FaRobot className="icon-bot" />}
            <div className={`message-bubble ${msg.type}`}>
              {msg.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            {msg.type === "user" && <FaSmile className="icon-user" />}
          </div>
        ))}
        <div ref={messagesEndRef} />
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







<footer className="chat-footer">
  <textarea
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // prevent newline
        sendMessage();
      }
    }}
    placeholder="Type a message..."
    rows={2}
  />
  <button onClick={sendMessage}>Send</button>
</footer>
