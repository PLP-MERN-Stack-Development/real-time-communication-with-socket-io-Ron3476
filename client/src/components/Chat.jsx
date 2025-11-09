import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';

function Chat({ socket, username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState('');

  useEffect(() => {
    socket.on('chatMessage', (msg) => setMessages((prev) => [...prev, msg]));
    socket.on('users', (list) => setUsers(list));
    socket.on('typing', (user) => setTyping(`${user} is typing...`));
    socket.on('notification', (note) => setMessages((prev) => [...prev, { user: 'System', text: note }]));
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const msg = { user: username, text: message, time: new Date().toLocaleTimeString() };
      socket.emit('chatMessage', msg);
      setMessage('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', username);
  };

  return (
    <div className="chat-container">
      <UsersList users={users} />
      <div className="chat-box">
        <div className="messages">
          {messages.map((m, i) => (
            <div key={i}><b>{m.user}:</b> {m.text}</div>
          ))}
        </div>
        <div className="typing">{typing}</div>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleTyping}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;