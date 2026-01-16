import axios from './api';

// Toggle favorite status
export const toggleFavorite = async (productId) => {
  const res = await axios.post('/favorites/toggle', { productId });
  return res.data;
};

// Get all favorite products
export const fetchFavorites = async () => {
  const res = await axios.get('/favorites');
  return res.data.favorites;
};

