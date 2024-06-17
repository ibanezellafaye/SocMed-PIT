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
        const registrationResponse = await axios.post('http://localhost:8000/api/register', formData);
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
                navigate('/dashboard');
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
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
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
