

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from './App';
import axiosInstance from './axiosConfig';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
    <HelmetProvider>
      <Helmet>
      <title>{user.first_name} {user.last_name}</title>
      <meta name="viewport" content="width=device-width, initial-scale=0.50, maximum-scale=1.0, user-scalable=yes" />
      </Helmet>

    <div className={`flex-1 flex flex-col ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-row  justify-center"></div>
      <div className={`bg-indigo-400 p-4 h-56 rounded-2xl mt-6 border  ml-15 mx-auto w-[40rem] ${theme === 'dark' ? 'bg-gray-900 text-white ' : 'bg-white text-black '}`}>
      </div>
        <div className="mx-auto w-32 h-32 -mt-16 border-4 border-white rounded-full overflow-hidden">
        {user.profile_image_url ? (
          <img src={user.profile_image_url} alt="Profile" className="w-full h-full rounded-full" />
        ) : (
          <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
            No Image
          </div>
        )}
        </div>
        <div className="mt-2">

        <div className="text-center mt-2">
                <h2 className="font-semibold text-2xl">{user.first_name} {user.last_name}</h2> 
                <p className="text-gray-500">{user.email}</p>
        </div>
          
          <div className={`mt-2 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <ul className={`divide-y w-64 mx-auto rounded  py-2 px-3 text-gray-500  shadow-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
              <li className="flex items-center py-3 text-sm">
                  <span className='mx-auto'>Email: {user.email}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span className='mx-auto'>Address: {user.address}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span className='mx-auto'>Birthday: {moment(user.birthdate).format('MMMM Do YYYY')}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span className='mx-auto'>Gender: {user.gender}</span>
              </li>
            </ul>
        </div>
      </div>
    <nav className={`flex items-center rounded-xl justify-center text-lg bg-gray-100 mt-7 p-4 mx-auto w-[40rem] shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white ' : 'bg-gray-200 text-black '}`}>
        <div>
            <a className={`text-gray-700  font-extrabold  ${theme === 'dark' ? ' text-white ' : ' text-black '}`} >My Post</a>
          </div>
        <div>
        </div>
        </nav>
      <div className="flex flex-row mt-0 justify-center">
      <div className="col-span-2 space-y-4 w-[50rem]">

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
        <p className={`text-gray-700 flex items-center justify-center font-extrabold mt-20 ${theme === 'dark' ? ' text-white ' : ' text-black '}`}>No posts found</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
    </div>
    </div>
    </HelmetProvider>
  );
};

export default UserProfile;
