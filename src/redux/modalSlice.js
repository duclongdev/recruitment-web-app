import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  dataFromPostJob: {},
  applyModal: false,
  toastMessage: false,
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
    openApplyModal: (state) => {
      state.applyModal = true
    },
    closeApplyModal: (state) => {
      state.applyModal = false
    },
    showToastMessage: (state) => {
      state.toastMessage = true
    },
    closeToastMessage: (state) => {
      state.toastMessage = false
    },
  },
})

export const {
  openModal,
  closeModal,
  setDataPostJob,
  openApplyModal,
  closeApplyModal,
  showToastMessage,
  closeToastMessage,
} = modalSlice.actions
export const selectModal = (state) => state.modal.value
export const selectDataPostJob = (state) => state.modal.dataFromPostJob
export const selectApplyModal = (state) => state.modal.applyModal
export const selectToastMessage = (state) => state.modal.toastMessage

export default modalSlice.reducer
