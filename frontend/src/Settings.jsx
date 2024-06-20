import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from './App';
import { useUser } from './UserContext';
import { HiOutlineSaveAs } from "react-icons/hi";

const Settings = () => {
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const [editInfo, setEditInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    birthdate: '',
    gender: ''
  });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      const formattedBirthdate = user.birthdate ? user.birthdate.split('T')[0] : '';
      setEditInfo({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        address: user.address || '',
        birthdate: formattedBirthdate,
        gender: user.gender || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setEditInfo({ ...editInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleEditInfoSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    try {
        await axios.put('http://localhost:8000/api/update', {
            firstName: editInfo.firstName,
            lastName: editInfo.lastName,
            email: editInfo.email,
            address: editInfo.address,
            birthdate: editInfo.birthdate,
            gender: editInfo.gender,
        }, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        setMessage('Information updated successfully.');
        // Optionally refetch user data to ensure the latest info is displayed
        const response = await axios.get('http://localhost:8000/api/user', {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        setUser(response.data);
    } catch (error) {
        if (error.response && error.response.status === 422) {
            setMessage('Validation Error: ' + JSON.stringify(error.response.data.errors));
        } else {
            console.error('Error updating information:', error);
            setMessage('Failed to update information.');
        }
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/user/change-password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
        newPassword_confirmation: passwords.confirmPassword // Ensure this matches the backend validation rule
      }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setMessage('Password changed successfully.');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setMessage('Validation Error: ' + JSON.stringify(error.response.data.errors));
      } else {
        console.error('Error changing password:', error);
        setMessage('Failed to change password.');
      }
    }
  };

  const handleProfileImageSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('profile_image', profileImage);
    try {
      await axios.post('http://localhost:8000/api/user/upload-profile-image', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Profile image uploaded successfully.');
      // Refresh user data to get updated profile image URL
      const response = await axios.get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error uploading profile image:', error);
      setMessage('Failed to upload profile image.');
    }
  };

  return (
    <div className={`p-6 ml-72 mt-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="border-t border-gray-300 my-7"></div>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      {user ? (
        <>
          <h2 className="text-2xl ml-10 mb-0 mt-7">Edit Profile</h2>
          <div className="max-w-lg mx-auto bg-white overflow-hidden">
            <div className="p-4">
              <form onSubmit={handleProfileImageSubmit} className="mb-6 ml-16">
                <div className="mb-4 flex items-center">
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                  <div>
                    {user.profile_image_url && (
                      <div className="mb-4">
                        <img
                          src={user.profile_image_url}
                          alt="Profile"
                          className="mx-auto w-36 h-36 mt-4 object-cover p-1 rounded-full ring-2 ring-indigo-300"
                        />
                      </div>
                    )}
                  </div>
                  <div className="ml-5 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => document.getElementById('profileImageInput').click()}
                      className="text-white bg-indigo-700 hover:bg-indigo-900 focus:outline-none font-medium rounded-lg text-sm px-6 py-2 text-center"
                    >
                      Change Profile
                    </button>
                    <button
                      type="submit"
                      className={`text-white bg-white focus:outline-none font-medium rounded-lg text-sm px-6 py-2 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                    >
                      <HiOutlineSaveAs className="inline-block w-6 h-6 stroke-slate-500" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="max-w-lg mx-auto bg-white overflow-hidden">
            <form onSubmit={handleEditInfoSubmit} className="mb-6">
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editInfo.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition bg-white focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editInfo.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition bg-white focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editInfo.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition bg-white focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editInfo.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition bg-white focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={editInfo.birthdate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition bg-white focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Gender</label>
                <select
                  name="gender"
                  value={editInfo.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition bg-white focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className='flex justify-end'>
                <button
                  type="submit"
                  className={`text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-700'
                  }`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className="border-t border-gray-300 my-6">
            <h2 className="text-2xl mt-7 ml-10 mb-10">Change Password</h2>
            <div className="max-w-lg mx-auto bg-white overflow-hidden">
              <form onSubmit={handleChangePasswordSubmit} className="mb-6">
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-semibold">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition bg-white focus:outline-none focus:border-indigo-600 shadow-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                    }`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-semibold">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition bg-white focus:outline-none focus:border-indigo-600 shadow-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                    }`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-semibold">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition bg-white focus:outline-none focus:border-indigo-600 shadow-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                    }`}
                  />
                </div>
                <div className='flex justify-end'>
                  <button
                    type="submit"
                    className={`text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-700'
                    }`}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Settings;
