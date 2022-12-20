import React, { useState } from 'react'
import style from './style.module.scss'
import Button from '../Button'
import clsx from 'clsx'
import { HeadIcon, MoneyIcon } from '../../assets/icon'
import { showSalary } from '../../pages/postJob/steps/preview'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'

const ListJob = ({ jobs, setJobDetail, jobDetail }) => {
  const convertTime = (time) => {
    const createdAt = Date.parse(time)
    const result = Math.abs(new Date() - new Date(createdAt))
    let seconds = Math.floor(result / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    if (hours === 0) return 'Mới đăng gần đây'
    let days = Math.floor(hours / 24)
    if (days === 0) return `Đã đăng ${hours} giờ trước`
    let weeks = Math.floor(days / 7)
    if (weeks === 0) return `Đã đăng ${days} ngày trước`
    let months = Math.floor(weeks / 30)
    if (months === 0) return `Đã đăng ${weeks} tuần trước`
    return `Đã đăng ${months} tháng trước`
  }
  const handleClick = (job) => {
    setJobDetail(job)
  }
  return (
    <div className={style.listJob}>
      {jobs.map((job, index) => (
        <div
          key={job._id}
          className={clsx(style.job, {
            [style.job__active]: jobDetail?._id === job?._id,
          })}
          onClick={() => handleClick(job)}
        >
          <h2>{job.jobName}</h2>
          <p>{job.companyName}</p>
          <p>{job.location}</p>

          {job.salary !== null ? (
            <div className={style.job__salary} style={{ display: 'flex' }}>
              <MoneyIcon />
              {showSalary(job.salary)}
            </div>
          ) : null}

          <div className={style.posted}>{convertTime(job.createdAt)}</div>
        </div>
      ))}
      <button className={style.moreBtn}>Hiển thị thêm việc làm</button>
    </div>
  )
}

const JobDetail = ({ jobDetail }) => {
  const data = JSON.parse(jobDetail.jobDescription)
  const marked = draftToHtml(data)
  console.log(marked)
  return (
    <div className={style.jobDetail}>
      <div className={style.jobDetail__header}>
        <h2>{jobDetail.jobName}</h2>
        <p>
          {jobDetail.companyName}
          <br />
          Địa điểm: {jobDetail.location}
        </p>
        <div className={style.jobDetail__header__buttonContainer}>
          <Button title={'Ứng tuyển ngay'} />
          <button
            style={{
              marginLeft: '20px',
              borderRadius: '10px',
              border: 'none',
              padding: '10px 20px',
            }}
          >
            <HeadIcon />
          </button>
        </div>
      </div>

      <div className={style.jobDetail__body}>
        <div dangerouslySetInnerHTML={{ __html: marked }}></div>
      </div>
    </div>
  )
}

const Jobs = ({ jobs }) => {
  const [jobDetail, setJobDetail] = useState(jobs[0])
  console.log(jobDetail)
  return (
    <div className={style.container}>
      <ListJob jobs={jobs} setJobDetail={setJobDetail} jobDetail={jobDetail} />
      {jobDetail && <JobDetail jobDetail={jobDetail} />}
    </div>
  )
}

export default Jobs
