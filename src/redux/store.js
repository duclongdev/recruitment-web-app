import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './usrSlice'
import modalSlice from './modalSlice'
import employeeReducer from './employeeSlice'
import homeSlice from './homeSlice'
import jobSlice from './jobSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    modal: modalSlice,
    employee: employeeReducer,
    home: homeSlice,
    job: jobSlice,
  },
})
