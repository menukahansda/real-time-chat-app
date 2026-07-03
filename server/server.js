import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://menukahansda.github.io",
  process.env.CLIENT_URL, 
].filter(Boolean);

const io = new Server(server, {
    cors: {
        origin : allowedOrigins,
        methods: ["GET", "POST"],
    }
})

let messages = [];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home page. Server working!");
});

app.get("/messages", (req, res) => {
    res.json(messages);
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", (username) => {
        socket.data.username = username;
        console.log(`${username} joined the chat. Socket ID: ${socket.id}`);
    });

    socket.on("sendMessage", ({ text }) => {
        const message = {
            username: socket.data.username,
            text,
            timestamp: Date.now(),
            socketId: socket.id
        };

        messages.push(message);
        io.emit("receiveMessage", message);
   
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});