import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  dataFromPostJob: {},
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.value = true
    },
    closeModal: (state) => {
      state.value = false
    },
    setDataPostJob: (state, action) => {
      state.dataFromPostJob = action.payload
    },
  },
})

export const { openModal, closeModal, setDataPostJob } = modalSlice.actions
export const selectModal = (state) => state.modal.value
export const selectDataPostJob = (state) => state.modal.dataFromPostJob

export default modalSlice.reducer
