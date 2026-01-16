import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";

// Custom hook for registering a user
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (formData) => {
      // Ensure formData is passed correctly to your service
      return await registerUserService(formData);
    },
    mutationKey: ['register'],
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful!");
    },
    onError: (error) => {
      toast.error(error?.message || "Registration Failed");
     
      // toast.error(error?.response?.data?.message || error.message || "Registration failed.");
    },
  });
};