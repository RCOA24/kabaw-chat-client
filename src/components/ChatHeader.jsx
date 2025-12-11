// src/components/ChatHeader.jsx
// ChatHeader component displaying the chat title and connection status.
// It shows the user's ID when connected.
import React from 'react';

const ChatHeader = ({ status, userId }) => {
  return (
    <header className="chat-header">
      <h1>Kabaw Chat</h1>
      <div className="status-bar">
        {/* Requirement: Connection status indicator */}
        <span className={`status-indicator ${status}`}></span>
        <span className="status-text">{status}</span>
        {userId && <span className="user-id"> | ID: {userId.substring(0, 6)}</span>}
      </div>
    </header>
  );
};

export default ChatHeader;