import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { useCart } from '../context/cartcontext';
import { toast } from 'react-toastify';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5006/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10 text-red-500">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <img
            src={`http://localhost:5006/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-bold text-amber-800">Rs. {product.price}</p>

          <button
            onClick={() => {
              const token = localStorage.getItem('token');
              if (!token) {
                toast.error('Please login to add to cart');
                return;
              }
              addToCart(product);
              document.dispatchEvent(new CustomEvent('open-cart'));
            }}
            className="bg-gradient-to-r from-amber-700 to-yellow-600 text-white px-5 py-2 rounded-md text-sm flex items-center gap-2 hover:scale-105 transition"
          >
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
