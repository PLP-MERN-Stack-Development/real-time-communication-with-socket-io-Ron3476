import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

app.use(cors());

const io = new Server(httpServer, {
  cors: { origin: '*' },
});

let users = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    users.push({ id: socket.id, name: username });
    io.emit('users', users);
    io.emit('notification', `${username} joined the chat`);
  });

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('typing', (username) => {
    socket.broadcast.emit('typing', username);
  });

  socket.on('disconnect', () => {
    const user = users.find(u => u.id === socket.id);
    if (user) {
      users = users.filter(u => u.id !== socket.id);
      io.emit('users', users);
      io.emit('notification', `${user.name} left the chat`);
    }
  });
});

httpServer.listen(5000, () => console.log('Server running on port 5000'));
