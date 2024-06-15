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
    <div className="min-h-screen bg-gray-900 text-white p-8 ml-64 mt-8">
      <h2 className="text-2xl font-bold mb-4">Following</h2>
      {error && <p className="text-red-500">{error}</p>}
      {followingDetails.length > 0 ? (
        <ul className="space-y-4">
          {followingDetails.map((item) => (
            <li key={item.id} className="p-4 border border-gray-700 rounded-md bg-gray-800 flex items-center space-x-4">
              <img
                src={`http://localhost:8000/storage/${item.following.profile_picture}`}
                alt={`${item.following.first_name} ${item.following.last_name}`}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback image
              />
              <div>
                <p><strong>Name:</strong> {item.following.first_name} {item.following.last_name}</p>
                <p><strong>Address:</strong> {item.following.address}</p>
                <p><strong>Gender:</strong> {item.following.gender}</p>
                <p><strong>Age:</strong> {calculateAge(item.following.birthdate)}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleUnfollow(item.following.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                  >
                    Unfollow
                  </button>
                  <button
                    onClick={() => handleMessage(item.following.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Message
                  </button>
                  <button
                    onClick={() => handleViewProfile(item.following.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    View Profile
                  </button>
                </div>
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

export default FollowingList;
