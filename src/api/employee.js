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

export const EmployeeAPI = {
  signIn: signIn,
  login: login,
}
