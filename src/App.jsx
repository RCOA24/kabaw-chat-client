// src/App.jsx
// Main application component for the chat client.
// It integrates the ChatHeader and MessageList components and manages message input and sending.

import { useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import { generateRandomUsername } from './utils/helpers'; 
import './App.css';


const USERNAME = generateRandomUsername(); 

function App() {
  const { messages, status, userId, sendMessage } = useWebSocket('ws://localhost:8080/ws', USERNAME);

  const [inputValue, setInputValue] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader status={status} userId={userId} />
      <MessageList messages={messages} currentUsername={USERNAME} />
      <form onSubmit={handleSend} className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            disabled={status !== "connected"}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
          />
          <button 
            type="submit" 
            disabled={status !== "connected"}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;