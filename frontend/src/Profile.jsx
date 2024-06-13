import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    birthdate: '',
    gender: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  const handledashboard = () => {
    navigate('/dashboard');
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${user.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 200) {
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="mx-auto flex h-screen w-full items-start justify-center bg-white text-sm text-gray-900 p-5">
  <div className="w-[40rem] shadow mt-24 p-8 ">
    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
      <img 
        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-cyan-300 dark:ring-cyan-500 mr-5"
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        alt="Bordered avatar"
      />

      <div className="mt-2 text-center sm:text-left">
        <h2 className="text-xl font-bold tracking-tight">{user.first_name} {user.last_name}</h2>

        <div className="flex items-center space-x-4 mt-1 mb-5">
          <div className="cursor-pointer hover:underline">
            <span className="text-gray-700 dark:text-gray-400">Following</span>
            <span className="font-bold"> {user.following}</span>
          </div>
          <div className="cursor-pointer hover:underline">
            <span className="text-gray-700 dark:text-gray-400">Followers</span>
            <span className="font-bold"> {user.followers}</span>
          </div>
        </div>

        <div className="mt-10">
          <span>bio</span>
        </div>
      </div>

    <div className="flex items-start justify-between py-3 px-4 mr-10">                
      <button onClick={handleEditProfile} className="w-[8rem] h-10  m-2 ml-20 font-bold px-5 py-1.5 font-boldhover:bg-cyan-200 dark:border-cyan-500  transition duration-150 ease-in-out focus:outline-none bg-white rounded-lg border  border-cyan-500 text-cyan-500 hover:text-white dark:hover:bg-cyan-500" >Edit Profile</button>
    </div>

  </div>
</div>
</div>
</div>
  );
};

export default Profile;
