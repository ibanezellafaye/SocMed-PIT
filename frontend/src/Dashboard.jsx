import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';

const Dashboard = () => {
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
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data and token from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Redirect to the login page
    navigate('/login');
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

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleFollowingList = () => {
    navigate('/following');
  };

  const handleMessageList = () => {
    navigate('/messages');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>---Welcome to the Dashboard---</h1>
      <p><strong>Account:</strong> {user.first_name} {user.last_name}</p>

      <div>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search users" />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <button onClick={handleProfile}>GoToProfile</button>
      </div>

      <div>
        <button onClick={handleFollowingList}>Following List</button>
      </div>

      <div>
        <button onClick={handleMessageList}>Message List</button>
      </div>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <PostForm/>
    </div>
  );
};

export default Dashboard;
