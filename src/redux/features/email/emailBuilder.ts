import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { emailState } from "./emailSlice"
import { emailPaginatedThunk, emailThunk } from "./emailThunk"

export const emailBuilder = (builder:ActionReducerMapBuilder<emailState>) => {
    builder
    .addCase(emailThunk.pending,(state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(emailThunk.fulfilled,(state,action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
    })
    .addCase(emailThunk.rejected,(state,action) => {
        state.isLoading = false;
        state.error = action.error.message || "Server error";
    });
}

export const paginatedEmailBuilder = (builder:ActionReducerMapBuilder<emailState>) => {
    builder
    .addCase(emailPaginatedThunk.pending,(state) => {
        state.paginatedLoading = true;
        state.error = null;
    })
    .addCase(emailPaginatedThunk.fulfilled,(state,action) => {
        state.paginatedLoading = false;
        state.paginatedData = action.payload;
        state.paginatedError = null;
    })
    .addCase(emailPaginatedThunk.rejected,(state,action) => {
        state.paginatedLoading = false;
        state.paginatedError = action.error.message || "Server error";
    });
}