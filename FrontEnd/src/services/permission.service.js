import axiosConfig from "../axios/axiosConfig";

const PERMISSION_API_URL = "/permissions";

export const permissionService = {
  // Create a new permission request
  createRequest: async (requestData) => {
    try {
      const response = await axiosConfig.post(
        `${PERMISSION_API_URL}/`,
        requestData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating permission request:", error);
      throw error;
    }
  },

  // Get all permission requests (for admin)
  getAllRequests: async () => {
    try {
      const response = await axiosConfig.get(`${PERMISSION_API_URL}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all permission requests:", error);
      throw error;
    }
  },

  // Get my permission requests (for employee)
  getMyRequests: async (employeeId) => {
    try {
      const response = await axiosConfig.get(
        `${PERMISSION_API_URL}/my?employee_id=${employeeId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching my permission requests:", error);
      throw error;
    }
  },

  // Review a permission request (for admin)
  reviewRequest: async (requestId, reviewData) => {
    try {
      const response = await axiosConfig.put(
        `${PERMISSION_API_URL}/${requestId}`,
        reviewData
      );
      return response.data;
    } catch (error) {
      console.error("Error reviewing permission request:", error);
      throw error;
    }
  },
};

export default permissionService;
