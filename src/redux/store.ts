import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from "./features/dashboard/dashboardSlice"
import urlReducer from "./features/url/urlSlice"
import smsReducer from "./features/sms/smsSlice"
import emailReducer from "./features/email/emailSlice"
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    dashboard :dashboardReducer,
    url:urlReducer,
    sms:smsReducer,
    email:emailReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>(); 