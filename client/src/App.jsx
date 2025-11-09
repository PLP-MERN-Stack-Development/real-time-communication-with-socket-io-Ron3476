import React, { useState } from 'react';
import Chat from './components/Chat';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  const joinChat = () => {
    if (username.trim() !== '') {
      socket.emit('join', username);
      setJoined(true);
    }
  };

  return (
    <div className="app">
      {!joined ? (
        <div className="login">
          <h2>Enter your username</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={joinChat}>Join Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}

export default App;