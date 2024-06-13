import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = ({ updateFollowing, following }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialSearchResults = location.state?.searchResults || [];
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const [searchResults, setSearchResults] = useState(initialSearchResults);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const updatedResults = await Promise.all(initialSearchResults.map(async (user) => {
          const response = await axios.get(`http://localhost:8000/api/users/${user.id}/follow-status`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          return { ...user, isFollowing: response.data.isFollowing };
        }));
        setSearchResults(updatedResults);
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    fetchFollowStatus();
  }, [initialSearchResults]);

  const handleFollow = async (userId) => {
    try {
      await axios.post(`http://localhost:8000/api/users/${userId}/follow`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      updateSearchResults(userId, true);
      updateFollowing(userId, true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.post(`http://localhost:8000/api/users/${userId}/unfollow`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      updateSearchResults(userId, false);
      updateFollowing(userId, false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const updateSearchResults = (userId, isFollowing) => {
    const updatedResults = searchResults.map((user) => {
      if (user.id === userId) {
        return { ...user, isFollowing };
      }
      return user;
    });
    setSearchResults(updatedResults);
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const handlebackfollowing = () => {
    navigate('/following');
  };

  return (
    <div className="mx-auto max-w-lgflex h-screen w-full items-start justify-center bg-white text-sm text-gray-900 p-5">
      <div className="mb-4 relative h-8 w-8 ...">
        <button onClick={() => navigate(-1)} class="absolute left-0 top-0 ... text-white bg-cyan-500 hover:bg-cyan-700 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 ">
          <svg class="w-5 h-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
      </div>
      <div>
        <button onClick={handlebackfollowing}>GoToFollowing</button>
      </div>
      <h1>Search Results</h1>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults
            .filter(result => result.id !== loggedInUser.id) // Filter out the logged-in user
            .map((result) => (
              <li key={result.id}>
                <p><strong>Name:</strong> {result.first_name} {result.last_name}</p>
                <p><strong>Address:</strong> {result.address}</p>
                <p><strong>Gender:</strong> {result.gender}</p>
                <p><strong>Age:</strong> {calculateAge(result.birthdate)}</p>
                <div>
                  {result.isFollowing ? (
                    <button onClick={() => handleUnfollow(result.id)}>Unfollow</button>
                  ) : (
                    <button onClick={() => handleFollow(result.id)}>Follow</button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Search;
