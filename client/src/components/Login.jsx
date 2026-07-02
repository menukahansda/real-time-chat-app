import { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onLogin(trimmed);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-2">Real Time Chat App</h1>
        <h2 className="text-lg text-gray-600 mb-6">Join Chat</h2>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-80"
    >

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        autoFocus
      />

      <button
        type="submit"
        className="bg-emerald-600 text-white rounded px-3 py-2 disabled:opacity-50 hover:bg-emerald-700 transition"
        disabled={!name.trim()}
      >
        Join
      </button>
    </form>
    </div>
  );
}
