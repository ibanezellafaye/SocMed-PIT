// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const MessageList = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMessagedUsers();
//   }, []);

//   const fetchMessagedUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/messages/users', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError('Error fetching users');
//     }
//   };

//   const handleNavigateToMessage = (userId) => {
//     navigate(`/message/${userId}`);
//   };

//   const handledashboard = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Messaged Users</h2>
//       <div>
//         <button onClick={handledashboard}>GoToDashboard</button>
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//       {users.length > 0 ? (
//         <ul>
//           {users.map((user) => (
//             <li key={user.id} className="mb-2 p-2 border rounded shadow-sm">
//               <p><strong>{user.first_name} {user.last_name}</strong></p>
//               <button
//                 onClick={() => handleNavigateToMessage(user.id)}
//                 className="bg-blue-500 text-white px-2 py-1 rounded"
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

// export default MessageList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MessageList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessagedUsers();

    // Set up polling to fetch messaged users every 5 seconds
    const intervalId = setInterval(() => {
      fetchMessagedUsers();
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessagedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/messages/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    }
  };

  const handleNavigateToMessage = async (userId) => {
    await markAllMessagesAsRead(userId);
    navigate(`/message/${userId}`);
  };

  const markAllMessagesAsRead = async (userId) => {
    try {
      await axios.patch(`http://localhost:8000/api/messages/${userId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, has_unread_messages: false } : user
        )
      );
    } catch (error) {
      console.error('Error marking messages as read:', error);
      setError('Error marking messages as read');
    }
  };

  const handledashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Messaged Users</h2>
        <div className="mb-4">
          <button onClick={handledashboard} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            Go To Dashboard
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-2 p-2 border rounded shadow-sm bg-gray-800 flex items-center space-x-4">
                <img
                  src={`http://localhost:8000/storage/${user.profile_picture}`}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback image
                />
                <div>
                  <p><strong>{user.first_name} {user.last_name}</strong></p>
                  {user.has_unread_messages ? (
                    <button
                      onClick={() => handleNavigateToMessage(user.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                    >
                      Mark as Read
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/message/${user.id}`)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                    >
                      Message
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
    </div>
  );
};

export default MessageList;


