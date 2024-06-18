import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [openTab, setOpenTab] = useState(1);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    birthdate: '',
    gender: '',
    password: '',
    new_password: '',
    confirm_new_password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        ...parsedUser,
        password: '',
        new_password: '',
        confirm_new_password: '',
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleTabClick = (tabNumber) => {
    setOpenTab(tabNumber);
    if (tabNumber === 2) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
    setSuccess('');
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { password, new_password, confirm_new_password, ...userData } = formData;
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${user.id}`, userData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 200) {
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setEditing(false);
        setSuccess('Profile updated successfully');
        setOpenTab(1); // Switch to User Information tab
      }
    } catch (error) {
      console.error('Error updating user information:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        setError(error.response.data.message || 'An error occurred');
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_new_password) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.put('http://localhost:8000/api/user/password', {
        password: formData.password,
        new_password: formData.new_password,
        new_password_confirmation: formData.confirm_new_password
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.status === 200) {
        setSuccess('Password changed successfully');
        setFormData({
          ...formData,
          password: '',
          new_password: '',
          confirm_new_password: '',
        });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        setError(error.response.data.message || 'An error occurred');
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col md:flex-row text-[#161931] h-[89vh]  overflow-y-scroll ... bg-white-100 justify-center">
      {/* Sidebar */}
      <div className="py-4 md:w-1/4 lg:w-1/5 md:block h-screen ml-10 overflow-y-auto ">
        <div className="flex flex-col gap-1 p-4 text-sm border-r border-indigo-100">
          <h1 className="pl-3 mb-4 text-2xl font-semibold">Settings</h1>
          <div className="flex flex-wrap mt-1 sm:flex-row justify-start">
            <div className="flex px-3 py-2.5 font-bold bg-white text-black">
              <button
                className={`mt-0 cursor-pointer border-l-2 text-base px-2 py-2 font-semibold transition 
                  ${openTab === 1 ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-dark bg-gray border-stroke hover:bg-primary hover:text-cyan-500 dark:bg-dark dark:text-dark-6 dark:border-dark-3'}`}
                onClick={() => handleTabClick(1)}>
                User Information
              </button>
            </div>
            <div className="flex px-3 py-2 font-bold bg-white text-black">
              <button
                className={`mt-0 cursor-pointer border-l-2 text-base px-2 py-2 font-semibold transition 
                  ${openTab === 2 ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-dark bg-gray border-stroke hover:bg-primary hover:text-cyan-500 dark:bg-dark dark:text-dark-6 dark:border-dark-3'}`}
                onClick={() => handleTabClick(2)}>
                Edit Profile
              </button>
            </div>
            <div className="flex px-3 py-2 font-bold bg-white text-black">
              <button
                className={`mt-0 cursor-pointer border-l-2 text-base px-2 py-2 font-semibold transition 
                  ${openTab === 3 ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-dark bg-gray border-stroke hover:bg-primary hover:text-cyan-500 dark:bg-dark dark:text-dark-6 dark:border-dark-3'}`}
                onClick={() => handleTabClick(3)}>
                Change Password
              </button>
            </div>
            {error && (
              <div className="p-2 ml-3 mt-3 text-red-800 rounded-lg bg-red-50 dark:text-red-400">
                <p className="text-xs font-mono">{error}</p>
              </div>
            )}

            {success && (
              <div className=" mt-3 ml-3 p-2 w-36 text-green-800 rounded-lg bg-green-50 dark:text-green-400">
                <p className=" text-xs font-mono">{success}</p>
              </div>
            )}  
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mt-8 md:mt-8 md:ml-16 max-w-3xl px-4 md:px-10">
        {openTab === 1 && (
          <div className='max-w-lg'>
            <h1 className="pl-0 mb-7 text-xl font-semibold">User Information</h1>
            <div className="rounded-lg bg-white p-6">
              <div className="flex justify-center mb-4 mx-auto">
                {user.profile_picture ? (
                  <img src={`http://localhost:8000/storage/${user.profile_picture}`} alt="Profile" className="w-32 h-32 rounded-full object-cover  p-1  ring-2 ring-cyan-500 dark:ring-cyan-500"/>
                ) : (
                  <div className="rounded-full bg-white flex items-center justify-center text-gray-500 object-cover w-32 h-32 border-cyan-500">
                    No Image
                  </div>
                )}
              </div>
              <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">{user.first_name} {user.last_name}</h1>
              <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{user.email}</h3>
              <ul className="mt-7 divide-y w-96 mx-auto rounded bg-gray-100 py-2 px-3 text-gray-600 hover:text-gray-700">
                <li className="flex items-center py-3 text-sm">
                  <span>First Name</span>
                  <span className="ml-auto"> {user.first_name}</span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Last Name</span>
                  <span className="ml-auto"> {user.last_name}</span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Address</span>
                  <span className="ml-auto">{user.address}</span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Birthday</span>
                  <span className="ml-auto"> {user.birthdate}</span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Gender</span>
                  <span className="ml-auto"> {user.gender}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

          {openTab === 2 && (
            <div className="max-w-lg ">
              <h1 className="text-xl font-semibold mb-7">Edit Profile</h1>
              <div className="max-w-lg bg-white rounded-lg p-6 ">
                {editing ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="flex flex-col">
                      <label htmlFor="first_name" className="text-gray-700">First Name:</label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="last_name" className="text-gray-700">Last Name:</label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="address" className="text-gray-700">Address:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="birthdate" className="text-gray-700">Birth Date:</label>
                      <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="gender" className="text-gray-700">Gender:</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className="bg-cyan-500 text-white hover:bg-cyan-600 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 text-sm font-medium"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex justify-center mb-4">
                      {user.profile_picture ? (
                        <img src={`http://localhost:8000/storage/${user.profile_picture}`} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                      ) : (
                        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-200 text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <h1 className="text-center text-xl font-bold text-gray-900">{user.first_name} {user.last_name}</h1>
                    <h3 className="text-center text-gray-600">{user.email}</h3>
                    <ul className="mt-7 divide-y w-full rounded bg-gray-100 py-2 px-3 text-gray-600 hover:text-gray-700">
                      <li className="flex items-center py-3 text-sm">
                        <span className="font-medium">First Name:</span>
                        <span className="ml-auto">{user.first_name}</span>
                      </li>
                      <li className="flex items-center py-3 text-sm">
                        <span className="font-medium">Last Name:</span>
                        <span className="ml-auto">{user.last_name}</span>
                      </li>
                      <li className="flex items-center py-3 text-sm">
                        <span className="font-medium">Address:</span>
                        <span className="ml-auto">{user.address}</span>
                      </li>
                      <li className="flex items-center py-3 text-sm">
                        <span className="font-medium">Birth Date:</span>
                        <span className="ml-auto">{user.birthdate}</span>
                      </li>
                      <li className="flex items-center py-3 text-sm">
                        <span className="font-medium">Gender:</span>
                        <span className="ml-auto">{user.gender}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {openTab === 3 && (
            <div>
              <h1 className="text-xl font-semibold mb-7">Change Password</h1>
              <div className="max-w-lg bg-white rounded-lg p-6">
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="current_password" className="text-gray-700">Current Password:</label>
                    <input
                      type="password"
                      id="current_password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="new_password" className="text-gray-700">New Password:</label>
                    <input
                      type="password"
                      id="new_password"
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="confirm_new_password" className="text-gray-700">Confirm New Password:</label>
                    <input
                      type="password"
                      id="confirm_new_password"
                      name="confirm_new_password"
                      value={formData.confirm_new_password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-cyan-500 text-white hover:bg-cyan-600 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 text-sm font-medium"
                      >
                        Save
                  </button>
                  </div>
                </form>
                </div>
              </div>

          )}
      </div>
    </div>
  );
}

export default Settings;

