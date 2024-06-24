
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLock, AiOutlineHome, AiOutlineCalendar, AiOutlineMail } from 'react-icons/ai'; 
import HeaderLogo from './Logo 1.png';
import axiosInstance from './axiosConfig';
import { Helmet, HelmetProvider} from 'react-helmet-async';
import Swal from 'sweetalert2';


const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleBirthdateChange = (e) => setBirthdate(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);

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
      const registrationResponse = await axiosInstance.post('/register', formData);
      console.log('Registration response:', registrationResponse);

      if (registrationResponse.data) {
        const loginData = { email, password };
        const loginResponse = await axiosInstance.post('/login', loginData);
        console.log('Login response:', loginResponse);

        if (loginResponse.data) {
          const { token, user } = loginResponse.data;
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          console.log('Registration Successful!');
          Swal.fire('Success', 'Registration Successful!', 'success' );
          navigate('/login');
        } else {
          console.log('Login failed');
        }
      } else {
        Swal.fire('Error', 'Registration failed.', 'error');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error:', error);
        Swal.fire('Error', 'Registration or login failed. Please try again.', 'error');
      }
    }
  };

  const navigateToLogin = () => navigate('/login');

  return (
    <HelmetProvider>
      <Helmet>
      <title>Registration</title>
      <meta name="viewport" content="width=device-width, initial-scale=0.50, maximum-scale=1.0, user-scalable=yes" />
      </Helmet>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img 
          src={HeaderLogo} 
          alt='Logo'
          className="mx-auto h-14 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>

        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          Or
          <button
            type="button"
            className="ml-1 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            onClick={navigateToLogin}
          >
            login to your account
          </button>
        </p>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10">
            {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full px-4 py-2 text-base border-2 rounded-xl transition bg-white text-black focus:outline-none focus:border-indigo-600 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineMail className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
              </div>

              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 text-base border-2 rounded-xl transition bg-white text-black focus:outline-none focus:border-indigo-600 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineLock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
              </div>

              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="first-name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className="w-full px-4 py-2 text-base border-2 rounded-xl transition bg-white text-black focus:outline-none focus:border-indigo-600 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineUser className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name[0]}</p>}
              </div>

              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="last-name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    className="w-full px-4 py-2 text-base border-2 rounded-xl transition bg-white text-black focus:outline-none focus:border-indigo-600 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineUser className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name[0]}</p>}
              </div>

              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 text-base border-2 rounded-xl transition bg-white text-black focus:outline-none focus:border-indigo-600 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineHome className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>}
              </div>

              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="date"
                    id="birthdate"
                    placeholder="Birth Date"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    className="w-full px-4 py-2 text-base border-2 rounded-xl transition bg-white text-black focus:outline-none focus:border-indigo-600 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate[0]}</p>}
              </div>

              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    id="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    className="w-full px-4 py-2 text-base border-2 border-gray-300 rounded-xl transition bg-white text-black focus:outline-none focus:border-indigo-600 pl-10"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineUser className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender[0]}</p>}
              </div>

              <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-xl font-semibold text-base transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Create account
                </button>
              </span>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
    </HelmetProvider>
  );
};

export default RegistrationForm;
