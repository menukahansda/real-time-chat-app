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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-64 text-center"
    >
      <h1 className="text-3xl font-bold mb-2">Join Chat</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border rounded px-3 py-2"
        autoFocus
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50"
        disabled={!name.trim()}
      >
        Join
      </button>
    </form>
  );
}
