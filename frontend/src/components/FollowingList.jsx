// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const FollowingList = ({ updateFollowing, following }) => {
//   const [followingDetails, setFollowingDetails] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchFollowing();
//   }, [following]);

//   const fetchFollowing = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (!user) {
//         throw new Error('User not logged in');
//       }
//       const response = await axios.get(`http://localhost:8000/api/users/${user.id}/following`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setFollowingDetails(response.data);
//     } catch (error) {
//       setError('Error fetching following list');
//     }
//   };

//   const handleUnfollow = async (followingId) => {
//     try {
//       await axios.post(`http://localhost:8000/api/users/${followingId}/unfollow`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       updateFollowing(followingId, false); // Update the following list in parent component
//     } catch (error) {
//       setError('Error unfollowing user');
//     }
//   };

//   const handledashboard = () => {
//     navigate('/dashboard');
//   };

//   const handleMessage = (followingId) => {
//     navigate(`/message/${followingId}`);
//   };

//   const calculateAge = (birthdate) => {
//     const birthDate = new Date(birthdate);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();
//     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h2 className="text-2xl font-bold mb-4">Following List</h2>
//       <div className="mb-4">
//         <button
//           onClick={handledashboard}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//         >
//           Go To Dashboard
//         </button>
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//       {followingDetails.length > 0 ? (
//         <ul className="space-y-4">
//           {followingDetails.map((item) => (
//             <li key={item.id} className="p-4 border border-gray-700 rounded-md bg-gray-800 flex items-center space-x-4">
//               <img
//                 src={`http://localhost:8000/storage/${item.following.profile_picture}`}
//                 alt={`${item.following.first_name} ${item.following.last_name}`}
//                 className="w-16 h-16 rounded-full object-cover"
//                 onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback image
//               />
//               <div>
//                 <p><strong>Name:</strong> {item.following.first_name} {item.following.last_name}</p>
//                 <p><strong>Address:</strong> {item.following.address}</p>
//                 <p><strong>Gender:</strong> {item.following.gender}</p>
//                 <p><strong>Age:</strong> {calculateAge(item.following.birthdate)}</p>
//                 <div className="mt-4">
//                   <button
//                     onClick={() => handleUnfollow(item.following.id)}
//                     className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mr-2"
//                   >
//                     Unfollow
//                   </button>
//                   <button
//                     onClick={() => handleMessage(item.following.id)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//                   >
//                     Message
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No users found.</p>
//       )}
//     </div>
//   );
// };

// export default FollowingList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FollowingList = ({ updateFollowing, following }) => {
  const [followingDetails, setFollowingDetails] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFollowing();
  }, [following]);

  const fetchFollowing = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error('User not logged in');
      }
      const response = await axios.get(`http://localhost:8000/api/users/${user.id}/following`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setFollowingDetails(response.data);
    } catch (error) {
      setError('Error fetching following list');
    }
  };

  const handleUnfollow = async (followingId) => {
    try {
      await axios.post(`http://localhost:8000/api/users/${followingId}/unfollow`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      updateFollowing(followingId, false); // Update the following list in parent component
    } catch (error) {
      setError('Error unfollowing user');
    }
  };

  const handleMessage = (followingId) => {
    navigate(`/message/${followingId}`);
  };

  const handleViewProfile = (userId) => {
    navigate(`/viewprofile/${userId}`);
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

  return (
    <div className="mx-auto max-w-lg flex h-screen w-full items-start justify-center bg-white text-sm text-gray-900 p-5">
      <div className="mb-4 relative h-8 w-8">
        <button onClick={() => navigate(-1)} type="button" className="absolute left-0 top-0 text-white bg-cyan-500 hover:bg-cyan-700 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
      </div>
      <div className="mx-auto max-w-lg p-6">
        <h1 className="text-3xl font-semibold mb-4">Following List</h1>
        {error && <p className="text-red-500">{error}</p>}
        {followingDetails.length > 0 ? (
          <ul className="space-y-4">
            {followingDetails.map((item) => (
              <li key={item.id} className="p-4 border-b border-gray-300 py-4 rounded-md bg-slate-100 flex items-center space-x-4">
                <img
                  src={`http://localhost:8000/storage/${item.following.profile_picture}`}
                  alt={`${item.following.first_name} ${item.following.last_name}`}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback image
                />
                <button
                  onClick={() => handleViewProfile(item.following.id)}
                  className="flex leading-snug mb-2 text-gray-900 font-semibold tracking-tight mr-4 hover:text-cyan-500"
                >
                  {item.following.first_name} {item.following.last_name}
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUnfollow(item.following.id)}
                    className="h-8 px-3 text-md font-bold text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white"
                  >
                    Unfollow
                  </button>
                  <button
                    onClick={() => handleMessage(item.following.id)}
                    className="h-8 px-3 text-md font-bold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
                  >
                    Message
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default FollowingList;

