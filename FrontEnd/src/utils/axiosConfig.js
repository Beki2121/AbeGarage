import axios from "axios";

const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";

const instance = axios.create({
  baseURL: api_url,
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for logging
instance.interceptors.request.use(
  (config) => {
    console.log("Making request to:", config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
instance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.response) {
      // Server responded with error status
      console.error("Error data:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received");
    } else {
      // Something else happened
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
