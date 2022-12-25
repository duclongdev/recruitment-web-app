import React, { useState, useEffect } from 'react'
import style from './ManagePost.module.scss'
const ManagePost = () => {
  const [jobs, setJobs] = useState([])
  useEffect(() => {}, [setJobs])
  return <div className={style.container}>Hello</div>
}

export default ManagePost
