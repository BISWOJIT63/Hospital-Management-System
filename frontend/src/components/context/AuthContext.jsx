import React, { createContext, useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get("token");
      const urlRole = urlParams.get("role");

      let token = urlToken || localStorage.getItem("token");
      let storedUser = localStorage.getItem("user");

      if (urlToken) {
        localStorage.setItem("token", urlToken);
        // Clear URL params without full reload
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      if (token && storedUser && !urlToken) {
        // Fast path: use stored user if no new token in URL
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          id: parsedUser.id || parsedUser._id,
          _id: parsedUser._id || parsedUser.id,
        });
        setIsAuthenticated(true);
        setLoading(false);
      } else if (token) {
        // Fetch or Refresh profile
        try {
          const userData = await api.getProfile(token);
          const normalizedUser = {
            ...userData,
            id: userData.id || userData._id,
            _id: userData._id || userData.id,
          };
          setUser(normalizedUser);
          localStorage.setItem("user", JSON.stringify(normalizedUser));
          setIsAuthenticated(true);

          // Centralized OAuth Redirect Logic
          if (urlToken) {
            const role = urlRole || normalizedUser.role;
            if (role?.toLowerCase() === "admin" || role?.toLowerCase() === "superadmin") {
              navigate("/admin");
            } else if (role?.toLowerCase() === "doctor") {
              navigate("/doctor");
            } else {
              navigate("/patient");
            }
          }
        } catch (err) {
          console.error("Session check failed:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      const response = await api.login(email, password, role);
      const { user: rawUser, token } = response;
      const user = { ...rawUser, _id: rawUser._id || rawUser.id, id: rawUser.id || rawUser._id };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message || "Invalid credentials" };
    }
  };

  const register = async (data, role) => {
    try {
      const response = await api.register(data, role);
      const { user: rawUser, token } = response;
      const user = { ...rawUser, _id: rawUser._id || rawUser.id, id: rawUser.id || rawUser._id };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message || "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
