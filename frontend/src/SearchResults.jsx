// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Search = ({ updateFollowing, following }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const initialSearchResults = location.state?.searchResults || [];
//   const loggedInUser = JSON.parse(localStorage.getItem('user'));

//   const [searchResults, setSearchResults] = useState(initialSearchResults);

//   const fetchFollowStatus = async (user) => {
//     const MAX_RETRIES = 3;
//     let retries = 0;
//     while (retries < MAX_RETRIES) {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/users/${user.id}/follow-status`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//             },
//           }
//         );
//         return { ...user, isFollowing: response.data.isFollowing };
//       } catch (error) {
//         if (error.response && error.response.status === 429) {
//           retries += 1;
//           const delay = Math.pow(2, retries) * 1000;
//           await new Promise((resolve) => setTimeout(resolve, delay));
//         } else {
//           throw error;
//         }
//       }
//     }
//     throw new Error('Max retries reached');
//   };

//   useEffect(() => {
//     const fetchAllFollowStatuses = async () => {
//       try {
//         const updatedResults = await Promise.all(
//           initialSearchResults.map((user) => fetchFollowStatus(user))
//         );
//         setSearchResults(updatedResults);
//       } catch (error) {
//         console.error('Error fetching follow status:', error);
//       }
//     };

//     fetchAllFollowStatuses();
//   }, [initialSearchResults]);

//   const handleFollow = async (userId) => {
//     try {
//       await axios.post(
//         `http://localhost:8000/api/users/${userId}/follow`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`
//           }
//         }
//       );
//       updateSearchResults(userId, true);
//       updateFollowing(userId, true);
//     } catch (error) {
//       console.error('Error following user:', error);
//     }
//   };

//   const handleUnfollow = async (userId) => {
//     try {
//       await axios.post(
//         `http://localhost:8000/api/users/${userId}/unfollow`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`
//           }
//         }
//       );
//       updateSearchResults(userId, false);
//       updateFollowing(userId, false);
//     } catch (error) {
//       console.error('Error unfollowing user:', error);
//     }
//   };

//   const updateSearchResults = (userId, isFollowing) => {
//     const updatedResults = searchResults.map((user) => {
//       if (user.id === userId) {
//         return { ...user, isFollowing };
//       }
//       return user;
//     });
//     setSearchResults(updatedResults);
//   };

//   const calculateAge = (birthdate) => {
//     const birthDate = new Date(birthdate);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDifference < 0 ||
//       (monthDifference === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   const handleBackFollowing = () => {
//     navigate('/following');
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8 ml-64 mt-10">
//       <h1 className="text-2xl font-bold mb-6">Search Results</h1>
//       {searchResults.length > 0 ? (
//         <ul className="space-y-4">
//           {searchResults
//             .filter((result) => result.id !== loggedInUser.id) // Filter out the logged-in user
//             .map((result) => {
              
//               return (
//                 <li
//                   key={result.id}
//                   className="p-4 border border-gray-700 rounded-md bg-gray-800 flex items-center space-x-4"
//                 >
//                   <img
//                     src={`http://localhost:8000/storage/${result.profile_picture}`}
//                     alt={`${result.first_name} ${result.last_name}`}
//                     className="w-16 h-16 rounded-full object-cover"
//                     onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback image
//                   />
//                   <div>
//                     <p><strong>Name:</strong> {result.first_name} {result.last_name}</p>
//                     <p><strong>Address:</strong> {result.address}</p>
//                     <p><strong>Gender:</strong> {result.gender}</p>
//                     <p><strong>Age:</strong> {calculateAge(result.birthdate)}</p>
//                     <div className="mt-4">
//                       {result.isFollowing ? (
//                         <button
//                           onClick={() => handleUnfollow(result.id)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
//                         >
//                           Unfollow
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleFollow(result.id)}
//                           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//                         >
//                           Follow
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </li>
//               );
//             })}
//         </ul>
//       ) : (
//         <p>No users found.</p>
//       )}
//     </div>
//   );
// };

// export default Search;

