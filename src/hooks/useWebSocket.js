// src/hooks/useWebSocket.js
// Custom React hook to manage WebSocket connections for the chat application.
// It handles connection status, message receiving/sending, and reconnection logic.
// It also retrieves and provides the user's ID upon connection.

import { useState, useEffect, useRef, useCallback } from 'react';

export const useWebSocket = (url, username) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("disconnected"); // connecting, connected, disconnected
  const userIdRef = useRef(null);
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
        if (data.type === 'user_connected' && !userIdRef.current && data.user_id) {
            userIdRef.current = data.user_id;
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
  }, [url, username]);

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

  return { messages, status, userId: userIdRef.current, sendMessage };
};