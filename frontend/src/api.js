import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-henna-omega.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//Interceptor => attach token to every request automatically
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

export default api;