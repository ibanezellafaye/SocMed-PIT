// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { HiFingerPrint, HiCog, HiChat, HiUserGroup, HiDocumentText, HiLogout } from "react-icons/hi";
// import { useTheme } from './App'; 
// import { useUser } from './UserContext'; // Import the UserContext

// const Sidebar = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const { user } = useUser(); // Use the user context
//   const { theme } = useTheme(); 

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className={`fixed w-72 p-6 flex flex-col justify-between h-full shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//       <h1 className="text-3xl font-bold text-center">Space Rants</h1>
//       <div className="flex flex-col items-center">
//         {user.profile_image_url ? (
//           <img
//             src={user.profile_image_url}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover mb-6"
//           />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 mb-3 border-4 border-gray-500">
//             No Image
//           </div>
//         )}
//         <p className={`text-center text-xl  mb-5 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}><strong>{user.first_name} {user.last_name}</strong></p>
//       </div>
//       <nav>
//         <ul className="space-y-4">
//           <li className='flex-1'>
//             <NavLink 
//               to="/dashboard" 
//               className={({ isActive }) => 
//                 isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : " text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
//               }
//             >
//               <HiFingerPrint className='mt-1 mr-2'/>
//               Dashboard
//             </NavLink>
//           </li>
//           <li className='flex-1'>
//             <NavLink 
//               to="/messages" 
//               className={({ isActive }) => 
//                 isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : "text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
//               }
//             >
//               <HiChat className='mt-1 mr-2'/>
//               Messages
//             </NavLink>
//           </li>
//           <li className='flex-1'>
//             <NavLink 
//               to="/following" 
//               className={({ isActive }) => 
//                 isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : "text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
//               }
//             >
//               <HiUserGroup className='mt-1 mr-2' />
//               Friends
//             </NavLink>
//           </li>
//           <li className='flex-1'>
//             <NavLink 
//               to="/user-posts" 
//               className={({ isActive }) => 
//                 isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : "text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
//               }
//             >
//               <HiDocumentText className='mt-1 mr-2' />
//               Profile
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//       <div className="mt-20">
//         <div>
//           <nav>
//             <ul className="space-y-4">
//               <li className='flex-1'>
//                 <NavLink 
//                   to="/settings" 
//                   className={({ isActive }) => 
//                     isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : "text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
//                   }
//                 >
//                   <HiCog className='mt-1 mr-2' />
//                   Settings
//                 </NavLink>
//               </li>
//               <li className='flex-1'>
//                 <NavLink
//                   onClick={handleLogout}
//                   className="text-white flex items-center py-2 px-4 bg-red-500 hover:bg-red-700 rounded-md transition duration-200 "
//                 >
//                   <HiLogout className='mt-1 mr-2' />
//                   Logout
//                 </NavLink>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiFingerPrint, HiCog, HiChat, HiUserGroup, HiDocumentText, HiLogout } from "react-icons/hi";
import { useTheme } from './App'; 
import { useUser } from './UserContext'; // Import the UserContext

const Sidebar = ({ onLogout, isOpen }) => {
  const navigate = useNavigate();
  const { user } = useUser(); // Use the user context
  const { theme } = useTheme(); 

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`fixed z-10 top-0 left-0 h-full w-72 p-6 flex flex-col justify-between shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h1 className="text-3xl font-bold text-center">Space Rants</h1>
      <div className="flex flex-col items-center">
        {user.profile_image_url ? (
          <img
            src={user.profile_image_url}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-6"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 mb-3 border-4 border-gray-500">
            No Image
          </div>
        )}
        <p className={`text-center text-xl mb-5 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}><strong>{user.first_name} {user.last_name}</strong></p>
      </div>
      <nav>
        <ul className="space-y-4">
          <li className='flex-1'>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : "text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
              }
            >
              <HiFingerPrint className='mt-1 mr-2'/>
              Dashboard
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink 
              to="/messages" 
              className={({ isActive }) => 
                isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : "text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
              }
            >
              <HiChat className='mt-1 mr-2'/>
              Messages
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink 
              to="/following" 
              className={({ isActive }) => 
                isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : "text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
              }
            >
              <HiUserGroup className='mt-1 mr-2' />
              Friends
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink 
              to="/user-posts" 
              className={({ isActive }) => 
                isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : "text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
              }
            >
              <HiDocumentText className='mt-1 mr-2' />
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-20">
        <div>
          <nav>
            <ul className="space-y-4">
              <li className='flex-1'>
                <NavLink 
                  to="/settings" 
                  className={({ isActive }) => 
                    isActive ? "text-white flex items-center py-2 px-4 bg-indigo-700 rounded-md transition duration-200" : "text-white flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md transition duration-200"
                  }
                >
                  <HiCog className='mt-1 mr-2' />
                  Settings
                </NavLink>
              </li>
              <li className='flex-1'>
                <NavLink
                  onClick={handleLogout}
                  className="text-white flex items-center py-2 px-4 bg-red-500 hover:bg-red-700 rounded-md transition duration-200 "
                >
                  <HiLogout className='mt-1 mr-2' />
                  Logout
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

