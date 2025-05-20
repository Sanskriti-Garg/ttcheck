import React from "react";
import { FaRobot, FaRegSmile } from "react-icons/fa";
import "./MessageBubble.css";

function MessageBubble({ type, text }) {
  return (
    <div className={`message-row ${type}`}>
      {type === "bot" && <FaRobot className="icon" />}
      <div className={`message-bubble ${type}`}>{text}</div>
      {type === "user" && <FaRegSmile className="icon" />}
    </div>
  );
}

export default MessageBubble;




.message-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.message-row.bot {
  justify-content: flex-start;
}

.message-row.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  line-height: 1.4;
  font-size: 0.95rem;
}

.message-bubble.bot {
  background-color: #f0f0f0;
  color: #000;
  margin-left: 0.5rem;
  border-top-left-radius: 0;
}

.message-bubble.user {
  background-color: #19c37d;
  color: white;
  margin-right: 0.5rem;
  border-top-right-radius: 0;
}

.icon {
  font-size: 1.2rem;
  color: #666;
  margin-top: 3px;
}
