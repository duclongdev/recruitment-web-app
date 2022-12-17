import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './usrSlice'
import modalSlice from './modalSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    modal: modalSlice,
  },
})
