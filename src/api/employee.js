import base from './base'
const signIn = (user) => {
  return new Promise((resolve, reject) => {
    base
      .post('/employee/signin', {
        user,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const login = (user) => {
  return new Promise((resolve, reject) => {
    base
      .post('/employee/login', {
        ...user,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const updateProfile = (id, user) => {
  return new Promise((resolve, reject) => {
    base
      .put(`/employee/${id}`, { ...user })
      .then((res) => resolve(res))
      .catch((error) => reject(error))
  })
}

const getAllEmployee = () => {
  return new Promise((resolve, reject) => {
    base
      .get('/employee/all')
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export const EmployeeAPI = {
  signIn: signIn,
  login: login,
  updateProfile,
  getAllEmployee
}
