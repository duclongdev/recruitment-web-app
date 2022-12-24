import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './usrSlice'
import modalSlice from './modalSlice'
import homeSlice from './homeSlice'
import jobSlice from './jobSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    modal: modalSlice,
    home: homeSlice,
    job: jobSlice,
  },
})
