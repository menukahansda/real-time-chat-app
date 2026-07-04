import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { LoaderCircle } from "lucide-react";

const MAX_TRIES = 3;
const RETRY_DELAY = 2000;

export default function App() {
  const [username, setUsername] = useState(null);
  const [serverReady, setServerReady] = useState(false);
  const [attempted, setAttempted] = useState(0);
  const [serverReachable, setServerReachable] = useState(false);

  useEffect(() => {
    if (serverReachable || serverReady) return;

    let timeoutId;
    let cancelled = false;
    const attemptsRef = { current: 0 }; 

    const checkServerHealth = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SOCKET_URL}/health`,
        );
        if (cancelled) return;

        if (res.ok) {
          setServerReady(true);
          setServerReachable(true);
          return; 
        }
        throw new Error(`Health check failed: ${res.status}`);
      } catch {
        if (cancelled) return;

        attemptsRef.current += 1;
        setAttempted(attemptsRef.current);

        if (attemptsRef.current > MAX_TRIES) {
          console.error("SERVER URL NOT REACHABLE");
          return;
        }

        timeoutId = setTimeout(checkServerHealth, RETRY_DELAY);
      }
    };

    checkServerHealth();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [serverReachable, serverReady]);

  if (!serverReachable && attempted > MAX_TRIES) {
    return <span className="flex h-screen items-center justify-center">Server URL not reachable.</span>;
  }
  if (!serverReady) {
    return (
      <span
        className="flex h-screen items-center justify-center"
        role="status"
        aria-label="Loading"
      >
        <LoaderCircle className="spinner" size={50} />
        {attempted > 0 && (
          <span>
            Waking up the server, this can take up to a minute... ({attempted}/{MAX_TRIES})
          </span>
        )}
      </span>
    );
  }

  return username ? (
    <ChatRoom username={username} />
  ) : (
    <Login onLogin={setUsername} />
  );
}
