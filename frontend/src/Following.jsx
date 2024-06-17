import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './App'; // Import the theme context

const Following = () => {
  const [following, setFollowing] = useState([]);
  const { theme } = useTheme(); // Get the current theme
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowing = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        // Fetch the IDs of the users the current user is following
        const response = await axios.get('http://localhost:8000/api/following', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        const userIds = response.data;

        // Fetch details of each followed user
        const userDetails = await Promise.all(userIds.map(async (userId) => {
          const userResponse = await axios.get(`http://localhost:8000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          return userResponse.data;
        }));

        setFollowing(userDetails);
      } catch (error) {
        console.error('Error fetching following users:', error);
      }
    };

    fetchFollowing();
  }, []);

  const handleUnfollow = async (userId) => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.post(`http://localhost:8000/api/unfollow`, { user_id: userId }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setFollowing(following.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleMessage = (userId) => {
    navigate(`/messages/${userId}`);
  };

  return (
    <div className={`ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold mb-4">Following Users</h1>
      {following.length > 0 ? (
        following.map((user) => (
          <div key={user.id} className={`mb-4 p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-md shadow-md`}>
            <p className="font-bold">{user.first_name} {user.last_name}</p>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleUnfollow(user.id)}
                className="py-1 px-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
              >
                Unfollow
              </button>
              <button
                onClick={() => handleViewProfile(user.id)}
                className="py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                View Profile
              </button>
              <button
                onClick={() => handleMessage(user.id)}
                className="py-1 px-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
              >
                Message
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>You are not following any users.</p>
      )}
    </div>
  );
};

export default Following;
