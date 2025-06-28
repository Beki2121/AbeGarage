import axios from "../utils/axiosConfig";

const api_url = import.meta.env.VITE_API_URL;

const spaceService = {
  getAllSpaces: async (token) => {
    try {
      const response = await axios.get(`${api_url}/spaces`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching spaces:", error);
      throw error;
    }
  },
  createSpace: async (data, token) => {
    try {
      const response = await axios.post(`${api_url}/spaces`, data, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating space:", error);
      throw error;
    }
  },
  updateSpace: async (id, data, token) => {
    try {
      const response = await axios.put(`${api_url}/spaces/${id}`, data, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating space:", error);
      throw error;
    }
  },
  deleteSpace: async (id, token) => {
    try {
      await axios.delete(`${api_url}/spaces/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      return true;
    } catch (error) {
      console.error("Error deleting space:", error);
      throw error;
    }
  },
};

export default spaceService; 