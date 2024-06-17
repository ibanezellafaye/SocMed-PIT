import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Layout from './Layout';
import UsersPage from './UsersPage';
import PostDetail from './PostDetail';
import Message from './Message';

// Create a context for the theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <Routes>
          <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegistrationForm />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

          <Route element={isLoggedIn ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path='/posts/:postId' element={<PostDetail />} />
            <Route path="/messages/:userId?" element={<Message />} />
          </Route>
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
