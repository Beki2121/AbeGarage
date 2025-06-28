import axios from "../utils/axiosConfig";

const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log(api_url);
// A function to send the login request to the server
const logIn = async (formData) => {
  try {
    console.log("About to send request");
    console.log(formData);

    const response = await axios.post("/api/employee/login", formData);

    // Check if response has data
    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);

    // If it's a network error or empty response
    if (!error.response) {
      throw new Error("Network error: Unable to connect to server");
    }

    // If server returned an error
    if (error.response.status >= 400) {
      throw new Error(error.response.data?.message || "Login failed");
    }

    throw error;
  }
};

// A function to log out the user
const logOut = () => {
  localStorage.removeItem("employee");
};

// Export the functions
export default {
  logIn,
  logOut,
};
