let socket;

export const connectSocket = (onMessage) => {

  socket = new WebSocket(
    "ws://localhost:8000/ws/dashboard"
  );

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("Socket closed");
  };
};