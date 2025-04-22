import { createSlice } from "@reduxjs/toolkit";
import { smsBuilder } from "./smsBuilder";

interface smsData {
    qrs?: any[] | null;
}

export interface smsState {
    isLoading: boolean;
    error: string | null;
    data: smsData | null;
}

var initialState: smsState = {
    isLoading: false,  
    error: null,
    data: null,
};


export const smsSlice = createSlice({
    name: 'sms',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        smsBuilder(builder)
    }
  })


//Export actions

// Export selectors
export const selectsmsData = (state:smsState) => state.data;
export const selectsmsLoading = (state:smsState) => state.isLoading;
export const selectsmsError = (state:smsState) => state.error;

// Export the reducer
export default smsSlice.reducer;