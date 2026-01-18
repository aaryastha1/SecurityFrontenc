// import axios from "axios"
// const API_URL = import.meta.env.VITE_API_BASE_URL ||
//     "http://localhost:5006/api" // fallback
// const instance = axios.create(
//     {
//         baseURL: API_URL,
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }
// )

// instance.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token")
//     if(token){
//         config.headers.Authorization = "Bearer " + token
//     }
//     return config

// })
// export default instance


import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5006/api";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🔐 REQUIRED FOR COOKIES
  headers: {
    "Content-Type": "application/json",
  },
});

// ❌ REMOVE TOKEN INTERCEPTOR
// Cookies are sent automatically by browser

export default instance;
