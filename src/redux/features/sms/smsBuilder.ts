import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { smsState } from "./smsSlice"
import { smsThunk } from "./smsThunk"

export const smsBuilder = (builder:ActionReducerMapBuilder<smsState>) => {
    builder
    .addCase(smsThunk.pending,(state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(smsThunk.fulfilled,(state,action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
    })
    .addCase(smsThunk.rejected,(state,action) => {
        state.isLoading = false;
        state.error = action.error.message || "Server error";
    });
}