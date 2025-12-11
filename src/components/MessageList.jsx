// src/components/MessageList.jsx
// This Component displays a list of chat messages with proper formatting for system and user messages.
// It uses the formatTime helper function to display timestamps in a user-friendly format.
// It also highlights messages sent by the current user.
import React, { useEffect, useRef } from 'react';
import { formatTime } from '../utils/helpers'; S

const MessageList = ({ messages, currentUsername }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 

  return (
    <div className="message-list">
      {messages.map((msg, index) => {
        const isMe = msg.username === currentUsername;
        const isSystem = msg.type === 'system' || msg.type === 'user_connected';

        if (isSystem) {
          return (
            <div key={index} className="system-message">
              {msg.content}
            </div>
          );
        }

        return (
          <div key={index} className={`message-bubble ${isMe ? 'my-message' : 'other-message'}`}>
            <div className="message-header">
              <span className="msg-user">{msg.username}</span>
              <span className="msg-time">{formatTime(msg.timestamp)}</span> 
            </div>
            <div className="message-content">{msg.content}</div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;