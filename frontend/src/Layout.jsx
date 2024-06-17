import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from './App'; // Import the theme context

const Layout = ({ onLogout }) => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header onLogout={onLogout} />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
