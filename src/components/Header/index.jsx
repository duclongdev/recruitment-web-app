import React from 'react'
import logo from '../../assets/logo.png'
import style from './style.module.scss'
import clsx from 'clsx'

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.header__right}>
        <img src={logo} alt="logo.png" className={style.header__logo} />
        <div className={clsx(style.header__item, style.active)}>
          <a href="">Tìm việc</a>
        </div>
        <div className={style.header__item}>
          <a href="">Đánh giá công ty</a>
        </div>
      </div>
      <div className={style.header__right}>
        <div className={style.header__item}>
          <a href="">Tạo CV</a>
        </div>
        <div className={style.header__item}>
          <a href="" style={{ color: 'rgb(27, 229, 27)', fontWeight: '600' }}>
            Đăng nhập
          </a>
        </div>
        <span className={style.header__span}></span>
        <div className={style.header__item}>
          <a href="">Nhà tuyển dụng / Đăng tin</a>
        </div>
      </div>
    </div>
  )
}

export default Header
