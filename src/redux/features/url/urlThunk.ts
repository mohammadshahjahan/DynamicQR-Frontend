import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const urlThunk = createAsyncThunk("url/fetchdata", async (offset:number)=> {
    const token = localStorage.getItem("token");
    if(!token){
        console.log("No token found in localStorage");
        return null;
    }
    try{
        const response = await axios.get(`https://dynamicqr-4dwm.onrender.com/user/qr?type=url&offset=${offset}`,{
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

export const urlPaginatedThunk = createAsyncThunk("paginatedURL/fetchdata", async (pageNumber:number)=> {
    const token = localStorage.getItem("token");
    if(!token){
        console.log("No token found in localStorage");
        return null;
    }
    try{
        const offset = (pageNumber - 1) * 10; 
        const response = await axios.get(`http://localhost:8000/user/qr?type=url&offset=${offset}`,{
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