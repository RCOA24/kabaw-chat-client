// src/components/MessageList.jsx
// This Component displays a list of chat messages with proper formatting for system and user messages.
// It uses the formatTime helper function to display timestamps in a user-friendly format.
// It also highlights messages sent by the current user.
import React, { useEffect, useRef } from 'react';
import { formatTime } from '../utils/helpers'; 

const MessageList = ({ messages, currentUsername }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.username === currentUsername;
          const isSystem = msg.type === 'system' || msg.type === 'user_connected';

          if (isSystem) {
            return (
              <div key={index} className="flex justify-center py-3">
                <div className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full">
                  {msg.content}
                </div>
              </div>
            );
          }

          return (
            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                isMe 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold ${
                    isMe ? 'text-blue-100' : 'text-gray-600'
                  }`}>{msg.username}</span>
                  <span className={`text-xs ${
                    isMe ? 'text-blue-100' : 'text-gray-500'
                  }`}>{formatTime(msg.timestamp)}</span> 
                </div>
                <div className={`text-sm ${
                  isMe ? 'text-white' : 'text-gray-900'
                }`}>{msg.content}</div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default MessageList;