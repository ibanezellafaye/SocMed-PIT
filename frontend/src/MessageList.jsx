import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MessageList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessagedUsers();
  }, []);

  const fetchMessagedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/messages/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    }
  };

  const handleNavigateToMessage = (userId) => {
    navigate(`/message/${userId}`);
  };

  const handledashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Messaged Users</h2>
      <div>
        <button onClick={handledashboard}>GoToDashboard</button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2 p-2 border rounded shadow-sm">
              <p><strong>{user.first_name} {user.last_name}</strong></p>
              <button
                onClick={() => handleNavigateToMessage(user.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Message
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default MessageList;
