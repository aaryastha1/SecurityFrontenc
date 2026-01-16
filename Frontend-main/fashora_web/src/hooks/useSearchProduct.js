import { useQuery } from 'react-query';
import axios from '../api/api';  // adjust import path if needed

export function useSearchProducts(query) {
  return useQuery(
    ['search', query],
    async () => {
      const res = await axios.get(`/api/user/products/search?q=${query}`);
      return res.data.products;
    },
    {
      enabled: !!query,  // only fetch if query is not empty
    }
  );
}
