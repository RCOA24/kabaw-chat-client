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
    <div className="chat-container">
      <ChatHeader status={status} userId={userId} />
      <MessageList messages={messages} currentUsername={USERNAME} />
      <form onSubmit={handleSend} className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          disabled={status !== "connected"}
        />
        <button type="submit" disabled={status !== "connected"}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;