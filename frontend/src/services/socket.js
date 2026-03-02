// src/services/socket.js

let socket = null;

export const connectLive = (onMessage) => {
  socket = new WebSocket("ws://127.0.0.1:8000/ws/live");

  socket.onopen = () => {
    console.log("✅ Live WebSocket Connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (err) => {
    console.error("❌ WebSocket Error:", err);
  };

  socket.onclose = () => {
    console.log("⚠ WebSocket Closed");
  };
};

export const disconnectLive = () => {
  if (socket) socket.close();
};