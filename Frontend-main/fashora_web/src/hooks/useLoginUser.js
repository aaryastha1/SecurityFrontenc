



import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../auth/authProvider";

export const useLoginUser = () => {
  const { login } = useContext(AuthContext);

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ["login_key"],
    onSuccess: (data) => {
      if (!data) return;

      // OTP sent, do not login yet
      if (data.message?.includes("OTP sent")) {
        toast.success(data.message);
        return;
      }

      // If backend sends full user data (for non-OTP, fallback)
      if (data.data) {
        login(data.data); // store user in context
        localStorage.setItem("userRole", data.data.role);
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success(data.message || "Login successful");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Login failed");
    },
  });
};
