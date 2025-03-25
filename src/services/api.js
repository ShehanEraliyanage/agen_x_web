import axios from "axios";

const API_BASE_URL = "http://localhost:8070"; // Removed trailing slash to prevent double slash issues

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enable credentials for all requests
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with an error status code
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // Request was made but no response received (CORS issues often fall here)
      console.error("Network error - No response received:", error.message);
      console.error(
        "This might be a CORS issue. Check server CORS configuration."
      );
    } else {
      // Error in setting up the request
      console.error("Request configuration error:", error.message);
    }
    return Promise.reject(error);
  }
);

const apiService = {
  // Upload sales data
  uploadSalesData: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/agent/upload-sales-data", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Override for this specific request
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading sales data:", error);
      throw error;
    }
  },

  // Send message to Agent X
  sendMessage: async (message) => {
    try {
      const response = await api.post("/agent/chat", { message });
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};

export default apiService;
