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



  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await axiosSecure.post('/logout');
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
   setUser,
   setLoading,
    logout,
  };

  return (
    <ContextData.Provider value={contextData}>
      {children}
    </ContextData.Provider>
  );
};

export default AuthContext;
