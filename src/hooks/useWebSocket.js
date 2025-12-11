// src/hooks/useWebSocket.js
import { useState, useEffect, useRef, useCallback } from 'react';

export const useWebSocket = (url, username) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("disconnected"); // connecting, connected, disconnected
  const [userId, setUserId] = useState(null);
  const ws = useRef(null);

  const connect = useCallback(() => {
    setStatus("connecting");
    // Connect with query params
    const socket = new WebSocket(`${url}?username=${username}&channel=general`);
    ws.current = socket;

    socket.onopen = () => {
      setStatus("connected");
      console.log("WS Connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WS Message:", data); // Requirement: Console logging

        // Requirement: Handle user_connected to get ID
        if (data.type === 'user_connected' && !userId && data.user_id) {
            setUserId(data.user_id);
        }
        
        setMessages((prev) => [...prev, data]);
      } catch (e) {
        console.error("Parse error", e);
      }
    };

    socket.onclose = () => {
      setStatus("disconnected");
      console.log("WS Disconnected. Retrying...");
      // Requirement: Reconnection logic
      setTimeout(() => connect(), 3000);
    };

    socket.onerror = (error) => {
      console.error("WS Error:", error);
      socket.close();
    };
  }, [url, username, userId]);

  useEffect(() => {
    connect();
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [connect]);

  const sendMessage = (content) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const payload = { type: "message", content };
      ws.current.send(JSON.stringify(payload));
    }
  };

  return { messages, status, userId, sendMessage };
};