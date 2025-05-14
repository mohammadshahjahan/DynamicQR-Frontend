import { createSlice } from "@reduxjs/toolkit";
import { emailBuilder, paginatedEmailBuilder } from "./emailBuilder";
import { emailReducers } from "./emailReducers";

interface emailData {
    qrs?: any[] | null;
    info?: any | null;
}

export interface emailState {
    isLoading: boolean;
    error: string | null;
    data: emailData | null;
    paginatedData?: emailData | null;
    paginatedLoading: boolean;
    paginatedError: string | null;
    paginatedPage: number;
}

var initialState: emailState = {
    isLoading: false,  
    error: null,
    data: null,
    paginatedData: null,
    paginatedLoading: false,
    paginatedError: null,
    paginatedPage: 1
};


export const emailSlice = createSlice({
    name: 'email',
    initialState,
   
    reducers:emailReducers,
        extraReducers:(builder) => {
            emailBuilder(builder)
            paginatedEmailBuilder(builder)
        }
  })


//Export actions
export const { setPageNUmber } = emailSlice.actions;

// Export selectors
export const selectemailData = (state:emailState) => state.data;
export const selectemailLoading = (state:emailState) => state.isLoading;
export const selectemailError = (state:emailState) => state.error;
export const selectemailPaginatedData = (state:emailState) => state.paginatedData;
export const selectemailPaginatedLoading = (state:emailState) => state.paginatedLoading;
export const selectemailPaginatedError = (state:emailState) => state.paginatedError;
export const selectemailPaginatedPage = (state:emailState) => state.paginatedPage;
export const selectemailPaginatedPageNumber = (state:emailState) => state.paginatedPage;

// Export the reducer
export default emailSlice.reducer;