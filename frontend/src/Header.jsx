import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="fixed w-full bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-3xl font-bold text-blue-400 ml-6">Space Rants</h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md transition duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
