import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './App'; // Import the theme context
import axios from 'axios';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/users?query=${searchQuery}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchNotifications = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get('http://localhost:8000/api/notifications', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setNotifications(response.data);
      setUnreadCount(response.data.filter(notification => !notification.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markNotificationsAsRead = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.post('http://localhost:8000/api/notifications/mark-as-read', {}, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      markNotificationsAsRead();
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleNotificationClick = async (notification) => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:8000/api/notifications/${notification.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setNotifications(prevNotifications => prevNotifications.filter(n => n.id !== notification.id));
      navigate(`/posts/${notification.post_id}`);
      setShowNotifications(false);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className={`fixed w-full flex items-center justify-between p-4 shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold text-center">Space Rants</h1>
      <form onSubmit={handleSearch} className="flex items-center relative flex-grow max-w-xl">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-3 py-2 border rounded-md flex-grow"
        />
        <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 text-white ml-2">
          Search
        </button>
      </form>
      <div className="flex space-x-4 ml-4 relative">
        <button
          onClick={toggleNotifications}
          className="relative py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md transition duration-200 text-white"
        >
          Notifications {unreadCount > 0 && <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0">{unreadCount}</span>}
        </button>
        {showNotifications && (
          <div ref={dropdownRef} className={`absolute mt-12 w-80 max-h-96 overflow-y-auto ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'} rounded-md shadow-lg`}>
            <ul className="p-4">
              {notifications.length === 0 ? (
                <li className="p-2">No notifications</li>
              ) : (
                notifications.map(notification => (
                  <li
                    key={notification.id}
                    className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-300"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <p>{notification.message}</p>
                    <p className="text-sm text-gray-500">
                      {notification.formatted_date ? ` | ${notification.formatted_date}` : ''}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md transition duration-200 text-white"
        >
          Logout
        </button>
        <button
          onClick={toggleTheme}
          className="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md transition duration-200 text-white"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Header;
