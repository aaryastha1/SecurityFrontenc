
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


import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const BASE_URL = 'http://localhost:5006/api/cart';

  const getAxiosConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    withCredentials: true,
  });

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(BASE_URL, getAxiosConfig());
        if (res.data?.items) {
          setCartItems(
            res.data.items.map((item) => ({
              ...item.product,
              quantity: item.quantity,
            }))
          );
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const res = await axios.post(`${BASE_URL}/add`, { productId: product._id }, getAxiosConfig());
      if (res.data?.items) {
        setCartItems(
          res.data.items.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }))
        );
      }
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/remove/${productId}`, getAxiosConfig());
      if (res.data?.items) {
        setCartItems(
          res.data.items.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }))
        );
      }
    } catch (err) {
      console.error('Remove from cart failed:', err);
    }
  };

  const increaseQuantity = async (productId) => {
    const currentItem = cartItems.find((i) => i._id === productId);
    if (!currentItem) return;

    try {
      const res = await axios.put(
        `${BASE_URL}/quantity`,
        { productId, quantity: currentItem.quantity + 1 },
        getAxiosConfig()
      );
      if (res.data?.items) {
        setCartItems(
          res.data.items.map((item) => ({ ...item.product, quantity: item.quantity }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQuantity = async (productId) => {
    const currentItem = cartItems.find((i) => i._id === productId);
    if (!currentItem) return;

    if (currentItem.quantity <= 1) return removeFromCart(productId);

    try {
      const res = await axios.put(
        `${BASE_URL}/quantity`,
        { productId, quantity: currentItem.quantity - 1 },
        getAxiosConfig()
      );
      if (res.data?.items) {
        setCartItems(
          res.data.items.map((item) => ({ ...item.product, quantity: item.quantity }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/clear`, getAxiosConfig());
      setCartItems([]);
    } catch (err) {
      console.error(err);
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
