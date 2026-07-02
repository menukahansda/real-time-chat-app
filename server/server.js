import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home page. Server working!");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});