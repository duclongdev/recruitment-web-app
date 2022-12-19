import React from 'react'
import style from './style.module.scss'
import clsx from 'clsx'

const OptionShow = ({ type }) => {
  let title = 'Việc làm'
  type !== 'jobFeed' ? (title = 'Lịch sử tìm kiếm') : null
  return (
    <div className={clsx(style.container)}>
      {title} {title === 'Việc làm' ? <span className={style.new}>Mới</span> : <></>}
    </div>
  )
}

export default OptionShow
