const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Express app setup
const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this to your frontend's URL in production
    methods: ["GET", "POST"]
  }
});

// Store users and their socket connections
const users = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  // User authentication and registration
  socket.on('register', (userData) => {
    users.set(socket.id, {
      id: userData.id,
      username: userData.username
    });
    socket.emit('registration-success', { message: 'Successfully registered' });
  });

  // Send message
  socket.on('send-message', (messageData) => {
    // Broadcast message to specific user or room
    io.to(messageData.recipientSocketId).emit('new-message', {
      sender: users.get(socket.id),
      message: messageData.message,
      timestamp: new Date()
    });
  });

  // Handle typing indicator
  socket.on('typing', (recipientSocketId) => {
    io.to(recipientSocketId).emit('user-typing', {
      sender: users.get(socket.id)
    });
  });

  // Disconnect handling
  socket.on('disconnect', () => {
    users.delete(socket.id);
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});