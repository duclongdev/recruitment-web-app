import React from 'react'
import style from './style.module.scss'

const OtherOpt = () => {
  return (
    <div className={style.otherOpt}>
      <p>
        <a href="/create-cv">
          <strong>Tạo CV</strong>{' '}
        </a>
        - Chỉ cần vài giây
      </p>
      <p>
        <a href="/post-job">
          <strong>Đăng tải công việc</strong>{' '}
        </a>
        - Tuyển dụng nhân viên
      </p>
    </div>
  )
}

export default OtherOpt
