/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import useAxios from "./../hook/useAxios";

export const ContextData = createContext(null);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();

  const createUser = async (formData) => {
    const { data: userResponse } = await axiosSecure.post(
      "/user/register",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return userResponse;
  };

  const verifyOtp = async (email, otp) => {
    const otpCode = otp.join("");
    const info = { email, otp: otpCode };
    const { data: otpConfirm } = await axiosSecure.post(
      "user/verify-otp",
      info
    );
    return otpConfirm;
  };

  const userVerify = async (email) => {
    const { data: verify } = await axiosSecure.post("/user/verify", {
      email: email,
    });
    return verify;
  };


  const login=async(email, password )=>{
    const {data} = await axiosSecure.post('/user/login', { email, password });
    return data
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const { data } = await axiosSecure.get("/user/me");

        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [axiosSecure]);

  // Logout function
  const logout = async () => {
    setLoading(true);

    try {
      await axiosSecure.post("user/logout");
      setUser(null);
      
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
    createUser,
    verifyOtp,
    userVerify,
    login
  };

  return (
    <ContextData.Provider value={contextData}>{children}</ContextData.Provider>
  );
};

export default AuthContext;
