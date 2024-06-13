import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const EditProfile = () => {
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
        window.location.reload();
      }
    }, [navigate]);

    const handleProfile = () => {
      navigate('/profile');
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
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    return (
      <div>
        <Helmet>
          <title>Edit Profile</title>
      </Helmet>
        <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] h-screen overflow-y-scroll p-14">
          <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block"></aside>
            <main className="min-h-screen">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                <img
                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-cyan-300 dark:ring-cyan-500"
                                    src="https://xsgames.co/randomusers/avatar.php?g=male"
                                    alt="Bordered avatar"
                                />
                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <button
                                        type="button"
                                        className="py-3.5 px-7 text-base font-medium  transition duration-150 ease-in-out focus:outline-none bg-white rounded-lg border  border-cyan-500 text-cyan-500 hover:text-white dark:hover:bg-cyan-500"
                                    >
                                        Change picture
                                    </button>
                                    <button
                                        type="button"
                                        className="py-3.5 px-7 text-base font-medium transition duration-150 ease-in-out focus:outline-none bg-white rounded-lg border border-red-500 text-red-500 hover:text-white dark:hover:bg-red-500"
                                    >
                                        Delete picture
                                    </button>
                                </div>
                            </div>
                            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label
                                            htmlFor="first_name"
                                            className="block mb-2 text-sm font-semibold text-cyan-900 dark:text-cyan"
                                        >
                                            First name
                                        </label>
                                        <input
                                            type="text" 
                                            name="first_name" 
                                            value={formData.first_name} 
                                            onChange={handleInputChange} 
                                            className="border border-gray-300 text-cyan-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 outline-none items-center mb-4 rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor="last_name"
                                            className="block mb-2 text-sm font-semibold text-cyan-900 dark:text-cyan"
                                        >
                                            Last name
                                        </label>
                                        <input
                                            type="text" 
                                            name="last_name" 
                                            value={formData.last_name} 
                                            onChange={handleInputChange}
                                            className="border border-gray-300 text-cyan-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 outline-none items-center mb-4 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                
                                <div className="mb-6">
                                    <label
                                        htmlFor="message"
                                        className="block mb-2 text-sm font-semibold text-cyan-900 dark:text-cyan"
                                    >
                                        Bio
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        type="text" 
                                        name="bio" 
                                        value={formData.bio} 
                                        onChange={handleInputChange}
                                        className="border border-gray-300 text-cyan-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 outline-none items-center mb-4 rounded-lg"
                                        placeholder="Bio"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                  <button
                                          type="submit"
                                          onClick={handleProfile}
                                          className="py-2.5 px-5 text-base font-medium transition duration-150 ease-in-out bg-red-500 rounded-lg border border-red-500 hover:text-white  dark:hover:bg-red-500"
                                      >
                                          Cancel
                                  </button>
                                

                                    <button
                                        type="submit"
                                        onClick = {handleFormSubmit}
                                        className="ml-5 py-2.5 px-5 text-base font-medium transition duration-150 ease-in-out bg-cyan-500 rounded-lg border border-cyan-500   hover:text-white dark:hover:bg-cyan-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
            </main>
        </div>
        </div>
    );
};

export default EditProfile;
