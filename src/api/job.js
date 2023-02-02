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

const getAllJobs = () => {
  return new Promise((resolve, reject) => {
    base
      .get('/job/all')
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

const deleteJobById = (id) => {
  new Promise((resolve, reject) => {
    base
      .delete(`/job/${id}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
  return id
}

const updateJob = (id, job) => {
  return new Promise((resolve, reject) => {
    base
      .put(`/job/${id}`, { ...job })
      .then((res) => resolve(res))
      .catch((error) => reject(error))
  })
}

export const JobAPI = {
  postJob: postJob,
  getJobs: getJobs,
  searchJobs: searchJobs,
  loadMoreJob: loadMoreJob,
  getAllJobs,
  deleteJobById,
  updateJob,
}
