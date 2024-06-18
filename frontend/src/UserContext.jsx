// UserContext.js connected in settings kung magchange kag information automatic ma change tanan across pages
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const response = await axios.get('http://localhost:8000/api/user', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
