import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './App'; // Import the theme context

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="flex space-x-4 ml-4">
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
