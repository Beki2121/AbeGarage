
import axios from "../utils/axiosConfig";

const api_url = import.meta.env.VITE_API_URL;

const ordersService = {
  getAllOrders: async (token) => {
    try {
      const response = await axios.get(`${api_url}/api/orders`, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },
  // A function to update orders
  updateOrder: async ( orderData, token) => {
  try{
    const getresponse = await axios.put(`${api_url}/api/order/${orderData.order_id}`,  orderData,{
      headers: {
        "x-access-token": token,
      },
    });
    console.log(orderData)
    return getresponse.data;
  }
  catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
},

getOrderById: async (token, id) => {
  try {
    const response = await axios.get(`${api_url}/api/order/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
},
getOrderDetailById: async (token, id) => {
  try {
    const response = await axios.get(`${api_url}/api/order_detail/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
},

  // console.log(data);

  //A fucntion to  fetching all order details by hash
getOrderAllDetail: async (token, hash) => {
    try {
      const response = await axios.get(`${api_url}/api/order/details/${hash}`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all order details:", error);
      throw error;
    }
  },

}









export default ordersService;