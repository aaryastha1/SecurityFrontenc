



import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaTrash,
} from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../context/cartcontext';
import axios from '../api/api'; // your axios instance
import { getBackendImageUrl } from '../utilis/backendImage'; // helper for image URLs

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [liveResults, setLiveResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, removeFromCart } = useCart();

  const cartRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (location.state?.fromLogin) {
      toast.success('Logged in successfully');
      navigate(location.pathname, { replace: true, state: {} });
    }

    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setLiveResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location, navigate]);

  // Live search effect with debounce
  useEffect(() => {
    if (!showSearch || !searchTerm.trim()) {
      setLiveResults([]);
      setIsSearching(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setIsSearching(true);
        const response = await axios.get(
          `/api/user/products/search?q=${encodeURIComponent(searchTerm)}`
        );
        setLiveResults(response.data.products || []);
        setIsSearching(false);
      } catch (err) {
        console.error('Live search error:', err);
        setIsSearching(false);
        setLiveResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, showSearch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  const categories = [
    'Home',
    'Tops',
    'Dresses',
    'Shirts',
    'Pants',
    'Knitwear',
    'Offers',
  ];

  // Navigate to search page on Enter or button click
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
      setSearchTerm('');
      setLiveResults([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
      setSearchTerm('');
      setLiveResults([]);
    }
  };

  // Navigate on clicking live result
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSearch(false);
    setSearchTerm('');
    setLiveResults([]);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
      <ToastContainer position="top-center" />
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 relative">
        {/* Logo */}
        <div className="flex items-center mr-4" style={{ marginLeft: '-20px' }}>
          <img
            src="/fashoraa.png"
            alt="Fashora Logo"
            className="h-15 w-24 mt-1"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex items-center justify-center gap-7">
          {categories.map((label) => (
            <NavLink
              key={label}
              to={label === 'Home' ? '/' : `/category/${label}`}
              className={({ isActive }) =>
                `text-sm font-medium uppercase tracking-wide px-1 hover:text-[#744f28] transition-colors ${
                  isActive ? 'text-[#744f28]' : 'text-gray-900'
                }`
              }
            >
              {label.toUpperCase()}
            </NavLink>
          ))}
        </nav>

        {/* Icons + Auth Buttons */}
        <div className="flex items-center gap-4 ml-8 text-gray-700" ref={searchRef}>
          {/* Search input and button */}
          <div className="flex items-center relative">
            {showSearch && (
              <div className="relative mr-4 w-64">
                {/* Search Icon inside input */}
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-sm" />
                </div>

                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-9 pr-10 py-2 rounded-full bg-white text-gray-900 placeholder-gray-500 text-sm focus:outline-none border border-gray-300 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  autoFocus
                />

                {/* Search submit button */}
                <button
                  onClick={handleSearchSubmit}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900"
                  aria-label="Submit Search"
                  type="button"
                >
                  <FaSearch />
                </button>

                {/* Live Search Results Dropdown */}
                {(liveResults.length > 0 || isSearching) && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow max-h-64 overflow-y-auto z-50 mt-1">
                    {isSearching ? (
                      <p className="p-3 text-gray-600 text-sm">Searching...</p>
                    ) : (
                      liveResults.map((product) => (
                        <div
                          key={product._id}
                          onClick={() => handleProductClick(product._id)}
                          className="flex items-center cursor-pointer hover:bg-gray-100 px-3 py-2"
                        >
                          <img
                            src={getBackendImageUrl(product.image)}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">Rs. {product.price}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Toggle search input button */}
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Toggle Search"
            >
              <FaSearch className="h-5 w-5 text-gray-900" />
            </button>
          </div>

          {/* Favorites button */}
          <button
            onClick={() => navigate('/favorites')}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Favorites"
          >
            <FaHeart className="h-5 w-5 text-gray-900" />
          </button>

          {/* Cart button & dropdown, only if logged in */}
          {isLoggedIn && (
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setShowCart((prev) => !prev)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
                aria-label="Cart"
              >
                <FaShoppingCart className="h-5 w-5 text-gray-900" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              {showCart && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded shadow-lg z-50 p-4">
                  <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500">Cart is empty.</p>
                  ) : (
                    <ul className="max-h-64 overflow-y-auto">
                      {cartItems.map((item) => (
                        <li
                          key={item._id}
                          className="flex items-center justify-between mb-3"
                        >
                          <img
                            src={getBackendImageUrl(item.image)}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 ml-3">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-600">
                              Rs. {item.price} x {item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-600 hover:text-red-800 text-sm sm:ml-4"
                            title={`Remove ${item.name} from cart`}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <FaTrash />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {cartItems.length > 0 && (
                    <button
                      onClick={() => {
                        navigate('/cart');
                        setShowCart(false);
                      }}
                      className="mt-auto w-full bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200"
                    >
                      Go to Cart
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Profile icon with navigation */}
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Profile"
          >
            <FaUserCircle className="h-5 w-5 text-gray-900" />
          </button>

          {/* Login/logout buttons */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-1.5 text-sm bg-gray-100 text-gray-900 rounded hover:bg-[#744f28] hover:text-white border border-gray-200 hover:border-[#744f28] transition font-medium"
            >
              LOGOUT
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="ml-2 px-4 py-1.5 text-sm bg-gray-100 text-gray-900 rounded hover:bg-[#744f28] hover:text-white border border-gray-200 hover:border-[#744f28] transition font-medium"
              >
                SIGNIN
              </NavLink>
              <NavLink
                to="/register"
                className="ml-2 px-4 py-1.5 text-sm bg-gray-100 text-gray-900 rounded hover:bg-[#744f28] hover:text-white border border-gray-200 hover:border-[#744f28] transition font-medium"
              >
                SIGNUP
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}







