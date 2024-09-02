import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [AuthenticatedUser, setAuthenticatedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    console.log("Retrieved from localStorage - Token:", token, "Username:", username);
    if (token && username) {
      setUser({ token, username });
      fetchAuthenticatedUser(username, token);
    }
    setIsLoading(false);
  }, []);

  const fetchAuthenticatedUser = async (username, token) => {
    console.log("Fetching user with username:", username, "and token:", token);
    try {
      const response = await axios.get(`http://localhost:8084/users/userByUsername/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAuthenticatedUser(response.data);
      console.log("User loaded:", response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const login = (token, username) => {
    console.log("Logging in with token:", token, "Username:", username);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUser({ token, username });
    fetchAuthenticatedUser(username, token);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    setAuthenticatedUser(null);
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, AuthenticatedUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
