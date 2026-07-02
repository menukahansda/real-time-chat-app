import { io } from "socket.io-client";

const URL = import.meta.env.VITE_APP_SOCKET_URL || "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Connect error:", err.message);
});