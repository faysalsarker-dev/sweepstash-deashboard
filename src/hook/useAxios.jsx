import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: import.meta.env.VITE_SERVER_API,
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxios = () => {
  return axiosSecure;
};

export default useAxios;