
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL,
});

// Attach JWT to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired or invalid tokens
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const token = localStorage.getItem("token");
    const requestUrl = error.config?.url;

    const isLoginRequest = requestUrl?.includes("/api/auth/login");

    if (status === 401 && token && !isLoginRequest) {
      localStorage.removeItem("token");

      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;
