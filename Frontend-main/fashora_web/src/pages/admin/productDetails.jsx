// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../../api/api';
// import { getBackendImageUrl } from '../../utilis/backendImage';
// import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`/admin/product/${id}`);
//         setProduct(res.data.data);
//       } catch (err) {
//         setError(err?.response?.data?.message || 'Error fetching product');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`/admin/product/${id}`);
//         alert('Deleted successfully');
//         navigate('/admins/product');
//       } catch {
//         alert('Failed to delete the product.');
//       }
//     }
//   };

//   const handleEdit = () => navigate(`/admins/product/${id}/edit`);

//   if (loading) return <div className="p-6 text-center">Loading...</div>;
//   if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

//   return product ? (
//     <div className="min-h-screen flex justify-center items-center p-6 bg-indigo-50">
//       <div className="max-w-sm w-full bg-white rounded-xl shadow-md overflow-hidden p-5">
//         <img
//           src={getBackendImageUrl(product.image)}
//           alt={product.name}
//           className="w-full h-64 object-cover rounded-xl shadow-md border border-gray-200"
//         />
//         <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.name}</h2>

//         <div className="text-gray-600 text-sm space-y-1">
//           <p><span className="font-medium">Price:</span> Rs {product.price}</p>
//           {/* <p><span className="font-medium">Stock:</span> {product.stock}</p> */}
//           <p><span className="font-medium">Category:</span> {product.categoryId?.name || 'N/A'}</p>
//           {product.description && (
//             <p className="mt-2 text-gray-500 truncate" title={product.description}>
//               <span className="font-medium">Description:</span> {product.description}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between mt-5">
//           {/* <button
//             onClick={handleEdit}
//             className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm"
//           >
//             <FaEdit /> Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm"
//           >
//             <FaTrash /> Delete
//           </button> */}
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm"
//           >
//             <FaArrowLeft /> Back
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="p-6 text-center text-gray-600">Product not found.</div>
//   );
// }
// src/pages/admin/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/api';
import { getBackendImageUrl } from '../../utilis/backendImage';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/admin/product/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/admin/product/${id}`);
        alert('Deleted successfully');
        navigate('/admins/product');
      } catch {
        alert('Failed to delete the product.');
      }
    }
  };

  const handleEdit = () => navigate(`/admins/product/${id}/edit`);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return product ? (
    <div className="min-h-screen flex justify-center items-center p-6 bg-white">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Image + Details Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={getBackendImageUrl(product.image)}
            alt={product.name}
            className="w-full md:w-96 h-96 object-cover rounded-lg border border-gray-200 shadow"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
            <div className="space-y-3">
              <p className="text-gray-600">
                <span className="font-semibold">Price:</span> Rs {product.price}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Category:</span> {product.categoryId?.name || 'N/A'}
              </p>
              {product.description && (
                <p className="text-gray-600">
                  <span className="font-semibold">Description:</span> {product.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons at Bottom */}
        <div className="flex flex-wrap justify-start gap-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gradient-to-r from-[#7c4a2d] to-[#b3784d] hover:from-[#65381f] hover:to-[#9e6842] text-white rounded-lg text-sm font-medium transition"
          >
            <FaArrowLeft className="inline mr-1" /> Back
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-6 text-center text-gray-600">Product not found.</div>
  );
}