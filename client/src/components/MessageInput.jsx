import { useState } from "react";
import { socket } from "../socket";

export default function MessageInput() {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    socket.emit("sendMessage", { text: trimmed });
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-1 border-t">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded px-3 py-2"
        autoFocus
      />
      <button
        type="submit"
        className="bg-emerald-600 text-white rounded px-2 py-0.5 disabled:opacity-50"
        disabled={!text.trim()}
      >
        Send
      </button>
    </form>
  );
}