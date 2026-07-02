import { useState, useEffect } from "react";
import { socket } from "../socket";
import Message from "./Message";
import MessageInput from "./MessageInput";

export default function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);

  // fetch chat history, then connect socket and listen for live messages
  useEffect(() => {
    let ignore = false;

    fetch("http://localhost:3000/messages")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) setMessages(data);
      })
      .catch((err) => console.error("Error fetching messages:", err));

    socket.connect();
    socket.emit("join", username);

    function handleReceiveMessage(msg) {
      setMessages((prev) => [...prev, msg]);
    }
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      ignore = true;
      socket.off("receiveMessage", handleReceiveMessage);
      socket.disconnect();
    };
  }, [username]);

  return (
    <div className="w-full max-w-3xl h-full flex flex-col border rounded-lg shadow bg-black">
      <h2 className="text-xl font-bold mb-2">Chat Room</h2>
      <p className="text-sm text-gray-500 mb-4">Welcome, {username}!</p>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.map((m) => (
          <Message
            key={m.socketId + m.timestamp}
            message={m}
            isOwn={m.socketId === socket.id}
          />
        ))}
      </div>
      <MessageInput />
    </div>
  );
}