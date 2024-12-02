const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(sever, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// In-memory storage (replace with database in production)
const users = new Map();
const conversations = new Map();