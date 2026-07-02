import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";

export default function App() {
  const [username, setUsername] = useState(null);

  return username ? (
    <ChatRoom username={username} />
  ) : (
    <Login onLogin={setUsername} />
  );
}

