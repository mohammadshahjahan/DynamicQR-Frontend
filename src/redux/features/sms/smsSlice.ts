import { createSlice } from "@reduxjs/toolkit";
import { paginatedSMSBuilder, smsBuilder } from "./smsBuilder";
import { smsReducers } from "./smsReducers";

interface smsData {
    qrs?: any[] | null;
    info?: any | null;
}

export interface smsState {
    isLoading: boolean;
    error: string | null;
    data: smsData | null;
    paginatedData?: smsData | null;
    paginatedLoading: boolean;
    paginatedError: string | null;
    paginatedPage: number;
}

var initialState: smsState = {
    isLoading: false,  
    error: null,
    data: null,
    paginatedData: null,
    paginatedLoading: false,
    paginatedError: null,
    paginatedPage: 1
};


export const smsSlice = createSlice({
    name: 'sms',
    initialState,
    reducers:smsReducers,
    extraReducers:(builder) => {
        smsBuilder(builder);
        paginatedSMSBuilder(builder);
    }
  })


//Export actions
export const { setPageNumber } = smsSlice.actions;

// Export selectors
export const selectsmsData = (state:smsState) => state.data;
export const selectsmsLoading = (state:smsState) => state.isLoading;
export const selectsmsError = (state:smsState) => state.error;
export const selectsmsPaginatedData = (state:smsState) => state.paginatedData;
export const selectsmsPaginatedLoading = (state:smsState) => state.paginatedLoading;
export const selectsmsPaginatedError = (state:smsState) => state.paginatedError;
export const selectsmsPaginatedPage = (state:smsState) => state.paginatedPage;
export const selectsmsPaginatedPageNumber = (state:smsState) => state.paginatedPage;

// Export the reducer
export default smsSlice.reducer;