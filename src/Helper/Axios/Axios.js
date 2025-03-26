import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-portfolio-aj.onrender.com", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
