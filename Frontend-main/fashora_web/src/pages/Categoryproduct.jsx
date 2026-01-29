

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsByCategory } from '../hooks/useCategoryProduct';
import { useFavorites, useToggleFavorite } from '../hooks/usefavorite';
import { useCart } from '../context/cartcontext';
import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

export default function CategoryProductPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { products, isLoading, error, pageNumber, setPageNumber, pagination, canNextPage, canPreviousPage } =
    useProductsByCategory(categoryName);

  const { data: favorites = [] } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const isFavorite = (productId) => favorites?.some((fav) => fav._id === productId);

  const handlePrev = () => canPreviousPage && setPageNumber((prev) => prev - 1);
  const handleNext = () => canNextPage && setPageNumber((prev) => prev + 1);

  const handleAddToCart = async (product) => {
    await addToCart(product);
    toast.success(`${product.name} added to cart!`, { duration: 2000 });
    navigate('/cart'); // goes straight to cart page
  };

  if (isLoading) return <p className="text-center py-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load products.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold capitalize text-gray-900">{categoryName} Collection</h2>
        <p className="text-sm text-gray-500 mt-2">
          Discover our latest collection of stylish {categoryName.toLowerCase()}.
        </p>
      </div>

      {products?.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow hover:shadow-md transition bg-white relative flex flex-col"
            >
              <button
                onClick={() => toggleFavorite(product._id)}
                className="absolute top-2 right-2 text-red-500 text-base p-1"
              >
                {isFavorite(product._id) ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
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

                <div className="mt-4 flex flex-col gap-2">
                  {/* Add to Cart button with light purple → blue gradient */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-purple-300 to-blue-400 hover:from-purple-400 hover:to-blue-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <FaShoppingCart className="text-white" />
                    Add to Cart
                  </button>

                  {/* View Details button */}
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="w-full border border-blue-400 text-blue-400 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-400 hover:text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={!canPreviousPage}
          className={`px-4 py-2 rounded text-white text-sm ${canPreviousPage ? 'bg-[#222740]' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Back
        </button>

        <span className="text-[#222740] font-medium">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={!canNextPage}
          className={`px-4 py-2 rounded text-white text-sm ${canNextPage ? 'bg-[#222740]' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
