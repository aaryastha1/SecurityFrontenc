import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/api";

// GET profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await axios.get("/auth/me");
      return res.data.data;
    }
  });
};

// UPDATE profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData) => {
      const res = await axios.put("/auth/me", updatedData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    }
  });
};
