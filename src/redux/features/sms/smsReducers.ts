import { PayloadAction } from "@reduxjs/toolkit";
import { smsState } from "./smsSlice";

export const smsReducers  = {
    setPageNumber : (state: smsState,action : PayloadAction<number>) => {
        state.paginatedPage = action.payload;
    }
}