// src/utils/helpers.js

// Utility functions for the chat application

/**
 * Formats a timestamp into a readable 12-hour time format (e.g., "10:30 PM")
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Generates a random username for testing purposes
 */
export const generateRandomUsername = () => {
  return "Candidate_" + Math.floor(Math.random() * 10000);
};