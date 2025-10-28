import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  // attach token as query param if you want server to verify it
  socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
    transports: ["websocket"],
    auth: token ? { token } : {}
  });
  return socket;
};

export const getSocket = () => socket;
