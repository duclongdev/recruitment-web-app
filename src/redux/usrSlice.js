import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: JSON.parse(localStorage.getItem('employee')),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('employee', JSON.stringify(action.payload))
      state.value = action.payload
    },
    logout: (state) => {
      localStorage.removeItem('employee')
      state.value = null
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
