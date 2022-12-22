import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loadMore: true,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    enableLoadMore: (state) => {
      state.loadMore = true
    },
    disableLoadMore: (state) => {
      state.loadMore = false
    },
  },
})

export const { enableLoadMore, disableLoadMore } = homeSlice.actions
export const selectLoadMore = (state) => state.home.loadMore

export default homeSlice.reducer
