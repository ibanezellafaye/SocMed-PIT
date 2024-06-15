import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user data found
      navigate('/login');
    }
  }, []); // Only run once when the component mounts

  const handleLogout = () => {
    // Clear user data and token from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Redirect to the login page
    navigate('/login');
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:8000/api/users?search=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const searchResults = response.data;

      // Navigate to the Search page with the search results
      navigate('/search', { state: { searchResults } });
    } catch (error) {
      console.error('Error searching users:', error);
      if (error.response && error.response.status === 401) {
        // Token expired, handle token refresh here
        // For simplicity, you can redirect to login for token refresh
        navigate('/login');
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <div className="fixed w-64 bg-gray-800 p-6 flex flex-col justify-between h-full shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400">Dashboard</h1>
        <div className="flex flex-col items-center">
          {user.profile_picture ? (
            <img
              src={`http://localhost:8000/storage/${user.profile_picture}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-blue-400"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 mb-3 border-4 border-gray-500">
              No Image
            </div>
          )}
          <p className="text-center text-xl font-semibold"><strong>{user.first_name} {user.last_name}</strong></p>
        </div>
      
        <nav>
          <ul className="space-y-4">
            <li>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={handleSearchChange} 
                placeholder="Search users" 
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </li>
            <li>
              <button 
                onClick={handleSearch} 
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
              >
                Search
              </button>
            </li>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  isActive ? "block py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  isActive ? "block py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/notifications" 
                className={({ isActive }) => 
                  isActive ? "block py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                }
              >
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/following" 
                className={({ isActive }) => 
                  isActive ? "block py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                }
              >
                Following
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/messages" 
                className={({ isActive }) => 
                  isActive ? "block py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                }
              >
                Messages
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  isActive ? "block py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="mt-20">
        <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  isActive ? "block py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                }
              >
                Settings
              </NavLink>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
