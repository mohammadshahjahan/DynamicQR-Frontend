import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { urlState } from "./urlSlice"
import { urlThunk } from "./urlThunk"

export const urlBuilder = (builder:ActionReducerMapBuilder<urlState>) => {
    builder
    .addCase(urlThunk.pending,(state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(urlThunk.fulfilled,(state,action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
    })
    .addCase(urlThunk.rejected,(state,action) => {
        state.isLoading = false;
        state.error = action.error.message || "Server error";
    });
}