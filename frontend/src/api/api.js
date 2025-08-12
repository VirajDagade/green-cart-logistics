import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add a request interceptor to inject token automatically
api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage or sessionStorage (adjust based on your auth setup)
    const token = localStorage.getItem("token"); // or sessionStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
