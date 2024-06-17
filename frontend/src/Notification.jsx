import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from './App'; // Import the theme context
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const { theme } = useTheme(); // Get the theme from the context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:8000/api/notifications', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications.');
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className={`p-4 rounded-md shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul>
        {notifications.map(notification => (
          <li
            key={notification.id}
            className={`p-2 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            onClick={() => handleNotificationClick(notification.post_id)}
          >
            <p>{notification.message}</p>
            <p className="text-sm text-gray-500">
              {notification.formatted_date ? `${notification.formatted_date}` : ''}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
