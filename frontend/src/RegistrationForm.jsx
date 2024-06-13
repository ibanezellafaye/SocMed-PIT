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
//     }
//   };

//   const navigateToLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h2>Registration</h2>
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
//       <div>
//       <button onClick={navigateToLogin}>Go to Login</button>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { MdOutlineAccountCircle} from 'react-icons/md';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BsGenderAmbiguous } from "react-icons/bs";

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Helmet>
        <title>Registration</title>
      </Helmet>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-400 max-w-screen-md">
          {/* Create Account*/}
          <div className="w-full p-5">
            <div className="py-7">
              <h2 className="text-cyan-500 text-2xl font-bold">Sign Up</h2>
            </div>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center ">
          <div className="bg-gray-100 w-80 p-2 flex items-center mb-4 rounded-3xl">
            <MdOutlineAccountCircle className="text-gray-400 m-2"/>
              <input className="bg-gray-100 outline-none text-sm w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
          </div>
        </div>
        
        <div className="flex flex-col items-center ">
          <div className="bg-gray-100 w-80 p-2 flex items-center mb-4 rounded-3xl">
            <MdLockOutline className="text-gray-400 m-2"/>
            <input className="bg-gray-100 outline-none text-sm w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div> 

        <div className="flex flex-col items-center ">
          <div className="bg-gray-100 w-80 p-2 flex items-center mb-4 rounded-3xl">
            <MdOutlineDriveFileRenameOutline className="text-gray-400 m-2"/>
            <input className="bg-gray-100 outline-none text-sm w-full"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
        </div>

        <div className="flex flex-col items-center ">
        <div className="bg-gray-100 w-80 p-2 flex items-center mb-4 rounded-3xl">
          <MdOutlineDriveFileRenameOutline className="text-gray-400 m-2"/>
            <input className="bg-gray-100 outline-none text-sm w-full"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
      </div>

      <div className="flex flex-col items-center ">
        <div className="bg-gray-100 w-80 p-2 flex items-center mb-4 rounded-3xl">
          <MdOutlineDriveFileRenameOutline className="text-gray-400 m-2"/>
            <input className="bg-gray-100 outline-none text-sm w-full"
            type="text"
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
      </div>

      <div className="flex flex-col items-center ">
        <div className="bg-gray-100 w-80 p-2 flex items-center justify-between mb-3 rounded-3xl">
            <LiaBirthdayCakeSolid className="text-gray-400 m-2"/>
            <input
              className={`bg-gray-100 outline-none text-sm text-left w-full ${birthdate ? 'text-black' : 'text-gray-400'}`}
              type="date"
              placeholder="Birth Date"
              value={birthdate}
              onChange={handleBirthdateChange}
            />
        </div>
      </div>  

      <div className="flex flex-col items-center">
        <div className="bg-gray-100 w-80 p-2 flex items-center mb-4 rounded-3xl">
          <BsGenderAmbiguous className="text-gray-400 m-2" />
          <select
            className={`bg-gray-100 outline-none text-sm w-full ${gender ? 'text-black' : 'text-gray-400'}`}
            value={gender}
            onChange={handleGenderChange}
        >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="border-2 border-cyan-500 text-cyan500 rounded-2xl px-12 py-2 inline-block font-semibold hover:bg-cyan-500 hover:text-white mt-4 mb-7"
      >
        Sign up
      </button>

      <div className="flex flex-col items-center">
        {/* <span className='text-green-400 bold'>{message}</span> */}

      <div className="flex flex-col items-center">
        <span> Already have an existing account? <button className="hover:text-cyan-500 hover:no-underline font-semibold	" onClick={navigateToLogin}>Login</button></span>
      </div>
    </div>

      </form>
      </div>
</div>
</main>
</div> 
  );
};

export default RegistrationForm;
