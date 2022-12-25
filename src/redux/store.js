import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './usrSlice'
import modalSlice from './modalSlice'
import employeeReducer from './employeeSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    modal: modalSlice,
    employee: employeeReducer,
  },
})
