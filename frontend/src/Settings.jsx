

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from './App';
import { useUser } from './UserContext';
import { HiOutlineSaveAs } from "react-icons/hi";
import Swal from 'sweetalert2';
import axiosInstance from './axiosConfig';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
  const [errors, setErrors] = useState({});

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
    setErrors({}); // Clear previous errors

    try {
      await axiosInstance.put('/update', {
        firstName: editInfo.firstName,
        lastName: editInfo.lastName,
        email: editInfo.email,
        address: editInfo.address,
        birthdate: editInfo.birthdate,
        gender: editInfo.gender,
      }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      Swal.fire('Success', 'Information updated successfully', 'success');
      // Optionally refetch user data to ensure the latest info is displayed
      const response = await axiosInstance.get('/user', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        Swal.fire('Error', 'Validation Error: ' + JSON.stringify(error.response.data.errors), 'error');
      } else {
        console.error('Error updating information:', error);
        Swal.fire('Error', 'Failed to update information', 'error');
      }
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    setErrors({}); // Clear previous errors

    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire('Error', 'New passwords do not match', 'error');
      return;
    }

    try {
      await axiosInstance.post('/user/change-password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
        newPassword_confirmation: passwords.confirmPassword
      }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      Swal.fire('Success', 'Password changed successfully', 'success');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        Swal.fire('Error', 'Validation Error: ' + JSON.stringify(error.response.data.errors), 'error');
      } else {
        console.error('Error changing password:', error);
        Swal.fire('Error', 'Failed to change password', 'error');
      }
    }
  };

  const handleProfileImageSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('profile_image', profileImage);

    try {
      await axiosInstance.post('/user/upload-profile-image', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('Success', 'Profile image uploaded successfully', 'success');
      // Refresh user data to get updated profile image URL
      const response = await axiosInstance.get('/user', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error uploading profile image:', error);
      Swal.fire('Error', 'Failed to upload profile image', 'error');
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
      <title>Settings</title>
      <meta name="viewport" content="width=device-width, initial-scale=0.50, maximum-scale=1.0, user-scalable=yes" />
      </Helmet>
    <div className={`p-6 ml-72 mt-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="border-t border-gray-300 my-7"></div>

      {user ? (
        <>
          <h2 className="text-2xl ml-10 mb-0 mt-7">Edit Profile</h2>
          <div className="max-w-lg mx-auto overflow-hidden">
            <div className={`p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
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
                      Upload Image
                    </button>
                    <button
                      type="submit"
                      className={`text-white focus:outline-none font-medium rounded-lg text-sm px-6 py-2 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                    >
                      <HiOutlineSaveAs className="inline-block w-6 h-6 stroke-slate-500" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className={`max-w-lg mx-auto overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <form onSubmit={handleEditInfoSubmit} className={`mb-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
              <div className={`mb-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <label className="block mb-1 text-sm font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editInfo.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName[0]}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editInfo.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName[0]}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editInfo.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editInfo.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={editInfo.birthdate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                />
                {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate[0]}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Gender</label>
                <select
                  name="gender"
                  value={editInfo.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition  focus:outline-none focus:border-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  }`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender[0]}</p>}
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
            <div className={`max-w-lg mx-auto overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
              <form onSubmit={handleChangePasswordSubmit} className={`mb-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-semibold">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition focus:outline-none focus:border-indigo-600 shadow-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                    }`}
                  />
                  {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword[0]}</p>}
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-semibold">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition focus:outline-none focus:border-indigo-600 shadow-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                    }`}
                  />
                  {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword[0]}</p>}
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-semibold">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2 text-base h-12 border-2 rounded-lg transition focus:outline-none focus:border-indigo-600 shadow-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                    }`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword[0]}</p>}
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
    </HelmetProvider>
  );
};

export default Settings;
