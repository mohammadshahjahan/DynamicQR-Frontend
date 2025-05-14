import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { smsState } from "./smsSlice"
import { smsPaginatedThunk, smsThunk } from "./smsThunk"

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

export const paginatedSMSBuilder = (builder:ActionReducerMapBuilder<smsState>) => {
    builder
    .addCase(smsPaginatedThunk.pending,(state) => {
        state.paginatedLoading = true;
        state.paginatedError = null;
    })
    .addCase(smsPaginatedThunk.fulfilled,(state,action) => {
        state.paginatedLoading = false;
        state.paginatedData = action.payload;
        state.paginatedError = null;
    })
    .addCase(smsPaginatedThunk.rejected,(state,action) => {
        state.paginatedLoading = false;
        state.paginatedError = action.error.message || "Server error";
    });
}