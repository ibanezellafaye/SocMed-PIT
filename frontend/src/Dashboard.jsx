// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import PostForm from './PostForm';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       // Redirect to login if no user data found
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     // Clear user data and token from local storage
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');

//     // Redirect to the login page
//     navigate('/login');
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearch = async () => {
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.get(`http://localhost:8000/api/users?search=${searchQuery}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });
//       const searchResults = response.data;

//       // Navigate to the Search page with the search results
//       navigate('/search', { state: { searchResults } });
//     } catch (error) {
//       console.error('Error searching users:', error);
//       if (error.response && error.response.status === 401) {
//         // Token expired, handle token refresh here
//         // For simplicity, you can redirect to login for token refresh
//         navigate('/login');
//       }
//     }
//   };

//   const handleProfile = () => {
//     navigate('/profile');
//   };

//   const handleFollowingList = () => {
//     navigate('/following');
//   };

//   const handleMessageList = () => {
//     navigate('/messages');
//   };

//   const handleNotification = () => {
//     navigate('/notifications');
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>---Welcome to the Dashboard---</h1>
//       <p><strong>Account:</strong> {user.first_name} {user.last_name}</p>

//       <div>
//         <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search users" />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       <div>
//         <button onClick={handleProfile}>GoToProfile</button>
//       </div>

//       <div>
//         <button onClick={handleNotification}>Notifications</button>
//       </div>

//       <div>
//         <button onClick={handleFollowingList}>Following List</button>
//       </div>

//       <div>
//         <button onClick={handleMessageList}>Message</button>
//       </div>

//       <div>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       <PostForm/>
      
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user data found
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data and token from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Redirect to the login page
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:8000/api/users?search=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const searchResults = response.data;

      // Navigate to the Search page with the search results
      navigate('/search', { state: { searchResults } });
    } catch (error) {
      console.error('Error searching users:', error);
      if (error.response && error.response.status === 401) {
        // Token expired, handle token refresh here
        // For simplicity, you can redirect to login for token refresh
        navigate('/login');
      }
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleNotification = () => {
    navigate('/notifications');
  };

  const handleFollowingList = () => {
    navigate('/following');
  };

  const handleMessageList = () => {
    navigate('/messages');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed w-64 bg-gray-800 p-6 flex flex-col justify-between h-full">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
          <p className="mb-6 text-center"><strong>Account:</strong> {user.first_name} {user.last_name}</p>
          <input 
            type="text" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            placeholder="Search users" 
            className="w-full px-3 py-2 mb-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <button 
            onClick={handleSearch} 
            className="w-full py-2 mb-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
          >
            Search
          </button>
          <button 
            onClick={handleProfile} 
            className="w-full py-2 mb-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
          >
            GoToProfile
          </button>
          <button 
            onClick={handleNotification} 
            className="w-full py-2 mb-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
          >
            Notifications
          </button>
          <button 
            onClick={handleFollowingList} 
            className="w-full py-2 mb-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
          >
            Following List
          </button>
          <button 
            onClick={handleMessageList} 
            className="w-full py-2 mb-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
          >
            Message
          </button>
        </div>
        <button 
          onClick={handleLogout} 
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md transition duration-200 mt-6"
        >
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-grow p-8 ml-64">
        <PostForm />
      </div>
    </div>
  );
};

export default Dashboard;
