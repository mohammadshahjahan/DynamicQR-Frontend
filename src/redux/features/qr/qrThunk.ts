import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface QrThunkArgs {
    pageNumber: number;
    qrID: number;
  }

export const qrThunk = createAsyncThunk("qr/fetchdata", async ({pageNumber ,qrID} : QrThunkArgs) => {
    const token = localStorage.getItem("token");
    if(!token){
        console.log("No token found in localStorage");
        return null;
    }
    try{
        const offset = (pageNumber - 1) * 10; 
        const response = await axios.get(`http://localhost:8000/qr?qrID=${qrID}&offset=${offset}`,{
            headers:{
                Authorization: token,
            },
        })
        
        return response.data;
    }
    catch(error:any){
        console.error("Auth check failed:", error);
        toast.error(error.response.data.message || "Server error Login again");
        localStorage.removeItem("token");
        return null;
    }
}) 