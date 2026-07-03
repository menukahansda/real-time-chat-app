import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";

export default function App() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_SOCKET_URL}/health`)
    .then((res)=>{
      if(res.ok){
        console.log("SERVER URL REACHABLE");
      }
    })
    .catch(() => {
      console.error("SERVER URL NOT REACHABLE");
    });
  }, []);

  return username ? (
    <ChatRoom username={username} />
  ) : (
    <Login onLogin={setUsername} />
  );
}

