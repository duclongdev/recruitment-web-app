import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Search, Button, OtherOpt, OptionShow, Jobs, History } from '../../components'
import clsx from 'clsx'
import { JobAPI } from '../../api/job'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { enableLoadMore } from '../../redux/homeSlice'

const Home = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)
  const [job, setJob] = useState(true)
  const [history, setHistory] = useState(false)
  const [jobs, setJobs] = useState([])
  const [toSearch, setToSearch] = useState({ jobName: '', location: '' })
  const [historySearch, setHistorySearch] = useState([])

  const isChoose = (check) => {
    if (job === true && check === false) {
      setShow(false)
      setJob(false)
      setHistory(true)
    } else if (history === true && check === true) {
      setShow(true)
      setJob(true)
      setHistory(false)
    }
  }

  useEffect(() => {
    JobAPI.getJobs().then((data) => {
      setJobs(data.data)
    })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const params = {
      jobName: toSearch.jobName,
      location: toSearch.location,
    }
    JobAPI.searchJobs(params).then((response) => {
      setJobs(response.data)
      dispatch(enableLoadMore())
      const historyItem = {
        jobName: params.jobName,
        location: params.location,
      }
      const check = historySearch.find((element) => {
        if (historyItem.jobName === element.jobName && historyItem.location === element.location)
          return true
        return false
      })
      historyItem.jobName === '' && historyItem.location === ''
        ? null
        : check === undefined
        ? setHistorySearch((oldHistory) => [...oldHistory, historyItem])
        : null

      setShow(true)
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setToSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  return (
    <>
      <div>
        <div style={{ height: '50px' }}></div>
        <form className={style.search}>
          <Search
            type={'search'}
            name={'jobName'}
            value={toSearch.jobName}
            onChange={handleInputChange}
          />
          <Search
            type={'location'}
            name={'location'}
            value={toSearch.location}
            onChange={handleInputChange}
          />
          <div>
            <Button title={'Tìm kiếm'} onClick={onSubmit} />
          </div>
        </form>

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
        {show ? (
          <Jobs jobs={jobs} setJobs={setJobs} condition={toSearch} />
        ) : (
          <History
            history={historySearch}
            setShow={setShow}
            setJobs={setJobs}
            toSearch={setToSearch}
            switchScreen={() => isChoose(true)}
            setToSearch={setToSearch}
          />
        )}
      </div>
    </>
  )
}

export default Home
