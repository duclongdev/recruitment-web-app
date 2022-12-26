import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {
    setLetterToShowModal: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setLetterToShowModal } = letterSlice.actions
export const selectLetter = (state) => state.letter.value

export default letterSlice.reducer
