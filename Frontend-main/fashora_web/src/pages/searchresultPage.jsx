



// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from '../api/api'; // your axios instance

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const IMAGE_BASE_URL = 'http://localhost:5006/uploads/';

// export default function SearchResultsPage() {
//   const query = useQuery();
//   const searchTerm = query.get('q') || '';
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!searchTerm) return;

//     setLoading(true);
//     setError(null);

//     axios
//       .get(`/user/products/search?q=${encodeURIComponent(searchTerm)}`)  // <-- here
//       .then((res) => {
//         if (res.data.success && Array.isArray(res.data.products)) {
//           setProducts(res.data.products);
//         } else {
//           setProducts([]);
//           setError('No products found.');
//         }
//       })
//       .catch(() => {
//         setError('Failed to fetch products.');
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [searchTerm]);

//   if (!searchTerm) {
//     return <div className="p-6 text-center">Please enter a search term.</div>;
//   }

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-gray-600">
//         <svg
//           className="animate-spin h-6 w-6 mx-auto mb-2 text-gray-500"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8v8H4z"
//           ></path>
//         </svg>
//         Loading products...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-lg font-bold mb-6 text-center">
//         Search Results for: <span className="text-[#744f28]">{searchTerm}</span>
//       </h2>

//       {products.length === 0 ? (
//         <p className="text-center text-gray-600">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="border rounded shadow hover:shadow-lg cursor-pointer overflow-hidden"
//               onClick={() => navigate(`/product/${product._id}`)}
//               title={product.name}
//             >
//               <img
//                 src={`${IMAGE_BASE_URL}${product.image}`}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//                 loading="lazy"
//               />
//               <div className="p-3">
//                 <h3 className="text-sm font-medium truncate">{product.name}</h3>
//                 <p className="text-sm text-gray-600">Rs. {product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/api';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/cartcontext'; // ✅ Import cart context

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const IMAGE_BASE_URL = 'http://localhost:5006/uploads/';

export default function SearchResultsPage() {
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { addToCart } = useCart(); // ✅ Get addToCart from context

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    axios
      .get(`/user/products/search?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          setProducts([]);
          setError('No products found.');
        }
      })
      .catch(() => {
        setError('Failed to fetch products.');
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  const handleAddToCart = (product) => {
    addToCart(product); // ✅ Actually add the product to cart
  };

  if (!searchTerm) {
    return <div className="p-6 text-center">Please enter a search term.</div>;
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        <svg
          className="animate-spin h-8 w-8 mx-auto mb-3 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-10 text-center">
        Search Results for:{' '}
        <span className="text-[#744f28]">{searchTerm}</span>
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer overflow-hidden flex flex-col"
              title={product.name}
            >
              <img
                src={`${IMAGE_BASE_URL}${product.image}`}
                alt={product.name}
                className="w-full h-56 object-cover"
                loading="lazy"
                onClick={() => navigate(`/product/${product._id}`)}
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-medium text-gray-900 truncate mb-3">
                  {product.name}
                </h3>
                <p className="text-base text-gray-700 mb-5">Rs. {product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  type="button"
                  className="mt-auto w-full bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200"
                >
                  <FaShoppingCart className="text-white" size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
