import axios from "axios";

export async function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found in localStorage');
        return false;
      }
    
      try {
        const response = await axios.get("http://localhost:8000/auth/check", {
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
