import axios from "../utils/axiosConfig";

const api_url = import.meta.env.VITE_API_URL;

async function getServiceList () {
    const  {data} = await axios.get(`${api_url}/api/services`);
    console.log( data)
    return  data;
}

const serviceService = {
    getServiceList 
 
  };
  
  export default  serviceService;