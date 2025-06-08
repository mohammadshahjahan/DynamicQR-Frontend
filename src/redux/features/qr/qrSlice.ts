import { createSlice } from "@reduxjs/toolkit";
import { qrBuilder } from "./qrBuilder";
import { qrReducers } from "./qrReducers";


interface qrData {
    history: any[] | null;
    info: any | null;
    details: any | null;
}

export interface qrState {
    isLoading: boolean;
    error: string | null;
    data: qrData;
    paginatedPage: number;
}

var initialState: qrState = {
    isLoading: false,  
    error: null,
    data: {
        details: null,
        history: null,
        info: null
    },
    paginatedPage: 1
};


export const qrSlice = createSlice({
    name: 'qr',
    initialState,
   
    reducers:{
        ...qrReducers
    },
    extraReducers:(builder) => {
        qrBuilder(builder)
    }
  })


//Export actions
export const { setPageNumber } = qrSlice.actions;

// Export selectors
export const selectemailData = (state:qrState) => state.data;
export const selectemailLoading = (state:qrState) => state.isLoading;
export const selectemailError = (state:qrState) => state.error;
export const selectemailPaginatedPageNumber = (state:qrState) => state.paginatedPage;

// Export the reducer
export default qrSlice.reducer;