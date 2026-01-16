// import React, { useEffect, useState } from 'react';
// import axios from '../../api/api'; // Update with your actual axios instance
// import { FaBoxOpen } from 'react-icons/fa';

// export default function AdminOrderPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get('/api/orders');
//         setOrders(res.data);
//       } catch (error) {
//         console.error('Failed to fetch orders', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <p className="p-4">Loading orders...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//         <FaBoxOpen /> User Orders
//       </h2>

//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <table className="w-full text-left bg-white rounded shadow-md">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="p-2">Name</th>
//               <th className="p-2">Address</th>
//               <th className="p-2">Phone</th>
//               <th className="p-2">Payment</th>
//               <th className="p-2">Items</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id} className="border-b hover:bg-gray-100">
//                 <td className="p-2">{order.fullName}</td>
//                 <td className="p-2">{order.address}</td>
//                 <td className="p-2">{order.phone}</td>
//                 <td className="p-2">{order.paymentMethod}</td>
//                 <td className="p-2">
//                   <ul className="list-disc ml-4">
//                   {order.items.map((item, index) => (
//   <li key={index} className="flex items-center gap-2">
//     <img
//       src={`http://localhost:5006/uploads/${item.productId?.image}`}
//       alt={item.productId?.name}
//       className="w-8 h-8 object-cover rounded"
//     />
//     {item.productId?.name} x {item.quantity}
//   </li>
// ))}

//                   </ul>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from '../../api/api'; // Adjust path as needed
import { FaBoxOpen, FaCheckCircle, FaClock } from 'react-icons/fa';
import { MdLocationOn, MdPhone } from 'react-icons/md';

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/orders');
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          throw new Error('Orders data is not an array');
        }
      } catch (err) {
        console.error('Failed to fetch orders', err);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaBoxOpen /> User Orders
      </h2>

      <p className="text-gray-500 mb-4">Manage and track customer orders</p>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Contact Info</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total (NPR)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center uppercase font-semibold">
                      {order.fullName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      {order.fullName}
                      <div className="text-xs text-gray-500">{order.createdAt?.slice(0, 10)}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1 text-sm">
                    <MdLocationOn className="text-gray-500" />
                    <span>{order.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    <MdPhone className="text-gray-500" />
                    <span>{order.phone}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      order.paymentMethod === 'PAID'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      order.status === 'Delivered'
                        ? 'text-green-600'
                        : 'text-blue-600'
                    }`}
                  >
                    {order.status === 'Delivered' ? <FaCheckCircle /> : <FaClock />}
                    {order.status || 'Processing'}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {item.productId?.image && (
                          <img
                            src={`http://localhost:5006/uploads/${item.productId.image}`}
                            alt={item.productId?.name || 'Product'}
                            className="w-8 h-8 object-cover rounded"
                          />
                        )}
                        <span className="text-sm text-gray-700">
                          {item.productId?.name || 'Product'} x {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-3 font-semibold text-gray-800">
                  NPR{' '}
                  {order.items.reduce((sum, item) => {
                    const price = item.productId?.price || 0;
                    return sum + price * item.quantity;
                  }, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
