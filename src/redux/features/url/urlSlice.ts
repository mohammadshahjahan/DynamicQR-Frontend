import { createSlice } from "@reduxjs/toolkit";
import { urlBuilder, urlPaginatedBuilder } from "./urlBuilder";
import { urlReducers } from "./urlReducers";

interface urlData {
    qrs?: any[] | null;
    info?: any | null;
}

export interface urlState {
    isLoading: boolean;
    error: string | null;
    data: urlData | null;
    paginatedData?: urlData | null;
    paginatedLoading: boolean;
    paginatedError: string | null;
    paginatedPage: number;
}

var initialState: urlState = {
    isLoading: false,  
    error: null,
    data: null,
    paginatedData: null,
    paginatedLoading: false,
    paginatedError: null,
    paginatedPage: 1
};


export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers:urlReducers,
    extraReducers:(builder) => {
        urlBuilder(builder);
        urlPaginatedBuilder(builder)
    }
  })


//Export actions
export const { setPageNUmber } = urlSlice.actions;

// Export selectors
export const selecturlData = (state:urlState) => state.data;
export const selecturlLoading = (state:urlState) => state.isLoading;
export const selecturlError = (state:urlState) => state.error;
export const selecturlPaginatedData = (state:urlState) => state.paginatedData;
export const selecturlPaginatedLoading = (state:urlState) => state.paginatedLoading;
export const selecturlPaginatedError = (state:urlState) => state.paginatedError;
export const selecturlPaginatedPage = (state:urlState) => state.paginatedPage;
export const selecturlPaginatedPageNumber = (state:urlState) => state.paginatedPage ? state.paginatedPage : 1;

// Export the reducer
export default urlSlice.reducer;