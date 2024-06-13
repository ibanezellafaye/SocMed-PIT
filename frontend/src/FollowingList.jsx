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
//       updateFollowing(followingId, false);
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

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Following List</h2>
//       <div>
//         <button onClick={handledashboard}>GoToDashboard</button>
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//       {followingDetails.length > 0 ? (
//         <ul>
//           {followingDetails.map((item) => (
//             <li key={item.id} className="mb-2 p-2 border rounded shadow-sm">
//               <p><strong>Name:</strong> {item.following.first_name} {item.following.last_name}</p>
//               <p><strong>Address:</strong> {item.following.address}</p>
//               <p><strong>Gender:</strong> {item.following.gender}</p>
//               <p><strong>Age:</strong> {calculateAge(item.following.birthdate)}</p>
//               <button
//                 onClick={() => handleUnfollow(item.following.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded ml-2"
//               >
//                 Unfollow
//               </button>
//               <button
//                 onClick={() => handleMessage(item.following.id)}
//                 className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
//               >
//                 Message
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No users found.</p>
//       )}
//     </div>
//   );
// };

// const calculateAge = (birthdate) => {
//   const birthDate = new Date(birthdate);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDifference = today.getMonth() - birthDate.getMonth();
//   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
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

  const handledashboard = () => {
    navigate('/dashboard');
  };

  const handleMessage = (followingId) => {
    navigate(`/message/${followingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Following List</h2>
      <div className="mb-4">
        <button
          onClick={handledashboard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          GoToDashboard
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {followingDetails.length > 0 ? (
        <ul className="space-y-4">
          {followingDetails.map((item) => (
            <li key={item.id} className="p-4 border border-gray-700 rounded-md bg-gray-800">
              <p><strong>Name:</strong> {item.following.first_name} {item.following.last_name}</p>
              <p><strong>Address:</strong> {item.following.address}</p>
              <p><strong>Gender:</strong> {item.following.gender}</p>
              <p><strong>Age:</strong> {calculateAge(item.following.birthdate)}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleUnfollow(item.following.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mr-2"
                >
                  Unfollow
                </button>
                <button
                  onClick={() => handleMessage(item.following.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
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
  );
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

export default FollowingList;
