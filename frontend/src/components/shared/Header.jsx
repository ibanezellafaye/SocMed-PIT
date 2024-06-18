import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { Popover, Transition, Menu } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
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
      window.location.reload();
    }
  }, [navigate]);

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
    <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200'>
      <div className='flex-1 flex justify-center items-center'>
        <div className='relative flex ml-10'>
          <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3' />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder='Search users'
            className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-full pl-11 px-4'
          />
          <button 
            onClick={handleSearch} 
            className='ml-2 px-4 py-2 bg-cyan-500 font-semibold text-white rounded-full hover:bg-cyan-600 transition-colors duration-200 ease-in-out'>
            Search
          </button>
        </div>
      </div>
      <div className='flex items-center gap-2 mr-2'>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-1 focus:ring-cyan-400">
            <div className="mx-auto h-10 w-10 rounded-full  bg-cover bg-no-repeat bg-center">
                {user.profile_picture ? (
                    <img
                        src={`http://localhost:8000/storage/${user.profile_picture}`}
                        className="w-8 h-8 rounded-lg object-cover mb-2 mx-auto"
                    />
                ) : (
                    <div className="flex items-center justify-center text-white-500 mb-2 h-10 w-10 rounded-lg bg-cyan-500 bg-cover bg-no-repeat bg-center">
                        No Image
                    </div>
                )}
            </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) =>
                  <div
                    className={classNames(active && 'bg-gray-100', 'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2')}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;