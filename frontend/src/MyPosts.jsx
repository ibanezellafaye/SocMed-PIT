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
  const [openTab, setOpenTab] = useState(1);
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

  const handleTabClick = (tabNumber) => {
    setOpenTab(tabNumber);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${user.first_name} ${user.last_name}`}</title>
      </Helmet>

      <div className={`ml-72 mt-20 flex-1 flex flex-col ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {/* Profile Section */}
        <div className="bg-gray-200 p-4 h-56 rounded-2xl mt-6 mx-auto w-[39rem]"></div>
        <div className="mx-auto -mt-16 w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          {user.profile_image_url ? (
            <img src={user.profile_image_url} alt="Profile" className="w-full h-full object-cover bg-white" />
          ) : (
            <div className="w-full h-full flex items-center justify-center  text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <h2 className="font-semibold text-2xl">{`${user.first_name} ${user.last_name}`}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Header */}
        <div className="py-4 bg-gray-100 shadow-md mt-10 w-[39rem] ml-[16rem] rounded-xl">
          <div className="flex justify-between items-center px-4 md:px-10">
            <div className="flex space-x-4">
              <button
                className={`px-3 py-2 font-bold text-base transition ${openTab === 1 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-black hover:text-indigo-600'}`}
                onClick={() => handleTabClick(1)}
              >
                Posts
              </button>
              <button
                className={`px-3 py-2 font-bold text-base transition ${openTab === 2 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-black hover:text-indigo-600'}`}
                onClick={() => handleTabClick(2)}
              >
                About
              </button>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        {openTab === 1 && (
          <div className="justify-center flex flex-col md:flex-row mt-2 ml-[0rem]">
            <div className="col-span-2 space-y-4 w-[50rem]">
              {posts.length > 0 ? (
                posts.map(post => (
                  <div key={post.id} className={`mb-4 p-4 rounded-xl mt-4 mx-auto w-[39rem] shadow-md bg-gray-100 text-black ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm mb-5">
                        <p className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{`${user.first_name} ${user.last_name}`}</p>
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
                          <p className="mt-2 ">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className={`text-gray-700 flex items-center justify-center font-extrabold mt-20 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>No posts found</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        )}

        {/* About Section */}
        {openTab === 2 && (
          <div className="justify-center flex flex-col md:flex-row mt-2 ml-[0rem]">
            <div className="col-span-2 space-y-4 w-[50rem]">
              <ul className="divide-y mx-auto w-[39rem] rounded-xl mt-3 bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                <li className="flex items-center py-3 text-sm">
                  <span>First Name</span>
                  <span className="ml-auto"> {user.first_name}</span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Last Name</span>
                  <span className="ml-auto"> {user.last_name}</span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Address</span>
                  <span className="ml-auto">{user.address}</span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Birthday</span>
                  <span className="ml-auto">{user.birthdate}</span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Gender</span>
                  <span className="ml-auto">{user.gender}</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default MyPosts;
