import axios from "axios";

const API_BASE_URL = "http://localhost:8070"; // Removed trailing slash to prevent double slash issues

const apiService = {
  // Upload sales data
  uploadSalesData: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/agent/upload-sales-data`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Add this for CORS credentials support
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading sales data:", error);
      throw error;
    }
  },

  // Send message to Agent X
  sendMessage: async (message) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/agent/chat`,
        {
          message,
        },
        {
          withCredentials: true, // Add this for CORS credentials support
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};

export default apiService;
