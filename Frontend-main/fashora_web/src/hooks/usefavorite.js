import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFavorites, toggleFavorite } from '../api/favorite';

// Get all favorite products
export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  });
};

// Toggle product favorite status
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
    },
  });
};

