// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const RegistrationForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [address, setAddress] = useState('');
//   const [birthdate, setBirthdate] = useState('');
//   const [gender, setGender] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleFirstNameChange = (e) => {
//     setFirstName(e.target.value);
//   };

//   const handleLastNameChange = (e) => {
//     setLastName(e.target.value);
//   };

//   const handleAddressChange = (e) => {
//     setAddress(e.target.value);
//   };

//   const handleBirthdateChange = (e) => {
//     setBirthdate(e.target.value);
//   };

//   const handleGenderChange = (e) => {
//     setGender(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       email,
//       password,
//       first_name: firstName,
//       last_name: lastName,
//       address,
//       birthdate,
//       gender,
//     };

//     try {
//       const registrationResponse = await axios.post('http://localhost:8000/api/users', formData);

//       if (registrationResponse.data) {
//         const loginData = {
//           email,
//           password,
//         };

//         const loginResponse = await axios.post('http://localhost:8000/api/login', loginData);

//         if (loginResponse.data) {
//           const { token, user } = loginResponse.data;

//           // Save the token and user info in local storage or context
//           localStorage.setItem('authToken', token);
//           localStorage.setItem('user', JSON.stringify(user));

//           // Redirect to the dashboard
//           navigate('/dashboard');
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Registration or login failed. Please try again.');
//     }
//   };

//   const navigateToLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h2>Registration</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={handleEmailChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//         <input
//           type="text"
//           placeholder="First Name"
//           value={firstName}
//           onChange={handleFirstNameChange}
//         />
//         <input
//           type="text"
//           placeholder="Last Name"
//           value={lastName}
//           onChange={handleLastNameChange}
//         />
//         <input
//           type="text"
//           placeholder="Address"
//           value={address}
//           onChange={handleAddressChange}
//         />
//         <input
//           type="date"
//           placeholder="Birth Date"
//           value={birthdate}
//           onChange={handleBirthdateChange}
//         />
//         <select
//           value={gender}
//           onChange={handleGenderChange}
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//         <button type="submit">Register</button>
//       </form>
//       <button onClick={navigateToLogin}>Go to Login</button>
//     </div>
//   );
// };

// export default RegistrationForm;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      address,
      birthdate,
      gender,
    };

    try {
      const registrationResponse = await axios.post('http://localhost:8000/api/users', formData);

      if (registrationResponse.data) {
        const loginData = {
          email,
          password,
        };

        const loginResponse = await axios.post('http://localhost:8000/api/login', loginData);

        if (loginResponse.data) {
          const { token, user } = loginResponse.data;

          // Save the token and user info in local storage or context
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          // Redirect to the dashboard
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error(error);
      setError('Registration or login failed. Please try again.');
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Registration</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Birth Date"
            value={birthdate}
            onChange={handleBirthdateChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={gender}
            onChange={handleGenderChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
          >
            Register
          </button>
        </form>
        <button
          onClick={navigateToLogin}
          className="w-full mt-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
