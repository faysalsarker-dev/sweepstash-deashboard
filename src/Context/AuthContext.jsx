/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import useAxios from './../hook/useAxios';

export const ContextData = createContext(null);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const axiosSecure = useAxios()
  // Load user from local storage on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosSecure.post('/login', { email, password });
      const { data } = response;
      if (data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      setLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };



  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post('/logout');
      setUser(null);
      localStorage.removeItem('user');
      setLoading(false);
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  const contextData = {
    user,
    loading,
    login,
   setUser,
    logout,
  };

  return (
    <ContextData.Provider value={contextData}>
      {children}
    </ContextData.Provider>
  );
};

export default AuthContext;
