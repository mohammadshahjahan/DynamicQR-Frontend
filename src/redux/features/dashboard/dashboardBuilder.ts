import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { dashboardState } from "./dashboardSlice"
import { dashboardThunk } from "./dashboardThunk"

export const dashboardBuilder = (builder:ActionReducerMapBuilder<dashboardState>) => {
    builder
    .addCase(dashboardThunk.pending,(state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(dashboardThunk.fulfilled,(state,action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
    })
    .addCase(dashboardThunk.rejected,(state,action) => {
        state.isLoading = false;
        state.error = action.error.message || "Server error";
    });
}