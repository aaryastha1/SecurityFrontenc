


// import React from 'react';
// import { useCart } from '../context/cartcontext';
// import { useNavigate } from 'react-router-dom';
// import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

// export default function CartPage() {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useCart();
//   const navigate = useNavigate();

//   const getTotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + 150; // Adding fixed shipping cost of Rs. 150

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
//         🛒 Your Shopping Cart
//       </h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center text-gray-600 text-lg">
//           <p className="mb-4">Your cart is empty.</p>
//           <button
//             onClick={() => navigate('/')}
//             className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="flex gap-6">
//           <div className="flex-1">
//             {cartItems.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center bg-white rounded-lg shadow p-4 mb-4"
//               >
//                 <img
//                   src={`http://localhost:5006/uploads/${item.image}`}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded-md border"
//                 />
//                 <div className="flex-1 ml-4">
//                   <p className="text-lg font-semibold text-gray-800">{item.name}</p>
//                   <p className="text-gray-600 text-sm">Rs. {item.price}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => decreaseQuantity(item._id)}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-1 w-8 h-8 flex items-center justify-center"
//                   >
//                     <FaMinus className="text-sm" />
//                   </button>
//                   <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
//                   <button
//                     onClick={() => increaseQuantity(item._id)}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-1 w-8 h-8 flex items-center justify-center"
//                   >
//                     <FaPlus className="text-sm" />
//                   </button>
//                   <button
//                     onClick={() => removeFromCart(item._id)}
//                     className="ml-4 text-red-600 hover:text-red-800"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//                 <div className="ml-4 text-lg font-semibold text-gray-800">
//                   Rs. {item.price * item.quantity}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="w-1/3 bg-white rounded-lg shadow p-4" style={{ width: '300px', height: '250px' }}>
//             <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>Rs. {getTotal() - 150}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>Rs. 150</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg mt-4">
//                 <span>Total</span>
//                 <span>Rs. {getTotal()}</span>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate('/checkout')}
//               className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-[#7c4a2d] to-[#b3784d] hover:from-[#65381f] hover:to-[#9e6842] text-white rounded-lg text-sm font-medium transition"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React from 'react';
import { useCart } from '../context/cartcontext';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const navigate = useNavigate();

  const shippingCost = 150;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🛒 My Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          <p className="mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow p-4 mb-4"
              >
                <img
                  src={`http://localhost:5006/uploads/${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div className="flex-1 sm:ml-4 mt-2 sm:mt-0 text-center sm:text-left">
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-600 text-sm">Rs. {item.price}</p>
                </div>
                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-1 w-8 h-8 flex items-center justify-center"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-1 w-8 h-8 flex items-center justify-center"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:ml-6 mt-4 sm:mt-0">
                  <div className="text-lg font-semibold text-gray-800 text-center sm:text-left">
                    Rs. {item.price * item.quantity}
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-800 text-sm sm:ml-4"
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full md:w-[300px] bg-white rounded-lg shadow p-5">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. {shippingCost}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-base mt-2">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
            </div>
       <button
        onClick={() => navigate('/checkout')}
        className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white rounded-lg text-sm font-medium transition"
      >
        Proceed to Checkout
      </button>


          </div>
        </div>
      )}
    </div>
  );
}
