import { createSlice } from "@reduxjs/toolkit";
import { dashboardBuilder } from "./dashboardBuilder";

interface dashboardData {
    username: string;
    email: string;
    name: string;
    count: number;
    qrs?: any[] | null;
}

export interface dashboardState {
    isLoading: boolean;
    error: string | null;
    data: dashboardData | null;
}

var initialState: dashboardState = {
    isLoading: false,  
    error: null,
    data: null,
};


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        dashboardBuilder(builder)
    }
  })


//Export actions

// Export selectors
export const selectDashboardData = (state:dashboardState) => state.data;
export const selectDashboardLoading = (state:dashboardState) => state.isLoading;
export const selectDashboardError = (state:dashboardState) => state.error;

// Export the reducer
export default dashboardSlice.reducer;