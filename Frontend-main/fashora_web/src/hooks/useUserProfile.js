import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/api";

// GET profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const token = localStorage.getItem("token"); // your JWT
      const res = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
  });
};

// UPDATE profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData) => {
      const token = localStorage.getItem("token"); // your JWT
      const res = await axios.put("/auth/me", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};
