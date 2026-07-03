import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { LoaderCircle } from "lucide-react";
export default function App() {
  const [username, setUsername] = useState(null);
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_SOCKET_URL}/health`)
    .then((res)=>{
      if(res.ok){
        setServerReady(true);
      }
    })
    .catch(() => {
      console.error("SERVER URL NOT REACHABLE");
    });
  }, []);

  if (!serverReady) {
    return (
      <span
        className="flex h-screen items-center justify-center"
        role="status"
        aria-label="Loading"
      >
        <LoaderCircle className="spinner" size={50} />
      </span>
    );
  }

  return username ? (
    <ChatRoom username={username} />
  ) : (
    <Login onLogin={setUsername} />
  );
}
