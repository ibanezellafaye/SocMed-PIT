// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import RegistrationForm from './RegistrationForm';
// import LoginForm from './LoginForm';
// import Dashboard from './Dashboard';
// import PostForm from './PostForm';
// import ViewProfile from './ViewProfile';
// import Profile from './Profile';
// import Search from './Search';
// import FollowingList from './FollowingList';
// import Message from './Message';
// import MessageList from './MessageList';
// import Notification from './Notification'; 
// import Settings from './Settings';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//     setIsLoggedIn(false);
//   };

//   const [following, setFollowing] = useState([]);

//   const updateFollowing = (userId, isFollowing) => {
//     setFollowing((prevFollowing) => {
//       if (isFollowing) {
//         return [...prevFollowing, userId];
//       } else {
//         return prevFollowing.filter((id) => id !== userId);
//       }
//     });
//   };

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegistrationForm />} />
//           <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />} />
//           <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home handleLogin={handleLogin} />} />
//           <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
//           <Route path="/search" element={<Search updateFollowing={updateFollowing} following={following} />} />
//           <Route path="/postform" element={isLoggedIn ? <PostForm /> : <Navigate to="/login" />} />
//           <Route path="/profile/:id" element={<ViewProfile />} />
//           <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
//           <Route path="/following" element={<FollowingList updateFollowing={updateFollowing} following={following} />} />
//           <Route path="/message/:followingId" element={isLoggedIn ? <Message /> : <Navigate to="/login" />} />
//           <Route path="/messages" element={isLoggedIn ? <MessageList /> : <Navigate to="/login" />} />
//           <Route path="/notifications" element={isLoggedIn ? <Notification /> : <Navigate to="/login" />} />
//           <Route path="/viewprofile/:userId" element={<ViewProfile />} />
//           <Route path="/settings" element={<Settings />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// const Home = ({ handleLogin }) => (
//   <>
//     <RegistrationForm />
//     <LoginForm onLogin={handleLogin} />
//   </>
// );

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import PostForm from './PostForm';
import ViewProfile from './ViewProfile';
import Profile from './Profile';
import Search from './Search';
import FollowingList from './FollowingList';
import Message from './Message';
import MessageList from './MessageList';
import Notification from './Notification'; 
import Settings from './Settings';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const [following, setFollowing] = useState([]);

  const updateFollowing = (userId, isFollowing) => {
    setFollowing((prevFollowing) => {
      if (isFollowing) {
        return [...prevFollowing, userId];
      } else {
        return prevFollowing.filter((id) => id !== userId);
      }
    });
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegistrationForm />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home handleLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/search" element={<Search updateFollowing={updateFollowing} following={following} />} />
          <Route path="/postform" element={isLoggedIn ? <PostForm /> : <Navigate to="/login" />} />
          <Route path="/profile/:id" element={<ViewProfile />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/following" element={<FollowingList updateFollowing={updateFollowing} following={following} />} />
          <Route path="/message/:followingId" element={isLoggedIn ? <Message /> : <Navigate to="/login" />} />
          <Route path="/messages" element={isLoggedIn ? <MessageList /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={isLoggedIn ? <Notification /> : <Navigate to="/login" />} />
          <Route path="/viewprofile/:userId" element={<ViewProfile />} />
          <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = ({ handleLogin }) => (
  <>
    <LoginForm onLogin={handleLogin} />
  </>
);

export default App;
