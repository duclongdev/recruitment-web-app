import base from './base'
const login = (user) => {
  return new Promise((resolve, reject) => {
    base
      .post('/user/login', {
        ...user,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const signin = (user) => {
  return new Promise((resolve, reject) => {
    base
      .post('/user/signin', {
        ...user,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}
const applyJob = (data) => {
  return new Promise((resolve, reject) => {
    base
      .post('/letter', {
        ...data,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const update = (data) => {
  const { userId, userInfo } = data
  return new Promise((resolve, reject) => {
    base
      .put(`/user/${userId}`, {
        ...userInfo,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export const userAPI = {
  login: login,
  signin: signin,
  applyJob: applyJob,
  update: update,
}
