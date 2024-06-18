import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './App';

const MyPosts = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedUser && authToken) {
        const currentUser = JSON.parse(storedUser);
        setUser(currentUser);

        try {
          const postsResponse = await axios.get(`http://localhost:8000/api/user/posts`, {
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
  }, [navigate]);

  const handleViewPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex-1 flex flex-col ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold mb-4">My Posts</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className={`mb-4 p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-md shadow-md`}>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                {`${user.first_name} ${user.last_name} on ${moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}`}
              </div>
            </div>
            <p>{post.content}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleViewPost(post.id)}
                className="py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
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
  );
};

export default MyPosts;
