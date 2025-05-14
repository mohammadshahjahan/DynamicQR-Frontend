import { PayloadAction } from "@reduxjs/toolkit";
import { emailState } from "./emailSlice";

export const emailReducers = {
    setPageNUmber : (state: emailState, action: PayloadAction<number>) => {
        state.paginatedPage = action.payload;
    }
}