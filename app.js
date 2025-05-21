import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { FaRobot, FaRegSmile, FaPaperPlane } from "react-icons/fa";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch(`https://your-swagger-api.com/ask?query=${encodeURIComponent(input)}`);
      const data = await res.text(); // because the API returns a raw string
      const botMessage = { type: "bot", text: data };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { type: "bot", text: "⚠️ Error: Could not fetch response from API." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">🤖 ChatBot Assistant</header>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.type}`}>
            {msg.type === "bot" ? <FaRobot className="icon" /> : <FaRegSmile className="icon" />}
            <div className={`message-bubble ${msg.type}`}>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default App;