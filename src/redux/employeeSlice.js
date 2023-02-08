import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    fullName: '',
    emailCompany: '',
    address: '',
    phoneNumber: '',
    companyName: '',
  },
  list: [],
  loading: true,
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployeeProfile: (state, actions) => {
      state.value = actions.payload
    },
    getListEmployee: (state, actions) => {
      state.list = actions.payload
      state.loading = false
    },
  },
})

export const { getEmployeeProfile, getListEmployee } = employeeSlice.actions
export const selectEmployee = (state) => state.employee.value

export default employeeSlice.reducer
