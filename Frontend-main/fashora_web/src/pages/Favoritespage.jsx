

// import React from 'react';
// import { useFavorites, useToggleFavorite } from '../hooks/usefavorite';
// import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';

// export default function FavoritesPage() {
//   const { data: favorites = [], isLoading, error } = useFavorites();
//   const { mutate: toggleFavorite } = useToggleFavorite();

//   if (isLoading) return <p className="text-center py-10">Loading favorites...</p>;
//   if (error) return <p className="text-center text-red-500 py-10">Failed to load favorites.</p>;
//   if (favorites.length === 0) return <p className="text-center py-10">No favorites added yet.</p>;

//   return (
//      <div className="max-w-7xl mx-auto px-4 py-10">
//     <h2 className="text-2xl font-bold capitalize text-gray-900 flex items-center justify-center mb-1 mt-[-8px] font-handwriting">
//     Your Favorites
//     </h2>


// <p className="text-sm text-gray-500 text-center">
//   Browse all the products you’ve added to your favorites.
// </p>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
//   {favorites.map((product) => (
//     <div
//       key={product._id}
//       className="border rounded-lg shadow hover:shadow-md transition bg-white relative flex flex-col"
//     >
//       {/* Favorite Icon */}
//       <button
//         onClick={() => toggleFavorite(product._id)}
//         className="absolute top-2 right-2 text-red-500 text-base p-1"
//         aria-label="Toggle Favorite"
//       >
//         <FaHeart className="w-4 h-4" />
//       </button>

//       <img
//         src={`http://localhost:5006/uploads/${product.image}`}
//         alt={product.name}
//         className="w-full h-48 object-cover rounded-t-lg"
//       />

//       <div className="p-3 flex-1 flex flex-col justify-between">
//         <div>
//           <h3 className="font-semibold text-gray-800">{product.name}</h3>
//           <p className="text-sm text-gray-600 mb-1">Price: Rs. {product.price}</p>
//           {product.description && (
//             <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
//           )}
//         </div>

//         {/* Add to Cart Button */}
//         <button
//           onClick={() => console.log('Add to cart:', product._id)}
//           className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200"
//         >
//           <FaShoppingCart className="text-white" />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   ))}
// </div>

//     </div>
//   );
// }


import React from 'react';
import { useFavorites, useToggleFavorite } from '../hooks/usefavorite';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/cartcontext';
import { Toaster, toast } from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom';

export default function FavoritesPage() {
  const { data: favorites = [], isLoading, error } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center py-10">Loading favorites...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load favorites.</p>;
  if (favorites.length === 0) return <p className="text-center py-10">No favorites added yet.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold capitalize text-gray-900 flex items-center justify-center mb-1 mt-[-8px] font-handwriting">
        My Wishlist
      </h2>
      <p className="text-sm text-gray-500 text-center">
        Browse all the products you’ve added to your favorites.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {favorites.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow hover:shadow-md transition bg-white relative flex flex-col"
          >
            {/* Favorite Icon */}
            <button
              onClick={() => toggleFavorite(product._id)}
              className="absolute top-2 right-2 text-red-500 text-base p-1"
              aria-label="Toggle Favorite"
            >
              <FaHeart className="w-4 h-4" />
            </button>

            <img
              src={`http://localhost:5006/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-1">Price: Rs. {product.price}</p>
                {product.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.name} added to cart!`, { duration: 2000 });
                  // no navigation here — just show toast
                }}
                className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200"
              >
                <FaShoppingCart className="text-white" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
