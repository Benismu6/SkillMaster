const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// In-memory storage (replace with database in production)
const users = new Map();
const conversations = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  // User registration
  socket.on('register-user', (userData) => {
    users.set(socket.id, {
      ...userData,
      socketId: socket.id
    });

    // Broadcast updated user list
    io.emit('user-list', Array.from(users.values()));
  });

  // Send message
  socket.on('send-message', (messageData) => {
    const recipientSocket = Array.from(users.values()).find(
      user => user.id === messageData.recipient.id
    );

    if (recipientSocket) {
      // Broadcast to recipient
      io.to(recipientSocket.socketId).emit('new-message', {
        ...messageData,
        status: 'delivered'
      });

      // Optional: store in conversation history
      const conversationKey = `${messageData.sender.id}-${messageData.recipient.id}`;
      if (!conversations.has(conversationKey)) {
        conversations.set(conversationKey, []);
      }
      conversations.get(conversationKey).push(messageData);
    }
  });

  // File upload
  socket.on('send-file', (fileData) => {
    const recipientSocket = Array.from(users.values()).find(
      user => user.id === fileData.recipient.id
    );

    if (recipientSocket) {
      io.to(recipientSocket.socketId).emit('new-message', {
        ...fileData,
        status: 'delivered'
      });
    }
  });

  // Disconnect handling
  socket.on('disconnect', () => {
    users.delete(socket.id);
    io.emit('user-list', Array.from(users.values()));
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});