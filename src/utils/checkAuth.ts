import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export async function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found in localStorage');
        return false;
      }
    
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/check`, {
          headers: {
            Authorization: token,
          },
        });

        if(response.status !== 200){
            console.log("Token expired or invalid");  
            localStorage.removeItem('token');
        }
        
        return response.status === 200;
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('token');
        return false;
      }
}
