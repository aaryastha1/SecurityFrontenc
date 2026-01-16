

// import { useQuery } from '@tanstack/react-query';
// import axios from '../api/api';  // your axios instance baseURL should be set to http://localhost:5006/api

// export const useProductsByCategory = (categoryName) => {
//   return useQuery({
//     queryKey: ['products', categoryName],
//     queryFn: async () => {
//       // Use query param route that works with your backend
//       const res = await axios.get(`/user/products?categoryName=${categoryName}`);
//       return res.data.products;  // array of products
//     },
//     enabled: !!categoryName,
//   });
// };




// hooks/useCategoryProduct.js
import { useQuery } from '@tanstack/react-query';
import axios from '../api/api';
import { useState } from 'react';

export const useProductsByCategory = (categoryName) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const query = useQuery({
    queryKey: ['products', categoryName, pageNumber, pageSize],
    queryFn: async () => {
      const res = await axios.get('/user/products', {
        params: {
          categoryName,
          page: pageNumber,
          limit: pageSize,
        },
      });
      return res.data; // expects { products, total, pagination }
    },
    enabled: !!categoryName,
    keepPreviousData: true,
  });

  const products = query.data?.products || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1, limit: pageSize, total: 0 };

  const canPreviousPage = pagination.page > 1;
  const canNextPage = pagination.page < pagination.totalPages;

  return {
    ...query,
    products,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    pagination,
    canPreviousPage,
    canNextPage,
  };
};
