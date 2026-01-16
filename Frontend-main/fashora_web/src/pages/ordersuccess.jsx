import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6 px-4">
      <FaCheckCircle className="text-green-500 text-7xl mb-6 animate-pulse" aria-hidden="true" />
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Order Completed!</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link
        to="/"
        role="button"
        className="inline-block bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] text-white px-8 py-3 rounded-lg hover:from-[#b39151] hover:to-[#7a4f20] transition font-semibold shadow-lg"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
