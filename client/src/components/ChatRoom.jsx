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
    <div className="h-screen w-full flex flex-col bg-gray-900">
      {/* Top title (not centered) */}
      <div className="py-4 text-center">
        <h1 className="text-4xl font-bold">Real Time Chat App</h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[80%] max-w-4xl h-[85vh] flex flex-col border rounded-lg shadow bg-black">
          <div className="p-3 border-b border-gray-800">
            <h2 className="text-xl font-bold">Chat Room</h2>
            <p className="text-sm text-gray-500">Welcome, {username}!</p>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {messages.map((m) => (
              <Message
                key={m.socketId + m.timestamp}
                message={m}
                isOwn={m.socketId === socket.id}
              />
            ))}
          </div>
          <div className="p-2 border-t border-gray-800">
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  );
}
