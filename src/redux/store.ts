import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from "./features/dashboard/dashboardSlice"
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    dashboard :dashboardReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>(); 