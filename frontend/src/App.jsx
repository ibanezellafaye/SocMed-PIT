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
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import PostForm from './components/PostForm';
import ViewProfile from './components/ViewProfile';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Profile from './components/Profile';
import Search from './components/Search';
import FollowingList from './components/FollowingList';
import Message from './components/Message';
import MessageList from './components/MessageList';
import Notification from './components/Notification'; 
import Settings from './components/Settings';
import Layout from './components/shared/Layout';
import Sidebar from './components/shared/Sidebar';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  const handleLogin = () => {
    console.log('handleLogin called');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
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
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home handleLogin={handleLogin} />} />

          <Route element={<PublicRoute user={isLoggedIn} />}>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
          </Route>

          <Route element={<PrivateRoute user={isLoggedIn} />}>
            <Route path='/' element={<Layout logout={handleLogout}/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={isLoggedIn ? <Search updateFollowing={updateFollowing} following={following} /> : <Navigate to="/login" />} />
            <Route path="/postform" element={isLoggedIn ? <PostForm /> : <Navigate to="/login" />} />
            <Route path="/profile/:id" element={<ViewProfile setUser={isLoggedIn}/>} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/following" element={<FollowingList updateFollowing={updateFollowing} following={following} />} />
            <Route path="/message/:followingId" element={isLoggedIn ? <Message /> : <Navigate to="/login" />} />
            <Route path="/messages" element={isLoggedIn ? <MessageList /> : <Navigate to="/login" />} />
            <Route path="/notification" element={isLoggedIn ? <Notification /> : <Navigate to="/login" />} />
            <Route path="/viewprofile/:userId" element={<ViewProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="/" element={<LoginForm onLogin={handleLogin}/>} />
          </Route>

      </Routes>
    </Router>
  );
};

const Home = ({ handleLogin }) => (
  <>
    <LoginForm onLogin={handleLogin} />
  </>
);

export default App;
