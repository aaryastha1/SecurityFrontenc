


// // Sidebar.jsx


// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import {
//   FaBox,
//   FaList,
//   FaTachometerAlt,
//   FaSignOutAlt
// } from 'react-icons/fa';

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear auth logic if needed
//     localStorage.removeItem('token'); // Example
//     navigate('/login');
//   };

//   const navItems = [
//     { name: 'Products', icon: <FaBox />, path: '/admins/product' },
//     { name: 'Categories', icon: <FaList />, path: '/admins/categoryy' },
//     { name: 'User', icon: <FaTachometerAlt />, path: '/admins/userss' },
//   ];

//   return (
//     <div className="w-64 min-h-screen bg-[#10172A] text-white p-5 flex flex-col justify-between">
//       <div>
//         <div>
//           <h1 className="text-2xl font-bold text-[#D946EF] mb-1">Fashora Admin</h1>
//           <p className="text-sm text-gray-400 mb-6">Fashion Management</p>
//         </div>

//         <ul className="space-y-2">
//           {navItems.map(({ name, icon, path }) => (
//             <li key={name}>
//               <NavLink
//                 to={path}
//                 className={({ isActive }) =>
//                   `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-white ${
//                     isActive ? 'bg-[#A855F7]' : 'hover:bg-[#1F2937]'
//                   }`
//                 }
//               >
//                 <span className="text-lg">{icon}</span>
//                 <span>{name}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <button
//           onClick={handleLogout}
//           className="flex items-center w-full space-x-3 px-3 py-2 mt-6 rounded-lg text-sm font-medium text-white hover:bg-[#1F2937]"
//         >
//           <FaSignOutAlt className="text-lg" />
//           <span>Logout</span>
//         </button>

//         <div className="mt-6 bg-[#1F2937] p-4 rounded flex items-center space-x-3">
//           <div className="bg-[#D946EF] rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">FA</div>
//           <div>
//             <p className="font-semibold">Fashora Admin</p>
//             <p className="text-xs text-gray-400">Super Administrator</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaBox,
  FaList,
  FaTachometerAlt,
  FaSignOutAlt,
  FaShoppingBag  // Added for orders icon
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Products', icon: <FaBox />, path: '/admins/product' },
    { name: 'Categories', icon: <FaList />, path: '/admins/categoryy' },
    { name: 'User', icon: <FaTachometerAlt />, path: '/admins/userss' },
    { name: 'Orders', icon: <FaShoppingBag />, path: '/admins/orders' }, // 👈 Added this
  ];

  return (
    <div className="w-64 min-h-screen bg-[#10172A] text-white p-5 flex flex-col justify-between">
      <div>
        <div>
          <h1 className="text-2xl font-bold text-[#D946EF] mb-1">Fashora Admin</h1>
          <p className="text-sm text-gray-400 mb-6">Fashion Management</p>
        </div>

        <ul className="space-y-2">
          {navItems.map(({ name, icon, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-white ${
                    isActive ? 'bg-[#A855F7]' : 'hover:bg-[#1F2937]'
                  }`
                }
              >
                <span className="text-lg">{icon}</span>
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full space-x-3 px-3 py-2 mt-6 rounded-lg text-sm font-medium text-white hover:bg-[#1F2937]"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>

        <div className="mt-6 bg-[#1F2937] p-4 rounded flex items-center space-x-3">
          <div className="bg-[#D946EF] rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">FA</div>
          <div>
            <p className="font-semibold">Fashora Admin</p>
            <p className="text-xs text-gray-400">Super Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
