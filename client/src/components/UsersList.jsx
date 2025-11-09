import React from 'react';

function UsersList({ users }) {
  return (
    <div className="users-list">
      <h3>Online Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;