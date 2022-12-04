import React from 'react'
import logo from '../../assets/logo.png'
import style from './style.module.scss'
import clsx from 'clsx'
import { UserAuth } from '../../utils/UserProvider'

const Header = () => {
  const { user } = UserAuth()
  return (
    <div className={style.header}>
      <div className={style.header__right}>
        <img src={logo} alt="logo.png" className={style.header__logo} />
        <a href="/" className={clsx(style.header__item, style.active)}>
          <span>Tìm việc</span>
        </a>
        <a className={style.header__item}>
          <span href="">Đánh giá công ty</span>
        </a>
      </div>
      <div className={style.header__right}>
        <a className={style.header__item}>
          <span href="">Tạo CV</span>
        </a>
        {user ? (
          <a className={style.header__item} href="/user">
            <span>{user.displayName}</span>
          </a>
        ) : (
          <a className={style.header__item} href="/login">
            <span>Đăng nhập</span>
          </a>
        )}
        <span className={style.header__span}></span>
        <div className={style.header__item}>
          <a href="">Nhà tuyển dụng / Đăng tin</a>
        </div>
      </div>
    </div>
  )
}

export default Header
