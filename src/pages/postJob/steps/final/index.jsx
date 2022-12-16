import React from 'react'
import style from './style.module.scss'
import Button from '../../../../components/Button'
import { BtnControl } from '../job'

const Final = ({ handleClick }) => {
  return (
    <div className={style.final}>
      <div className={style.container}>
        <div className={style.wrapper}>
          <svg className={style.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className={style.checkmark__circle} cx="26" cy="26" r="25" fill="none" />
            <path className={style.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <div className={style.title}>Chúc mừng!</div>
        <div className={style.decription}>Bài tuyển dụng của bạn đã được đăng</div>
        <BtnControl handleClick={handleClick} isValid={true} />
      </div>
    </div>
  )
}

export default Final
