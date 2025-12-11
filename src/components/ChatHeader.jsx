// src/components/ChatHeader.jsx
// ChatHeader component displaying the chat title and connection status.
// It shows the user's ID when connected.
import React from 'react';

const ChatHeader = ({ status, userId }) => {
  const statusColor = status === 'connected' ? 'bg-green-500' : status === 'connecting' ? 'bg-yellow-500' : 'bg-red-500';
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Kabaw.ai Chat</h1>
        <div className="flex items-center gap-3">
          {/* Requirement: Connection status indicator */}
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${statusColor} animate-pulse`}></span>
            <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
            {userId && <span className="text-xs text-gray-500">ID: {userId.substring(0, 8)}</span>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;