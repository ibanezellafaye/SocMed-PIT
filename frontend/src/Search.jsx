// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Search = ({ updateFollowing, following }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const initialSearchResults = location.state?.searchResults || [];
//   const loggedInUser = JSON.parse(localStorage.getItem('user'));

//   const [searchResults, setSearchResults] = useState(initialSearchResults);

//   useEffect(() => {
//     const fetchFollowStatus = async () => {
//       try {
//         const updatedResults = await Promise.all(initialSearchResults.map(async (user) => {
//           const response = await axios.get(`http://localhost:8000/api/users/${user.id}/follow-status`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('authToken')}`
//             }
//           });
//           return { ...user, isFollowing: response.data.isFollowing };
//         }));
//         setSearchResults(updatedResults);
//       } catch (error) {
//         console.error('Error fetching follow status:', error);
//       }
//     };

//     fetchFollowStatus();
//   }, [initialSearchResults]);

//   const handleFollow = async (userId) => {
//     try {
//       await axios.post(`http://localhost:8000/api/users/${userId}/follow`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       updateSearchResults(userId, true);
//       updateFollowing(userId, true);
//     } catch (error) {
//       console.error('Error following user:', error);
//     }
//   };

//   const handleUnfollow = async (userId) => {
//     try {
//       await axios.post(`http://localhost:8000/api/users/${userId}/unfollow`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
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
//     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };
//   const handlebackfollowing = () => {
//     navigate('/following');
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={() => navigate(-1)}>Back</button>
//       </div>
//       <div>
//         <button onClick={handlebackfollowing}>GoToFollowing</button>
//       </div>
//       <h1>Search Results</h1>
//       {searchResults.length > 0 ? (
//         <ul>
//           {searchResults
//             .filter(result => result.id !== loggedInUser.id) // Filter out the logged-in user
//             .map((result) => (
//               <li key={result.id}>
//                 <p><strong>Name:</strong> {result.first_name} {result.last_name}</p>
//                 <p><strong>Address:</strong> {result.address}</p>
//                 <p><strong>Gender:</strong> {result.gender}</p>
//                 <p><strong>Age:</strong> {calculateAge(result.birthdate)}</p>
//                 <div>
//                   {result.isFollowing ? (
//                     <button onClick={() => handleUnfollow(result.id)}>Unfollow</button>
//                   ) : (
//                     <button onClick={() => handleFollow(result.id)}>Follow</button>
//                   )}
//                 </div>
//               </li>
//             ))}
//         </ul>
//       ) : (
//         <p>No users found.</p>
//       )}
//     </div>
//   );
// };

// export default Search;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = ({ updateFollowing, following }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialSearchResults = location.state?.searchResults || [];
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const [searchResults, setSearchResults] = useState(initialSearchResults);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const updatedResults = await Promise.all(
          initialSearchResults.map(async (user) => {
            const response = await axios.get(
              `http://localhost:8000/api/users/${user.id}/follow-status`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                }
              }
            );
            return { ...user, isFollowing: response.data.isFollowing };
          })
        );
        setSearchResults(updatedResults);
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    fetchFollowStatus();
  }, [initialSearchResults]);

  const handleFollow = async (userId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/users/${userId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
      updateSearchResults(userId, true);
      updateFollowing(userId, true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/users/${userId}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
      updateSearchResults(userId, false);
      updateFollowing(userId, false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const updateSearchResults = (userId, isFollowing) => {
    const updatedResults = searchResults.map((user) => {
      if (user.id === userId) {
        return { ...user, isFollowing };
      }
      return user;
    });
    setSearchResults(updatedResults);
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleBackFollowing = () => {
    navigate('/following');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={handleBackFollowing}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Go to Following
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>
      {searchResults.length > 0 ? (
        <ul className="space-y-4">
          {searchResults
            .filter((result) => result.id !== loggedInUser.id) // Filter out the logged-in user
            .map((result) => (
              <li
                key={result.id}
                className="p-4 border border-gray-700 rounded-md bg-gray-800"
              >
                <p>
                  <strong>Name:</strong> {result.first_name} {result.last_name}
                </p>
                <p>
                  <strong>Address:</strong> {result.address}
                </p>
                <p>
                  <strong>Gender:</strong> {result.gender}
                </p>
                <p>
                  <strong>Age:</strong> {calculateAge(result.birthdate)}
                </p>
                <div className="mt-4">
                  {result.isFollowing ? (
                    <button
                      onClick={() => handleUnfollow(result.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow(result.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                    >
                      Follow
                    </button>
                  )}
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

export default Search;
