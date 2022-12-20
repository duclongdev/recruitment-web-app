import base from './base'
const postJob = (data) => {
  return new Promise((resolve, reject) => {
    base
      .post('/job', {
        ...data,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const getJobs = () => {
  return new Promise((resolve, reject) => {
    base
      .get('/job')
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export const JobAPI = {
  postJob: postJob,
  getJobs: getJobs,
}
