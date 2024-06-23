

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './App';
import axiosInstance from './axiosConfig';
import { useUser } from './UserContext'; // Import the UserContext
import { Helmet, HelmetProvider } from 'react-helmet-async';

const MyPosts = () => {
  const { user } = useUser(); // Use the user context
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');

      if (user && authToken) {
        try {
          const postsResponse = await axiosInstance.get(`/user/posts`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setPosts(postsResponse.data.data || postsResponse.data);
        } catch (error) {
          console.error('Error fetching user posts:', error);
          setError('Failed to fetch user posts. Please try again.');
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserData();
  }, [user, navigate]);

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

      <div className={`flex-1 flex flex-col p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="flex flex-row justify-center"></div>
        <div className={`bg-indigo-400 p-4 h-56 rounded-2xl mt-6 mx-auto w-full max-w-4xl ${theme === 'dark' ? 'bg-gray-900 text-white ' : 'bg-slate-100 text-black '}`}>
        </div>
        <div className="mx-auto -mt-16 w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          {user.profile_image_url ? (
            <img src={user.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <h2 className="font-semibold text-2xl">{user.first_name} {user.last_name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <nav className={`flex items-center justify-center text-lg mt-7 p-4 mx-auto w-full max-w-4xl rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white ' : 'bg-gray-200 text-black '}`}>
          <div>
            <a className={`font-extrabold ${theme === 'dark' ? ' text-white ' : ' text-black '}`}>My Posts</a>
          </div>
        </nav>

        <div className="flex flex-col mt-0 justify-center items-center">
          <div className="space-y-4 w-full max-w-4xl">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className={`mb-4 p-4 rounded-xl mt-6 mx-auto w-full max-w-4xl shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm mb-5">
                      <p className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{user.first_name} {user.last_name}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-50' : 'text-gray-500'}`}>{moment(post.created_at).format('MMMM Do YYYY, h:mm a')}</p>
                    </div>
                  </div>
                  <p>{post.content}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleViewPost(post.id)}
                      className="py-1 px-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white ml-auto"
                    >
                      View Post
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    {(post.comments || []).map((comment) => (
                      <div key={comment.id} className={`p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-xl`}>
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

export default MyPosts;
