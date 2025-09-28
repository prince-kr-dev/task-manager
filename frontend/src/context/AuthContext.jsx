import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // axios instance with baseURL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  });

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data?.info) {
        const userData = res.data.info;

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async ({ email, fullName, password }) => {
    try {
      const res = await api.post("/auth/signup", { email, fullName, password });

      if (res.data?.info) {
        const userData = res.data.info;

        setUser(userData);
        setToken(res.data.token);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/"; 
    }
  };

  const createTask = async (taskData) => {
    try {
      await api.post("/task/create", taskData);
    } catch (err) {
      console.error(
        "Failed to create task:",
        err.response?.data || err.message
      );
    }
  };

  const getAllTasks = async () => {
    try {
      const res = await api.get("/task/all");
      return res;
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const getTaskById = async (id) => {
    try {
      const res = await api.get(`/task/${id}`);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch task:", err.response?.data || err.message);
      return null;
    }
  };
  const updateTask = async (id, taskData) => {
    try {
      const res = await api.put(`/task/${id}`, taskData);
      return res.data;
    } catch (err) {
      console.error(
        "Failed to update task:",
        err.response?.data || err.message
      );
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await api.delete(`/task/${id}`);
      return res.data;
    } catch (err) {
      console.error(
        "Failed to delete task:",
        err.response?.data || err.message
      );
      throw err;
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const res = await api.patch(
        `/task/${id}/status`,
        { status },
      );
      return res.data;
    } catch (err) {
      console.error("Update status error:", err.response?.data || err.message);
      throw err.response?.data || { message: "Error updating status" };
    }
  };
  
  

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        createTask,
        getAllTasks,
        getTaskById,
        updateTask,
        deleteTask,
        updateTaskStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
