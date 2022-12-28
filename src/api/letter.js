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

const saveJob = (jobId, userId) => {
  return new Promise((resolve, reject) => {
    base
      .post(`letter/save/${jobId}`, {
        userId,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const getSavedJobByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    base
      .get(`letter/save/${userId}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const getApplyJobByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    base
      .get(`letter/apply/${userId}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const getAchievedJobByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    base
      .get(`letter/achieved/${userId}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const deleteById = (letterId) => {
  return new Promise((resolve, reject) => {
    base
      .delete(`letter/delete/${letterId}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export const letterAPI = {
  applyJobs,
  getListLetters,
  saveJob,
  getSavedJobByUserId,
  getApplyJobByUserId,
  getAchievedJobByUserId,
  deleteById,
}
