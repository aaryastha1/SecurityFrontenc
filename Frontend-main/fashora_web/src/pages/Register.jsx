// src/pages/Register.jsx
import React, { useContext } from 'react';

import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../auth/authProvider';


export default function Register() {
  
  const { user } = useContext(AuthContext);



  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side Image */}
      <div className="w-1/2 hidden md:block">
        <img
          src="model.png"
          alt="Fashion Models"
          className="h-full w-full object-cover"
        />
        <>
      {/* your routes/components */}
      
    </>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-10 py-12 bg-white">
        

        <RegisterForm />
      </div>
    </div>
  );
}

