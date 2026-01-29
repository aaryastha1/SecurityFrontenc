

import { createContext, useState, useEffect } from "react";
import api from "../api/api"; // Axios instance with withCredentials=true

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Login: store ONLY user info
  const login = (userData) => {
    setUser(userData);
  };

  // 🔓 Logout: backend clears cookie
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // 🔁 Restore session on refresh
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/me"); // cookie sent automatically
        setUser(res.data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
