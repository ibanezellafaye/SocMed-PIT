import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
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

  const handledashboard = () => {
    navigate('/dashboard');
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
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-8 border border-gray-700 rounded">
        <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        {editing ? (
          <>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400">First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-400">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-400">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-400">Birth Date:</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-400">Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-x-4">
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded">Save</button>
                <button type="button" onClick={handleEditToggle} className="bg-gray-500 px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
            <h3 className="text-xl font-bold mt-6 mb-4">Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-gray-400">Current Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-400">New Password:</label>
                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-400">Confirm New Password:</label>
                <input
                  type="password"
                  name="confirm_new_password"
                  value={formData.confirm_new_password}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
              </div>
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded">Change Password</button>
            </form>
          </>
        ) : (
          <div className="space-y-4 border border-gray-700 p-4 rounded">
            <div className="flex justify-center mb-4">
              {user.profile_picture ? (
                <img src={`http://localhost:8000/storage/${user.profile_picture}`} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Birth Date:</strong> {user.birthdate}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <div className='flex justify-center'>
                <button onClick={handleEditToggle} className="bg-yellow-500 px-4 py-2 rounded">Change Information</button>
            </div>
            
          </div>
        )}
        <div className="mt-6 text-center">
          <button onClick={handledashboard} className="bg-gray-700 px-4 py-2 rounded">GoToDashboard</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
