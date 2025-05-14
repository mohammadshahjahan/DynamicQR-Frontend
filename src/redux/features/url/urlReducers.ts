import { PayloadAction } from "@reduxjs/toolkit";
import { urlState } from "./urlSlice";

export const urlReducers = {
    setPageNUmber : (state: urlState, action: PayloadAction<number>) => {
        state.paginatedPage = action.payload;
    }
}