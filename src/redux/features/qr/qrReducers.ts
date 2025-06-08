import { PayloadAction } from "@reduxjs/toolkit";
import { qrState } from "./qrSlice";


export const qrReducers = {
    setPageNumber : (state: qrState, action: PayloadAction<number>) => {
        state.paginatedPage = action.payload;
    }
}