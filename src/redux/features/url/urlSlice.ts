import { createSlice } from "@reduxjs/toolkit";
import { urlBuilder } from "./urlBuilder";

interface urlData {
    qrs?: any[] | null;
}

export interface urlState {
    isLoading: boolean;
    error: string | null;
    data: urlData | null;
}

var initialState: urlState = {
    isLoading: false,  
    error: null,
    data: null,
};


export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        urlBuilder(builder)
    }
  })


//Export actions

// Export selectors
export const selecturlData = (state:urlState) => state.data;
export const selecturlLoading = (state:urlState) => state.isLoading;
export const selecturlError = (state:urlState) => state.error;

// Export the reducer
export default urlSlice.reducer;