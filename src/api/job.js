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

const searchJobs = (data) => {
  return new Promise((resolve, reject) => {
    base
      .get('/job/search', {
        params: { jobName: data.jobName, location: data.location },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const loadMoreJob = (condition) => {
  const { offset, jobName, location } = condition
  return new Promise((resolve, reject) => {
    base
      .get('/job/loadMore', {
        params: { offset, jobName, location },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export const JobAPI = {
  postJob: postJob,
  getJobs: getJobs,
  searchJobs: searchJobs,
  loadMoreJob: loadMoreJob
}
