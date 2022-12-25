import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    fullName: '',
    emailCompany: '',
    address: '',
    phoneNumber: '',
    companyName: '',
  },
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployeeProfile: (state, actions) => {
      state.value = actions.payload
      console.log(state.value)
    },
  },
})

export const { getEmployeeProfile } = employeeSlice.actions
export const selectEmployee = (state) => state.employee.value

export default employeeSlice.reducer
