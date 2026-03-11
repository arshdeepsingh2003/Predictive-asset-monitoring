let socket = null;

export const connectLive = (callback) => {

  if (socket) return;

  socket = new WebSocket("ws://127.0.0.1:8000/ws/live");

  socket.onopen = () => {
    console.log("🟢 WebSocket CONNECTED");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    console.log("📡 Message received:", message);

    if (message.type === "assets") {
      callback(message.data);
    }
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("🔴 WebSocket CLOSED");
    socket = null;
  };
};

export const disconnectLive = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};