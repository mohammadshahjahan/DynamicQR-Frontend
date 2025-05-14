import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { urlState } from "./urlSlice"
import { urlPaginatedThunk, urlThunk } from "./urlThunk"

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


export const urlPaginatedBuilder = (builder:ActionReducerMapBuilder<urlState>) => {
    builder
    .addCase(urlPaginatedThunk.pending,(state) => {
        state.paginatedLoading = true;
        state.error = null;
    })
    .addCase(urlPaginatedThunk.fulfilled,(state,action) => {
        state.paginatedLoading = false;
        state.paginatedData = action.payload;
        state.paginatedError = null;
    })
    .addCase(urlPaginatedThunk.rejected,(state,action) => {
        state.paginatedLoading = false;
        state.paginatedError = action.error.message || "Server error";
    });
}