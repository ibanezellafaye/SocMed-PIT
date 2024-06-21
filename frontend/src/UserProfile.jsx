

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from './App';
import axiosInstance from './axiosConfig';
import { Helmet } from 'react-helmet';


const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const userResponse = await axiosInstance.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUser(userResponse.data);

        const postsResponse = await axiosInstance.get(`/users/${userId}/posts`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again.');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleViewPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`ml-72 mt-5 p-6 h-[91vh]  overflow-y-scroll ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Helmet>
      <title>{user.first_name} {user.last_name}</title>
      </Helmet>
      <div className={`flex flex-col items-center mb-4 max-w-lg mx-auto my-10 rounded-xl shadow-md p-5 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        {user.profile_image_url ? (
          <img src={user.profile_image_url} alt="Profile" className="w-24 h-24 rounded-full" />
        ) : (
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200">
            No Image
          </div>
        )}
        <div className="mt-4">

          <h1 className="text-center text-2xl font-semibold mt-3">{user.first_name} {user.last_name}</h1>
          
          <div className={`mt-2 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <ul className={`divide-y w-96 mx-auto rounded  py-2 px-3 text-gray-600  ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
              <li className="flex items-center py-3 text-sm">
                  <span>Email</span>
                  <span className="ml-auto"> {user.email}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Address</span>
                <span className="ml-auto">{user.address}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Birthday</span>
                <span className="ml-auto"> {moment(user.birthdate).format('MMMM Do YYYY')}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Gender</span>
                <span className="ml-auto"> {user.gender}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Role</span>
                <span className="ml-auto"> {user.role}</span>
              </li>
            </ul>
        </div>
      </div>
    </div>

      <h2 className="text-3xl font-bold mt-8 mb-4">Posts</h2>
      <div className="space-y-4">

      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className={`mb-4 p-4 bg-gray-100 rounded-xl shadow-md mt-6  ml-15 mx-auto w-[40rem] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl shadow-md`}>
            <div className="items-center mb-2 flex  -mt-18">
              
              <div className="text-sm mb-3">
              <p className={`font-bold text-lg	${theme === 'dark' ? ' text-white' : ' text-black'}`}> {user.first_name} {user.last_name}</p> 
              <p className={`text-xs ${theme === 'dark' ? ' text-gray-50' : ' text-gray-500'}`}> {moment(post.created_at).format('MMMM Do YYYY, h:mm a')}</p>
              </div>
            </div>
            <p>{post.content}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleViewPost(post.id)}
                className="py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white ml-auto"
              >
                View Post
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {(post.comments || []).map((comment) => (
                <div key={comment.id} className={`p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-md`}>
                  <div className="text-sm">
                    {comment.user && `${comment.user.first_name} ${comment.user.last_name} on ${moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}`}
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
    </div>
  );
};

export default UserProfile;
