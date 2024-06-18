import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  MdLockOutline,
  MdAccountCircle,
  MdDriveFileRenameOutline,
} from 'react-icons/md';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { BsGenderAmbiguous } from 'react-icons/bs';

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
  const [isGenderSelected, setIsGenderSelected] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleBirthdateChange = (e) => setBirthdate(e.target.value);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setIsGenderSelected(e.target.value !== '');
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
      const registrationResponse = await axios.post('http://localhost:8000/api/users',formData);
      console.log('Registration response:', registrationResponse);

      if (registrationResponse.data) {
        const loginData = { email, password };
        const loginResponse = await axios.post('http://localhost:8000/api/login', loginData);
        console.log('Login response:', loginResponse);

        if (loginResponse.data) {
          const { token, user } = loginResponse.data;
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          console.log('Navigating to dashboard...');
          setError('Registration Successful!');
        } else {
          console.log('Login failed');
        }
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registration or login failed. Please try again.');
    }
  };

  const navigateToLogin = () => navigate('/login');

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-96 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-500">
          Sign Up
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-80 p-2 flex items-center rounded-3xl">
              <MdAccountCircle className="text-gray-400 m-2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-80 p-2 flex items-center rounded-3xl">
              <MdLockOutline className="text-gray-400 m-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
          </div>

          {/* First Name input */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-80 p-2 flex items-center rounded-3xl">
              <MdDriveFileRenameOutline className="text-gray-400 m-2" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
          </div>

          {/* Last Name input */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-80 p-2 flex items-center rounded-3xl">
              <MdDriveFileRenameOutline className="text-gray-400 m-2" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
          </div>

          {/* Address input */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-80 p-2 flex items-center rounded-3xl">
              <MdDriveFileRenameOutline className="text-gray-400 m-2" />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={handleAddressChange}
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
          </div>

          {/* Birthdate input */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-80 p-2 flex items-center rounded-3xl relative">
              <LiaBirthdayCakeSolid className="text-gray-400 m-2" />
              <input
                type="date"
                placeholder="Birth Date"
                value={birthdate}
                onChange={handleBirthdateChange}
                className="bg-gray-100 outline-none text-sm flex-1"
                style={{ color: birthdate ? 'black' : 'gray' }}
              />
            </div>
          </div>

          {/* Gender input */}
          <div className="flex flex-col items-center">
            <div className={`bg-gray-100 w-80 p-2 flex items-center rounded-3xl ${isGenderSelected ? 'text-black' : 'text-gray-400'}`}>
              <BsGenderAmbiguous className="text-gray-400 m-2" />
              <select
                value={gender}
                onChange={handleGenderChange}
                className="bg-gray-100 outline-none text-sm flex-1"
              >
                <option value="" className='text-black'>Select Gender</option>
                <option value="Male" className='text-black'>Male</option>
                <option value="Female" className='text-black'>Female</option>
                <option value="Other" className='text-black'>Other</option>
              </select>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="border-2 border-cyan-500 text-cyan-500 rounded-2xl px-10 py-2 font-semibold hover:bg-cyan-500 hover:text-white mt-3 mb-2"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center text-sm text-gray-700 dark:text-gray-400">
          <span>
            Already have an existing account?{' '}
            <button
              onClick={navigateToLogin}
              className="hover:text-cyan-500 hover:no-underline font-semibold p-1"
            >
              Login
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
