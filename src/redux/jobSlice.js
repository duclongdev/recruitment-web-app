import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobToShowModal: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setJobToShowModal } = jobSlice.actions
export const selectJob = (state) => state.job.value

export default jobSlice.reducer
