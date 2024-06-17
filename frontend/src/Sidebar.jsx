import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { HiFingerPrint, HiCog, HiChat, HiUserGroup } from "react-icons/hi"; // Import user group icon
import { useTheme } from './App'; // Import the theme context

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user data found
      navigate('/login');
    }
  }, []); // Only run once when the component mounts

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`fixed w-72 p-6 flex flex-col justify-between h-full shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold text-center text-blue-400">Space Rants</h1>
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
          <li className='flex-1'>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                isActive ? "flex items-center py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "flex items-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
              }
            >
              <HiFingerPrint className='mt-1 mr-2'/>
              Dashboard
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink 
              to="/messages" 
              className={({ isActive }) => 
                isActive ? "flex items-center py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "flex items-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
              }
            >
              <HiChat className='mt-1 mr-2'/>
              Messages
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink 
              to="/following" 
              className={({ isActive }) => 
                isActive ? "flex items-center py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "flex items-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
              }
            >
              <HiUserGroup className='mt-1 mr-2' />
              Following
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-20">
        <div>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              isActive ? "flex items-center py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "flex items-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
            }
          >
            <HiCog className='mt-1 mr-2' />
            Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
