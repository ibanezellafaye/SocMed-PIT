import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Layout from './Layout';
import Search from './Search';
import PostDetail from './PostDetail';
import Message from './Message';
import Following from './Following';
import UserProfile from './UserProfile';
import Settings from './Settings';
import MyPosts from './MyPosts';
import { UserProvider } from './UserContext';
import ForgotPassword from './ForgotPassword';

// Create a context for the theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Initially set to false
  const sidebarRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <UserProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router>
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/forgot-password" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
            {/* <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} /> */}
            <Route element={isLoggedIn ? <Layout onLogout={handleLogout} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef} /> : <Navigate to="/login" />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Search />} />
              <Route path="/posts/:postId" element={<PostDetail />} />
              <Route path="/messages/:userId?" element={<Message />} />
              <Route path="/people" element={<Following />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<MyPosts />} />
            </Route>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
      </ThemeContext.Provider>
    </UserProvider>
  );
};

export default App;


// import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import RegistrationForm from './RegistrationForm';
// import LoginForm from './LoginForm';
// import Dashboard from './Dashboard';
// import Layout from './Layout';
// import Search from './Search';
// import PostDetail from './PostDetail';
// import Message from './Message';
// import Following from './Following';
// import UserProfile from './UserProfile';
// import Settings from './Settings';
// import MyPosts from './MyPosts';
// import { UserProvider } from './UserContext';
// import ForgotPassword from './ForgotPassword';

// // Create a context for the theme
// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem('theme', theme);
//     document.documentElement.className = theme;
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//     setIsLoggedIn(false);
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <UserProvider>
//       <ThemeContext.Provider value={{ theme, toggleTheme }}>
//         <Router>
//           <Routes>
//             <Route path="/register" element={<RegistrationForm />} />
//             <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route
//               element={
//                 isLoggedIn ? (
//                   <Layout onLogout={handleLogout} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef} />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             >
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/users" element={<Search />} />
//               <Route path="/posts/:postId" element={<PostDetail />} />
//               <Route path="/messages/:userId?" element={<Message />} />
//               <Route path="/people" element={<Following />} />
//               <Route path="/profile/:userId" element={<UserProfile />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/profile" element={<MyPosts />} />
//             </Route>
//             <Route path="/" element={<Layout onLogout={handleLogout}/>} />
//           </Routes>
//         </Router>
//       </ThemeContext.Provider>
//     </UserProvider>
//   );
// };

// export default App;

