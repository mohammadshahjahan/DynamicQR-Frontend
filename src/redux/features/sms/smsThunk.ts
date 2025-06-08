import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/api";
import toast from "react-hot-toast";

export const smsThunk = createAsyncThunk("sms/fetchdata", async (offset:number)=> {
    const token = localStorage.getItem("token");
    if(!token){
        console.log("No token found in localStorage");
        return null;
    }
    try{
        const response = await axios.get(`https://dynamicqr-4dwm.onrender.com/user/qr?type=sms&offset=${offset}`,{
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


export const smsPaginatedThunk = createAsyncThunk("paginatedSMS/fetchdata", async (pageNumber:number)=> {
    const token = localStorage.getItem("token");
    if(!token){
        console.log("No token found in localStorage");
        return null;
    }
    try{
        const offset = (pageNumber - 1) * 10; 
        const response = await axios.get(`https://dynamicqr-4dwm.onrender.com/user/qr?type=sms&offset=${offset}`,{
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