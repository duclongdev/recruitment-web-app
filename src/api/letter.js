import base from './base'
const applyJobs = (data) => {
  return new Promise((resolve, reject) => {
    base
      .post('/letter', {
        ...data,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const getListLetters = (id) => {
  return new Promise((resolve, reject) => {
    base
      .get(`/letter/employee/${id}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export const letterAPI = {
  applyJobs,
  getListLetters,
}
