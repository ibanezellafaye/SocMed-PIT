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
        bio: ''
    });
    const [error, setError] = useState(null);
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
            setError('Error updating user information.');
        }
    };

    if (!user) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className=" bg-white w-full flex flex-col gap-5 md:px-16 lg:px-28 md:flex-row text-[#161931] h-screen overflow-y-scroll">
            <Helmet>
                <title>Edit Profile</title>
            </Helmet>
            <div className="bg-gray-100 w-full rounded-lg  justify-center mx-auto ">

            <div className=" py-4 md:w-1/3 lg:w-1/4 mx-auto">
                <main className="min-h-screen mx-auto">
                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                        {error && <p className="text-red-500">{error}</p>}
                        {editing ? (
                            <form onSubmit={handleFormSubmit} className="space-y-4 mt-32">
                                <div>
                                    <label className="mb-2.5 text-base font-medium text-dark dark:text-gray-400 mt-20">Profile Picture:</label>
                                    <input
                                        type="file"
                                        name="profile_picture"
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded file:mr-2"
                                    />
                                </div>
                                <div className="space-x-4">
                                    <button type="button" onClick={() => setEditing(false)} className="bg-red-500 px-4 py-2 rounded text-white font-semibold">Cancel</button>
                                    <button type="submit" className="bg-cyan-500 px-4 py-2 rounded text-white font-semibold">Save</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center relative">
                                <div>
                                    {user.profile_picture ? (
                                        <img src={`http://localhost:8000/storage/${user.profile_picture}`} alt="Profile" className=" mt-3 w-32 h-32 p-1 rounded-full ring-1 dark:ring-cyan-400 mx-auto mb-5 ml-[44px]" />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-gray-500">
                                            No Image
                                        </div>
                                    )}
                                    <div className="flex flex-col space-y-5 sm:ml-8">
                                        <button
                                            type="button"
                                            onClick={() => setEditing(true)}
                                            className="-ml-[1px] w-40 just px-2 py-2 text-base font-medium bg-white rounded-lg border border-cyan-500 text-cyan-500 hover:text-white dark:hover:bg-cyan-500 mx-auto"
                                        >
                                            Change picture
                                        </button>
                                    </div>
                                    <div className="items-center mt-8 mr-20 mx-auto">
                                        <div className="flex flex-col items-center  sm:flex-row sm:space-x-4 ">
                                            <div className="w-full">
                                                <label
                                                    htmlFor="first_name"
                                                    className="-ml-[5rem]  block mb-2 text-sm font-semibold text-cyan-900 dark:text-cyan"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleInputChange}
                                                    className="-ml-[5rem] w-48 border border-gray-300 text-cyan-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 outline-none items-center mb-4 rounded-lg mx-auto"
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
                                                    className=" mr-20 w-48 border border-gray-300 text-cyan-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 outline-none items-center mb-4 rounded-lg mx-auto"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                    <label
                                        htmlFor="message"
                                        className="-ml-[5rem] block mb-2 text-sm font-semibold text-cyan-900 dark:text-cyan"
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
                                        className=" -ml-[5rem] border border-gray-300 text-cyan-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 outline-none items-center mb-4 rounded-lg"
                                        placeholder="Bio"
                                    ></textarea>
                                </div>
                                        
                                        <div className="flex justify-end mx-auto ">
                                            <button
                                                type="button"
                                                onClick={() => navigate('/profile')}
                                                className="py-2.5 px-5 text-base font-medium transition duration-150 ease-in-out bg-red-500 rounded-lg border border-red-500 text-white"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleFormSubmit}
                                                className="ml-5 py-2.5 px-5 text-base font-medium transition duration-150 ease-in-out bg-cyan-500 rounded-lg border border-cyan-500 text-white"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            </div>
        </div>
    );
};

export default EditProfile;