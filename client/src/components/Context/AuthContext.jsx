/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Fetch user data from API to verify token
      axios
        .get("http://localhost:8000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
          setLoading(false);
        })
        .catch(() => {
          logout();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        formData
      );
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged Out", {style: {background: "rgb(46, 47, 42)", color: "white"}});
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
