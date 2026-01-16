



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/cartcontext';
// import axios from 'axios';

// export default function CheckoutPage() {
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     fullName: '',
//     address: '',
//     phone: '',
//   });

//   const [paymentMethod, setPaymentMethod] = useState('cod');

//   const shippingCost = 150;
//   const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   const total = subtotal + shippingCost;

//   const handleInputChange = (e) => {
//     setAddress({
//       ...address,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handlePlaceOrder = async () => {
//     if (!address.fullName || !address.address || !address.phone) {
//       alert('Please fill in all fields');
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert('Your cart is empty');
//       return;
//     }

//     // Filter out cart items missing _id just in case
//     const validItems = cartItems.filter(item => item._id);

//     if (validItems.length === 0) {
//       alert('No valid products in cart to place order.');
//       return;
//     }

//     const items = validItems.map((item) => ({
//       productId: item._id,
//       quantity: item.quantity,
//     }));

//     try {
//       await axios.post('http://localhost:5006/api/orders/place', {
//         fullName: address.fullName,
//         address: address.address,
//         phone: address.phone,
//         paymentMethod,
//         items,
//       });

//       navigate('/order-success');
//     } catch (error) {
//       console.error('Failed to place order', error?.response?.data || error.message);
//       alert('Failed to place order. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen bg-gradient-to-b from-white to-gray-100">
//       <h1 className="text-4xl font-bold text-center mb-10 text-[#333]">Checkout</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Shipping Details */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Details</h2>
//           <form className="space-y-4">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={address.fullName}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a66b]"
//             />
//             <textarea
//               name="address"
//               placeholder="Address"
//               value={address.address}
//               onChange={handleInputChange}
//               rows={3}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a66b]"
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={address.phone}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a66b]"
//             />
//           </form>
//         </div>

//         {/* Payment + Order Summary */}
//         <div className="flex flex-col gap-6">
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Method</h2>
//             <div className="space-y-3">
//               <label className="flex items-center gap-3">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="cod"
//                   checked={paymentMethod === 'cod'}
//                   onChange={() => setPaymentMethod('cod')}
//                 />
//                 <span className="text-gray-600">Cash on Delivery</span>
//               </label>
//               <label className="flex items-center gap-3 text-gray-400">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="online"
//                   checked={paymentMethod === 'online'}
//                   onChange={() => setPaymentMethod('online')}
//                   disabled
//                 />
//                 <span>Online Payment (Coming soon)</span>
//               </label>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
//             <div className="space-y-2 text-gray-600">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>Rs. {subtotal}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>Rs. {shippingCost}</span>
//               </div>
//               <hr className="my-2" />
//               <div className="flex justify-between font-bold text-lg text-gray-800">
//                 <span>Total</span>
//                 <span>Rs. {total}</span>
//               </div>
//             </div>

//             <button
//               onClick={handlePlaceOrder}
//               className="mt-6 w-full py-3 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white rounded-lg text-lg font-semibold transition-all"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartcontext';
import axios from 'axios';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();  // <-- Added clearCart here
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    address: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const shippingCost = 150;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!address.fullName || !address.address || !address.phone) {
      alert('Please fill in all fields');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const validItems = cartItems.filter(item => item._id);

    if (validItems.length === 0) {
      alert('No valid products in cart to place order.');
      return;
    }

    const items = validItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    try {
      await axios.post('http://localhost:5006/api/orders/place', {
        fullName: address.fullName,
        address: address.address,
        phone: address.phone,
        paymentMethod,
        items,
      });

      clearCart();  // <-- Clear cart after successful order

      navigate('/order-success');
    } catch (error) {
      console.error('Failed to place order', error?.response?.data || error.message);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen bg-gradient-to-b from-white to-gray-100">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#333]">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Details */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Details</h2>
          <form className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={address.fullName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a66b]"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={address.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a66b]"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a66b]"
            />
          </form>
        </div>

        {/* Payment + Order Summary */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <span className="text-gray-600">Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 text-gray-400">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  disabled
                />
                <span>Online Payment (Coming soon)</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. {shippingCost}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full py-3 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white rounded-lg text-lg font-semibold transition-all"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

