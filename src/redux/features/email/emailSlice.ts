import { createSlice } from "@reduxjs/toolkit";
import { emailBuilder } from "./emailBuilder";

interface emailData {
    qrs?: any[] | null;
}

export interface emailState {
    isLoading: boolean;
    error: string | null;
    data: emailData | null;
}

var initialState: emailState = {
    isLoading: false,  
    error: null,
    data: null,
};


export const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        emailBuilder(builder)
    }
  })


//Export actions

// Export selectors
export const selectemailData = (state:emailState) => state.data;
export const selectemailLoading = (state:emailState) => state.isLoading;
export const selectemailError = (state:emailState) => state.error;

// Export the reducer
export default emailSlice.reducer;