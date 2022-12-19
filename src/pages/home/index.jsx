import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Search, Button, OtherOpt, OptionShow, Jobs, History } from '../../components'
import clsx from 'clsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { JobAPI } from '../../api/job'

const Home = () => {
  const [show, setShow] = useState(true)
  const [job, setJob] = useState(true)
  const [history, setHistory] = useState(false)
  const [jobs, setJobs] = useState([])

  const isChoose = (check) => {
    if (job === true && check === false) {
      setShow(false)
      setJob(false)
      setHistory(true)
    } else if (history === true && check === true) {
      console.log(job)
      setShow(true)
      setJob(true)
      setHistory(false)
    }
  }

  useEffect(() => {
    JobAPI.getJobs().then((data) => {
      setJobs(data.data)
      console.log(data.data)
    })
  }, [])
  const dologin = () => toast('Wow so easy!')
  
  return (
    <>
      <div>
        <div style={{ height: '50px' }}></div>
        <div className={style.search}>
          <Search type={'search'} />
          <Search type={'location'} />
          <div onClick={dologin}>
            <Button title={'Tìm kiếm'} />
          </div>
        </div>
        <OtherOpt />

        <div className={style.optionShow}>
          <div onClick={() => isChoose(true)} className={clsx({ [style.optionShow__active]: job })}>
            <OptionShow type={'jobFeed'} />
          </div>
          <div
            onClick={() => isChoose(false)}
            className={clsx({ [style.optionShow__active]: history })}
          >
            <OptionShow />
          </div>
        </div>
        {show ? <Jobs  jobs={jobs} /> : <History />}
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
