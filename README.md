# real-time-chat-app
A simple real-time chat application built with React, Node.js, Express, and Socket.IO, featuring instant messaging and a clean client-server architecture.


---

## Features

- Real-time messaging using Socket.IO (WebSockets)
- Dummy user login (username-based, no password/auth required)
- Timestamps on every message (generated server-side)
- Chat history loaded on join via a REST endpoint
- Clean separation between frontend and backend

---

## Tech Stack

**Frontend:** React, Socket.IO Client
**Backend:** Node.js, Express, Socket.IO

---

## Project Structure

```text
real-time-chat-app/
├── server/
│   ├── server.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── ChatRoom.jsx
│   │   │   ├── Message.jsx
│   │   │   └── MessageInput.jsx
│   │   ├── socket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/menukahansda/real-time-chat-app.git
cd real-time-chat-app
```

### 2. Set up the backend

```bash
cd server
npm install
```

The server will run on `http://localhost:3000`.

### 3. Set up the frontend

Open a new terminal window:

```bash
cd client
npm install
```

The app will run on `http://localhost:5173`.

### 4. Run from root
```bash
npm run dev
```

### 5. Try it out

- Open `http://localhost:5173` in two separate browser tabs (or windows).
- Log in with a different dummy username in each tab.
- Send messages back and forth and watch them appear in real time, with timestamps.

---

## How It Works

- On login, the client sends the username to the server via a Socket.IO `join` event.
- When a user sends a message, the server attaches a timestamp and broadcasts it to all connected clients via `receive_message`.
- Past messages are stored in memory on the server and fetched by the client on join through a `GET /messages` REST endpoint, so chat history is visible immediately.

*(No database is used — message history resets when the server restarts, which is intentional for this assignment's scope.)*

---

## Notes

- This project is intentionally kept simple (no database, no real authentication) to focus on demonstrating client-server communication and code structure, as requested.

---

## Author
Built by [Menuka Hansda](https://github.com/menukahansda)