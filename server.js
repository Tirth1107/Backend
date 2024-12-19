const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listen for connections from clients
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send a message to the client
  socket.emit('message', 'Welcome to the chat!');

  // Handle messages from the client
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg);  // Broadcast the message to all clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Make sure to use the dynamic port provided by Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const cors = require('cors');
app.use(cors());
