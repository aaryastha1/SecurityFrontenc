import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../auth/authProvider';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f5ede6] to-[#ede0d3]">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <img src="/fashoraa.png" alt="Fashora Logo" className="w-24 h-24 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-[#744f28]">You have been logged out</h2>
        <p className="text-gray-600 mb-4">Thank you for visiting Fashora! Redirecting to login...</p>
        <div className="loader mx-auto my-4"></div>
      </div>
      <style>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #744f28;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          animation: spin 1s linear infinite;
        }
        // @keyframes spin {
        //   0% { transform: rotate(0deg); }
        //   100% { transform: rotate(360deg); }
        // }
      `}</style>
    </div>
  );
} 