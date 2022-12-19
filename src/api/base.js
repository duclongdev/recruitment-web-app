import axios from 'axios'

const appApi = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export default appApi
