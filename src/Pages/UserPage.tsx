// src/Pages/UsersPage.tsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

interface User {
  id: string;
  name: string;
  email: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="border p-2 rounded">
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
