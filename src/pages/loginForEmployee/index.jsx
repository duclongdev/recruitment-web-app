import React from 'react'
import style from './style.module.scss'
import SignIn from '../../components/SignIn'
import { CheckedIcon } from '../../assets/icon'
import Button from '../../components/Button'

const LoginForEmployee = () => {
  return (
    <div className={style.loginForEmploy}>
      <div className={style.info}>
        <h1>
          Chiêu mộ nhân tài công nghệ cùng <span>SPACE </span>
        </h1>
        <p>
          <CheckedIcon />
          Giúp bạn củng cố thương hiệu tuyển dụng với các giải pháp của ITviec
        </p>
        <p>
          <CheckedIcon />
          Tạo JD hấp dẫn để tiếp cận ứng viên IT chất lượng
        </p>
        <p>
          <CheckedIcon />
          Thấu hiểu thị trường tuyển dụng ngành IT với những cập nhật mới nhất
        </p>
      </div>
      <div className={style.signIn}>
        <SignIn />
      </div>
    </div>
  )
}

export default LoginForEmployee
