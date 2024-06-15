// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchNotifications();

//     // Set up polling
//     const intervalId = setInterval(() => {
//       fetchNotifications();
//     }, 5000); // Fetch notifications every 5 seconds

//     // Clear interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/notifications', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setNotifications(response.data);
//     } catch (error) {
//       setError('Error fetching notifications');
//     }
//   };

//   const markAsReadAndNavigate = async (notificationId) => {
//     try {
//       await axios.patch(`http://localhost:8000/api/notifications/${notificationId}/read`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       fetchNotifications();
//       navigate('/messages');
//     } catch (error) {
//       setError('Error marking notification as read');
//     }
//   };

//   const handledashboard = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <div className="container mx-auto p-4">
//         <div>
//         <button onClick={handledashboard}>GoToDashboard</button>
//       </div>
//       <h2 className="text-2xl font-bold mb-4">Notifications</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {notifications.length > 0 ? (
//         <ul>
//           {notifications.map((notification) => (
//             <li key={notification.id} className="mb-2 p-2 border rounded shadow-sm">
//               <p><strong>{notification.message.sender.first_name} {notification.message.sender.last_name}</strong> sent you a message</p>
//               <button
//                 onClick={() => markAsReadAndNavigate(notification.id)}
//                 className="bg-blue-500 text-white px-2 py-1 rounded"
//               >
//                 Mark as Read
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No new notifications</p>
//       )}
//     </div>
//   );
// };

// export default Notification;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchNotifications();

//     // Set up polling
//     const intervalId = setInterval(() => {
//       fetchNotifications();
//     }, 5000); // Fetch notifications every 5 seconds

//     // Clear interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/notifications', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setNotifications(response.data);
//     } catch (error) {
//       setError('Error fetching notifications');
//     }
//   };

//   const markAsReadAndNavigate = async (notificationId) => {
//     try {
//       await axios.patch(`http://localhost:8000/api/notifications/${notificationId}/read`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       fetchNotifications();
//       navigate('/messages');
//     } catch (error) {
//       setError('Error marking notification as read');
//     }
//   };

//   const handledashboard = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-4">
//       <div className="mb-4">
//         <button
//           onClick={handledashboard}
//           className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//         >
//           Go To Dashboard
//         </button>
//       </div>
//       <h2 className="text-2xl font-bold mb-4">Notifications</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {notifications.length > 0 ? (
//         <ul>
//           {notifications.map((notification) => (
//             <li key={notification.id} className="mb-2 p-4 border border-gray-700 rounded shadow-sm bg-gray-800 flex items-center space-x-4">
//               <img
//                 src={`http://localhost:8000/storage/${notification.message.sender.profile_picture}`}
//                 alt={`${notification.message.sender.first_name} ${notification.message.sender.last_name}`}
//                 className="w-12 h-12 rounded-full object-cover"
//                 onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback image
//               />
//               <div>
//                 <p>
//                   <strong>{notification.message.sender.first_name} {notification.message.sender.last_name}</strong> sent you a message
//                 </p>
//                 <button
//                   onClick={() => markAsReadAndNavigate(notification.id)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-400 transition"
//                 >
//                   Mark as Read
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No new notifications</p>
//       )}
//     </div>
//   );
// };

// export default Notification;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();

    // Set up polling
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 5000); // Fetch notifications every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notifications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      const latestNotifications = getLatestNotifications(response.data);
      setNotifications(latestNotifications);
    } catch (error) {
      setError('Error fetching notifications');
    }
  };

  const getLatestNotifications = (notifications) => {
    const latestNotifications = {};

    notifications.forEach(notification => {
      const senderId = notification.message.sender.id;
      if (!latestNotifications[senderId] || new Date(notification.created_at) > new Date(latestNotifications[senderId].created_at)) {
        latestNotifications[senderId] = notification;
      }
    });

    return Object.values(latestNotifications);
  };

  const markAsReadAndNavigate = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:8000/api/notifications/${notificationId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      await deleteNotification(notificationId);
      fetchNotifications();
      navigate('/messages');
    } catch (error) {
      setError('Error marking notification as read');
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:8000/api/notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
    } catch (error) {
      setError('Error deleting notification');
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-4">
        <button
          onClick={handleDashboard}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Go To Dashboard
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {error && <p className="text-red-500">{error}</p>}
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="mb-2 p-4 border border-gray-700 rounded shadow-sm bg-gray-800 flex items-center space-x-4">
              <img
                src={`http://localhost:8000/storage/${notification.message.sender.profile_picture}`}
                alt={`${notification.message.sender.first_name} ${notification.message.sender.last_name}`}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback image
              />
              <div>
                <p>
                  <strong>{notification.message.sender.first_name} {notification.message.sender.last_name}</strong> sent you a message
                </p>
                <p className="text-gray-400 text-sm">{new Date(notification.created_at).toLocaleString()}</p>
                <button
                  onClick={() => markAsReadAndNavigate(notification.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-400 transition"
                >
                  Mark as Read
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
};

export default Notification;
