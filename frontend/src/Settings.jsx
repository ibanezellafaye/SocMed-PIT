import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from './App';
import { useUser } from './UserContext';

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
      {message && <p className="mb-4 text-red-500">{message}</p>}

      {user ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl mb-4">Profile Picture</h2>
            {user.profile_image_url && (
              <div className="mb-4">
                <img
                  src={user.profile_image_url}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <form onSubmit={handleEditInfoSubmit} className="mb-6">
            <h2 className="text-2xl mb-4">Edit Information</h2>
            <div className="mb-4">
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={editInfo.firstName}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editInfo.lastName}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editInfo.email}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={editInfo.address}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Birthdate</label>
              <input
                type="date"
                name="birthdate"
                value={editInfo.birthdate}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                value={editInfo.gender}
                onChange={handleInputChange}
                className={`px-3 py-2 border rounded-md w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
            Save Changes
            </button>
          </form>

          <form onSubmit={handleChangePasswordSubmit} className="mb-6">
            <h2 className="text-2xl mb-4">Change Password</h2>
            <div className="mb-4">
              <label className="block mb-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>
            <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
              Change Password
            </button>
          </form>

          <form onSubmit={handleProfileImageSubmit} className="mb-6">
            <h2 className="text-2xl mb-4">Upload Profile Picture</h2>
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>
            <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
              Upload
            </button>
          </form>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Settings;
