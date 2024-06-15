// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     address: '',
//     birthdate: '',
//     gender: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');

//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       setFormData(parsedUser);
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handledashboard = () => {
//     navigate('/dashboard');
//   };

//   const handleEditToggle = () => {
//     setEditing(!editing);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:8000/api/users/${user.id}`, formData, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       });

//       if (response.status === 200) {
//         const updatedUser = response.data;
//         setUser(updatedUser);
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//         setEditing(false);
//       }
//     } catch (error) {
//       console.error('Error updating user information:', error);
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Profile</h1>
//       <h2>User Information</h2>
//       {editing ? (
//         <form onSubmit={handleFormSubmit}>
//           <div>
//             <label>First Name:</label>
//             <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label>Last Name:</label>
//             <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label>Address:</label>
//             <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label>Birth Date:</label>
//             <input type="date" name="birthdate" value={formData.birthdate} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label>Gender:</label>
//             <select name="gender" value={formData.gender} onChange={handleInputChange}>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <button type="submit">Save</button>
//           <button type="button" onClick={handleEditToggle}>Cancel</button>
//         </form>
//       ) : (
//         <div>
//           <p><strong>First Name:</strong> {user.first_name}</p>
//           <p><strong>Last Name:</strong> {user.last_name}</p>
//           <p><strong>Address:</strong> {user.address}</p>
//           <p><strong>Birth Date:</strong> {user.birthdate}</p>
//           <p><strong>Gender:</strong> {user.gender}</p>
//           <button onClick={handleEditToggle}>Edit</button>
//         </div>
//       )}
//       <div>
//         <button onClick={handledashboard}>GoToDashboard</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     address: '',
//     birthdate: '',
//     gender: '',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');

//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       setFormData(parsedUser);
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handledashboard = () => {
//     navigate('/dashboard');
//   };

//   const handleEditToggle = () => {
//     setEditing(!editing);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:8000/api/users/${user.id}`, formData, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       });

//       if (response.status === 200) {
//         const updatedUser = response.data;
//         setUser(updatedUser);
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//         setEditing(false);
//       }
//     } catch (error) {
//       console.error('Error updating user information:', error);
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//         setError(error.response.data.message || 'An error occurred');
//       }
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-lg p-8 border border-gray-700 rounded">
//         <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
//         <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">User Information</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         {editing ? (
//           <form onSubmit={handleFormSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-400">First Name:</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-400">Last Name:</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-400">Address:</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-400">Birth Date:</label>
//               <input
//                 type="date"
//                 name="birthdate"
//                 value={formData.birthdate}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-400">Gender:</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="space-x-4">
//               <button type="submit" className="bg-blue-500 px-4 py-2 rounded">Save</button>
//               <button type="button" onClick={handleEditToggle} className="bg-gray-500 px-4 py-2 rounded">Cancel</button>
//             </div>
//           </form>
//         ) : (
//           <div className="space-y-4 border border-gray-700 p-4 rounded">
//             <p><strong>First Name:</strong> {user.first_name}</p>
//             <p><strong>Last Name:</strong> {user.last_name}</p>
//             <p><strong>Address:</strong> {user.address}</p>
//             <p><strong>Birth Date:</strong> {user.birthdate}</p>
//             <p><strong>Gender:</strong> {user.gender}</p>
//             <button onClick={handleEditToggle} className="bg-yellow-500 px-4 py-2 rounded">Edit</button>
//           </div>
//         )}
//         <div className="mt-6 text-center">
//           <button onClick={handledashboard} className="bg-gray-700 px-4 py-2 rounded">GoToDashboard</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    birthdate: '',
    gender: '',
    profile_picture: null,
  });
  const [error, setError] = useState('');
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

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('birthdate', formData.birthdate);
    formDataToSend.append('gender', formData.gender);
    if (formData.profile_picture) {
      formDataToSend.append('profile_picture', formData.profile_picture);
    }
    try {
      const response = await axios.post(`http://localhost:8000/api/users/${user.id}/upload-profile-picture`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        setError(error.response.data.message || 'An error occurred');
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-8 border border-gray-700 rounded">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">User Information</h2>
        {error && <p className="text-red-500">{error}</p>}
        {editing ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            <div>
              <label className="block text-gray-400">Profile Picture:</label>
              <input
                type="file"
                name="profile_picture"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
              />
            </div>
            <div className="space-x-4">
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded">Save</button>
              <button type="button" onClick={handleEditToggle} className="bg-gray-500 px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 border border-gray-700 p-4 rounded">
            <div className="flex justify-center mb-4">
              {user.profile_picture ? (
                <img src={`http://localhost:8000/storage/${user.profile_picture}`} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <div className='flex justify-center'>
              <button onClick={handleEditToggle} className="bg-yellow-500 px-4 py-2 rounded just">Change Profile Picture</button>
            </div>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Birth Date:</strong> {user.birthdate}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
          </div>
        )}
        <div className="mt-6 text-center">
          <button onClick={handledashboard} className="bg-gray-700 px-4 py-2 rounded">GoToDashboard</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
