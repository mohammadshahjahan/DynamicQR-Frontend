import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { emailState } from "./emailSlice"
import { emailThunk } from "./emailThunk"

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