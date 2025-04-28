import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-portfolio-aj.onrender.com", 
  // baseURL: "http://localhost:4000", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
