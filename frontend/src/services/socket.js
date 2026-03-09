let socket;

export const connectLive = (callback)=>{

socket = new WebSocket("ws://127.0.0.1:8000/ws/live")

socket.onmessage = (event)=>{

const data = JSON.parse(event.data)

callback(data)

}

}