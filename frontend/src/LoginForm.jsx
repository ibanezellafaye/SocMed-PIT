// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8000/api/login', { email, password });
//       console.log(response.data); // Handle the response as needed
//       const { token, user } = response.data;

//       // Save the token and user info in local storage
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('user', JSON.stringify(user));

//       navigate('/dashboard'); // Redirect to the dashboard route
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };

//   const navigateToRegister = () => {
//     navigate('/register');
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <button onClick={navigateToRegister}>Go to Register</button>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      const { token, user } = response.data;

      // Save the token and user info in local storage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      onLogin(); // Call the onLogin prop to update the isLoggedIn state in the App component
      navigate('/dashboard'); // Redirect to the dashboard route
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Helmet>
        <title>Login</title>
      </Helmet>

      {error && <p>{error}</p>}

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="py-10">
              <h2 className="text-cyan-500 text-2xl font-bold">Sign in to your account</h2>
            </div>

            <form onSubmit={handleLogin}>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-3xl">
                  <FaRegEnvelope className="text-gray-400 m-2" />

                  <input
                    className="bg-gray-100 outline-none text-sm w-full"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-3xl">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    className="bg-gray-100 outline-none text-sm w-full"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="border-2 border-cyan-500 text-cyan-500 rounded-2xl px-12 py-2 inline-block font-semibold hover:bg-cyan-500 hover:text-white mt-5">
                  Login
                </button>
              </div>
            </form>
          </div>

          <div className="w-2/5 bg-cyan-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">Don't have an account?</p>
              <button type="submit" onClick={navigateToRegister} className="mt-5 border-2 border-white bg-white text-cyan-500 rounded-2xl px-12 py-2 inline-block font-semibold hover:bg-slate-100 hover:text-cyan-500">Create Account</button>
          </div>
        </div>
      </main>
    </div>  
  );
};

export default Login;
