import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
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
  },
})

export const { openModal, closeModal } = modalSlice.actions
export const selectModal = (state) => state.modal.value

export default modalSlice.reducer
