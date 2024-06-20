// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useTheme } from './App'; // Import the theme context

// const Following = () => {
//   const [following, setFollowing] = useState([]);
//   const { theme } = useTheme(); // Get the current theme
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFollowing = async () => {
//       const authToken = localStorage.getItem('authToken');
//       try {
//         // Fetch the IDs of the users the current user is following
//         const response = await axios.get('http://localhost:8000/api/following', {
//           headers: { Authorization: `Bearer ${authToken}` }
//         });
//         const userIds = response.data;

//         // Fetch details of each followed user
//         const userDetails = await Promise.all(userIds.map(async (userId) => {
//           const userResponse = await axios.get(`http://localhost:8000/api/users/${userId}`, {
//             headers: { Authorization: `Bearer ${authToken}` }
//           });
//           return userResponse.data;
//         }));

//         setFollowing(userDetails);
//       } catch (error) {
//         console.error('Error fetching following users:', error);
//       }
//     };

//     fetchFollowing();
//   }, []);

//   const handleUnfollow = async (userId) => {
//     const authToken = localStorage.getItem('authToken');
//     try {
//       await axios.post(`http://localhost:8000/api/unfollow`, { user_id: userId }, {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       setFollowing(following.filter(user => user.id !== userId));
//     } catch (error) {
//       console.error('Error unfollowing user:', error);
//     }
//   };

//   const handleViewProfile = (userId) => {
//     navigate(`/profile/${userId}`);
//   };

//   const handleMessage = (userId) => {
//     navigate(`/messages/${userId}`);
//   };

//   return (
//     <div className={`ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
//       <h1 className="text-3xl font-bold mb-4">Following Users</h1>
//       {following.length > 0 ? (
//         following.map((user) => (
//           <div key={user.id} className={`mb-4 p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-md shadow-md`}>
//             <p className="font-bold">{user.first_name} {user.last_name}</p>
//             <p className="text-gray-600">{user.email}</p>
//             <div className="flex space-x-2 mt-2">
//               <button
//                 onClick={() => handleUnfollow(user.id)}
//                 className="py-1 px-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
//               >
//                 Unfollow
//               </button>
//               <button
//                 onClick={() => handleViewProfile(user.id)}
//                 className="py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
//               >
//                 View Profile
//               </button>
//               <button
//                 onClick={() => handleMessage(user.id)}
//                 className="py-1 px-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
//               >
//                 Message
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>You are not following any users.</p>
//       )}
//     </div>
//   );
// };

// export default Following;


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
          return { ...userResponse.data, id: userId }; // Ensure each user has a unique id
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
    
    <div className={`min-h-screen ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
  <div className="mx-auto max-w-lg p-6">
    <h1 className="text-2xl font-bold mb-6 mx-auto">Following Users</h1>
    {following.length > 0 ? (
      following.map((user) => (
        <div key={user.id} className={`mb-4 px-5 py-5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-md shadow-md`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {user.profile_image_url ? (
                <img src={user.profile_image_url} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 mr-4">
                  No Image
                </div>
              )}
              <div>
                <button onClick={() => handleViewProfile(user.id)} className={`text-lg no-underline hover:underline hover:text-cyan-500 font-semibold ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  {user.first_name} {user.last_name}
                </button>
                <p className={`text-gray-600 ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>{user.email}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUnfollow(user.id)}
                className="py-1 px-2 bg-red-600 hover:bg-red-700 rounded-full text-white"
              >
                Unfollow
              </button>
              <button
                onClick={() => handleMessage(user.id)}
                className="py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
              >
                Message
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>You are not following any users.</p>
    )}
  </div>
</div>

      );
    };

    export default Following;

