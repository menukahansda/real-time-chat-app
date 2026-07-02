import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin : "*"
    }
})

let messages = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home page. Server working!");
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