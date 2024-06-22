// import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { useTheme } from './App';
// import axiosInstance from './axiosConfig';
// import { Helmet } from 'react-helmet';

// const MyPosts = () => {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { theme } = useTheme(); // Get the current theme

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const authToken = localStorage.getItem('authToken');
//       const storedUser = localStorage.getItem('user');
      
//       if (storedUser && authToken) {
//         const currentUser = JSON.parse(storedUser);
//         setUser(currentUser);

//         try {
//           const postsResponse = await axiosInstance.get(`/user/posts`, {
//             headers: { Authorization: `Bearer ${authToken}` },
//           });
//           setPosts(postsResponse.data.data || postsResponse.data);
//         } catch (error) {
//           console.error('Error fetching user posts:', error);
//           setError('Failed to fetch user posts. Please try again.');
//         }
//       } else {
//         navigate('/login');
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleViewPost = (postId) => {
//     navigate(`/posts/${postId}`);
//   };

  

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={`flex-1 flex flex-col ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
//       <div className='bg-indigo-400 p-4 h-56 rounded-2xl mt-6 border border-gray-200 ml-15 mx-auto w-[40rem]'>
//       </div>
//         <div className="mx-auto w-40 h-40 -mt-16 border-4 border-white rounded-full overflow-hidden">
//               <img className="object-cover object-center h-40" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front' />
//         </div>
//         <div className="text-center mt-2">
//                 <h2 className="font-semibold">{user.first_name} {user.last_name}</h2> 
//                 <p className="text-gray-500">{user.email}</p>
//         </div>

//         <nav class="flex items-center rounded-xl justify-center text-lg bg-gray-100 mt-7 p-4 mx-auto w-[40rem]">
//         <div>
//             <a className="text-gray-700 hover:text-gray-900 font-extrabold  ">My Post</a>
//           </div>
//         <div>
//         </div>
//         </nav>
//       <div className="flex flex-row mt-0 justify-center">
//         <div className="col-span-2 space-y-4 w-[50rem]">

//       {posts.length > 0 ? (
//         posts.map(post => (
//           <div key={post.id} className={`mb-4 p-4 rounded-xl mt-6 ml-15 mx-auto w-[40rem] shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
//             <div className="flex justify-between items-center mb-4">
            
//               <div className="text-sm mb-5">
//                 <p className={`font-bold text-lg	${theme === 'dark' ? ' text-white' : ' text-black'}`}> {user.first_name} {user.last_name}</p> 
//                     <p className={`text-xs		${theme === 'dark' ? ' text-gray-50' : ' text-gray-500'}`}> {moment(post.created_at).format('MMMM Do YYYY, h:mm a')}</p>
//               </div>
//             </div>
//             <p>{post.content}</p>
//             <div className="flex space-x-2 mt-2">
//               <button
//                 onClick={() => handleViewPost(post.id)}
//                 className="py-1 px-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white ml-auto"
//               >
//                 View Post
//               </button>
//             </div>
//             <div className="mt-4 space-y-2">
//               {(post.comments || []).map((comment) => (
//                 <div key={comment.id} className={`p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-xl`}>
//                   <div className="text-sm">
//                     {comment.user && `${comment.user.first_name} ${comment.user.last_name} on ${moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}`}
//                   </div>
//                   <p className="mt-2">{comment.content}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No posts found</p>
//       )}
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//     </div>
//     </div>
//   );
// };

// export default MyPosts;


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

      <div className={`flex-1 flex flex-col ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="flex flex-row justify-center"></div>
        <div className={`bg-indigo-400 p-4 h-56 rounded-2xl mt-6 mx-auto w-[40rem] ${theme === 'dark' ? 'bg-gray-900 text-white ' : 'bg-slate-100 text-black '}`}>
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

        <nav className={`flex items-center rounded-xl justify-center text-lg bg-gray-100 mt-7 p-4 mx-auto w-[40rem] shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white ' : 'bg-gray-200 text-black '}`}>
          <div>
            <a className={`text-gray-700 font-extrabold ${theme === 'dark' ? ' text-white ' : ' text-black '}`}>My Post</a>
          </div>
        </nav>

        <div className="flex flex-row mt-0 justify-center">
          <div className="col-span-2 space-y-4 w-[50rem]">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className={`mb-4 p-4 rounded-xl mt-6 mx-auto w-[40rem] shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
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
