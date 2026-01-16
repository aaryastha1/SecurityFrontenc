
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   // Load cart from localStorage or start empty, filtering out invalid items
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const savedCart = localStorage.getItem('cartItems');
//       if (!savedCart) return [];
//       const parsed = JSON.parse(savedCart);
//       return Array.isArray(parsed) ? parsed.filter(item => item._id) : [];
//     } catch (error) {
//       console.error('Failed to load cart from localStorage:', error);
//       return [];
//     }
//   });

//   // Whenever cartItems changes, save to localStorage
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Add to cart only if product has _id
//   const addToCart = (product) => {
//     if (!product._id) {
//       console.error('Cannot add product without _id to cart:', product);
//       return; // ignore invalid product
//     }
//     setCartItems((prevItems) => {
//       const existing = prevItems.find((item) => item._id === product._id);
//       if (existing) {
//         return prevItems.map((item) =>
//           item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
//   };

//   const increaseQuantity = (productId) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (productId) => {
//     setCartItems((prevItems) =>
//       prevItems
//         .map((item) =>
//           item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   // NEW: Clear the cart (empty array)
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         clearCart,  // <-- added here
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);





import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Replace with your backend base URL
  const BASE_URL = 'http://localhost:5006/api/cart';

  // Get token from localStorage or your auth provider
  const token = localStorage.getItem('token');

  // Setup axios headers with auth token
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch cart from backend on mount
  useEffect(() => {
    if (!token) {
      setCartItems([]); // No user logged in
      return;
    }

    axios
      .get(BASE_URL, axiosConfig)
      .then((res) => {
        if (res.data && res.data.items) {
          // Map to your frontend structure if needed
          const items = res.data.items.map((item) => ({
            ...item.product, // product info
            quantity: item.quantity,
          }));
          setCartItems(items);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch cart:', err);
      });
  }, [token]);

  // Add to cart API call
  const addToCart = async (product) => {
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/add`,
        { productId: product._id },
        axiosConfig
      );
      if (res.data && res.data.items) {
        const items = res.data.items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));
        setCartItems(items);
      }
    } catch (error) {
      console.error('Add to cart failed', error);
    }
  };

  // Remove from cart API call
  const removeFromCart = async (productId) => {
    if (!token) return;
    try {
      const res = await axios.delete(`${BASE_URL}/remove/${productId}`, axiosConfig);
      if (res.data && res.data.items) {
        const items = res.data.items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));
        setCartItems(items);
      }
    } catch (error) {
      console.error('Remove from cart failed', error);
      
    }
  };

  // Increase quantity (updateQuantity with quantity + 1)
  const increaseQuantity = async (productId) => {
    if (!token) return;
    const currentItem = cartItems.find((item) => item._id === productId);
    if (!currentItem) return;

    try {
      const res = await axios.put(
        `${BASE_URL}/quantity`,
        { productId, quantity: currentItem.quantity + 1 },
        axiosConfig
      );
      if (res.data && res.data.items) {
        const items = res.data.items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));
        setCartItems(items);
      }
    } catch (error) {
      console.error('Increase quantity failed', error);
    }
  };

  // Decrease quantity (updateQuantity with quantity - 1)
  const decreaseQuantity = async (productId) => {
    if (!token) return;
    const currentItem = cartItems.find((item) => item._id === productId);
    if (!currentItem) return;
    const newQuantity = currentItem.quantity - 1;
    if (newQuantity <= 0) {
      // Optionally remove item if quantity hits 0
      await removeFromCart(productId);
      return;
    }
    try {
      const res = await axios.put(
        `${BASE_URL}/quantity`,
        { productId, quantity: newQuantity },
        axiosConfig
      );
      if (res.data && res.data.items) {
        const items = res.data.items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));
        setCartItems(items);
      }
    } catch (error) {
      console.error('Decrease quantity failed', error);
    }
  };

  // Clear cart API call
  const clearCart = async () => {
    if (!token) return;
    try {
      await axios.delete(`${BASE_URL}/clear`, axiosConfig);
      setCartItems([]);
    } catch (error) {
      console.error('Clear cart failed', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
