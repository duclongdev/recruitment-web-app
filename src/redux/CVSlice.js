import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: {
    position: '',
    username: null,
    avatar: [],
    isValidate: false,
  },
  personalInformation: {
    phoneNumber: '',
    address: '',
    isValidate: false,
    email: '',
  },
  education: {},
  exp: {},
  skills: {},
}

export const CVSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    setCVDataInfo: (state, actions) => {
      state.info = actions.payload
    },
    setCVDataPersonalInfo: (state, actions) => {
      state.personalInformation = actions.payload
    },
    setCVDataEducation: (state, actions) => {
      state.education = actions.payload
    },
    setCVDataExp: (state, actions) => {
      state.exp = actions.payload
    },
    setCVDataSkills: (state, actions) => {
      state.skills = actions.payload
    },
  },
})

export const {
  setCVDataInfo,
  setCVDataPersonalInfo,
  setCVDataEducation,
  setCVDataExp,
  setCVDataSkills,
} = CVSlice.actions
export const selectCV = (state) => state.cv.value

export default CVSlice.reducer
