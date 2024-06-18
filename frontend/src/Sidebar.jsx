import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiFingerPrint, HiCog, HiChat, HiUserGroup, HiDocumentText  } from "react-icons/hi";
import { useTheme } from './App'; 
import { useUser } from './UserContext'; // Import the UserContext

const Sidebar = () => {
  const { user } = useUser(); // Use the user context
  const { theme } = useTheme(); 

  if (!user) {
    return;
  }

  return (
    <div className={`fixed w-72 p-6 flex flex-col justify-between h-full shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-white'}`}>
      <h1 className="text-3xl font-bold text-center">Space Rants</h1>
      <div className="flex flex-col items-center">
        {user.profile_image_url ? (
          <img
            src={user.profile_image_url}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-6"
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
                isActive ? "flex items-center py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
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
                isActive ? "flex items-center py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
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
                isActive ? "flex items-center py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
              }
            >
              <HiUserGroup className='mt-1 mr-2' />
              Following
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink 
              to="/user-posts" 
              className={({ isActive }) => 
                isActive ? "flex items-center py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
              }
            >
              <HiDocumentText className='mt-1 mr-2' />
              My Posts
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-20">
        <div>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              isActive ? "flex items-center py-2 px-4 bg-blue-700 rounded-md transition duration-200" : "flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
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
