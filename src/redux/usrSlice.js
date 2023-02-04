import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: JSON.parse(localStorage.getItem('employee')),
  list: [],
  loading: true,
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
    getListUser: (state, actions) => {
      state.list = actions.payload
      state.loading = false
    },
  },
})

export const { login, logout, getListUser } = userSlice.actions
export const selectUser = (state) => state.user.value

export default userSlice.reducer
