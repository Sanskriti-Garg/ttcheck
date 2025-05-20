import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { FaRobot, FaRegSmile, FaPaperPlane } from 'react-icons/fa';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      setMessages([...newMessages, { type: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { type: 'bot', text: 'Error: could not connect to server.' }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="app-container">
      <div className="chat-header">🤖 ChatBot</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div className={`message-row ${msg.type}`} key={index}>
            {msg.type === 'bot' ? <FaRobot className="icon" /> : <FaRegSmile className="icon" />}
            <div className={`message-bubble ${msg.type}`}>{msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}><FaPaperPlane /></button>
      </div>
    </div>
  );
}

export default App;
