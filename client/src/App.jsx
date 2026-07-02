import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [username, setUsername] = useState(null);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="text-3xl font-bold text-center py-4">
          Real Time Chat App
        </div>
        <div className="flex-1 min-h-0">
          {username ? (
            <ChatRoom username={username} />
          ) : (
            <div className="h-full flex justify-center items-center">
              <Login onLogin={setUsername} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
