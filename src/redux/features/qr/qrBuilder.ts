import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { qrState } from "./qrSlice";
import { qrThunk } from "./qrThunk";

export const qrBuilder = (builder:ActionReducerMapBuilder<qrState>) => {
    builder
    .addCase(qrThunk.pending,(state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(qrThunk.fulfilled,(state,action) => {
        state.isLoading = false;
        state.data.history = action.payload.history;
        state.data.info = action.payload.info;
        state.data.details = action.payload.details;
        state.error = null;
    })
    .addCase(qrThunk.rejected,(state,action) => {
        state.isLoading = false;
        state.error = action.error.message || "Server error";
    });
}
