import React from 'react'
import logo from '../../assets/logo.png'
import style from './style.module.scss'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ItemHeader = ({ path, title }) => {
  const navigator = useNavigate()
  const location = useLocation()
  const handleNavigate = (path) => {
    navigator(path, { replace: true })
  }
  return (
    <div
      className={clsx(style.header__item, {
        [style.active]: location.pathname === path ? true : false,
      })}
      onClick={() => handleNavigate(path)}
    >
      <span>{title}</span>
    </div>
  )
}

const Header = () => {
  const user = useSelector((state) => state.user.value)
  return (
    <div className={style.header}>
      <div className={style.header__right}>
        <img src={logo} alt="logo.png" className={style.header__logo} />
        {user?.role === 'EMPLOYEE' ? (
          'EMPLOYEE'
        ) : (
          <>
            <ItemHeader path="/" title="Tìm việc" />
            <ItemHeader path="/review-company" title="Đánh giá công ty" />
          </>
        )}
      </div>
      <div className={style.header__right}>
        {user?.role === 'EMPLOYEE' ? (
          <>
            <ItemHeader path="/post-job" title="Đăng bài" />
            <ItemHeader path="/employee" title={user.fullName} />
          </>
        ) : user?.role === 'USER' ? (
          <>
            <ItemHeader path="/user" title={<span>{user.name}</span>} />
          </>
        ) : (
          <>
            <ItemHeader path="/login" title="Đăng nhập" />
            <span className={style.header__span}></span>
            <ItemHeader path="/login-employee" title="Nhà tuyển dụng / Đăng tin" />
          </>
        )}
      </div>
    </div>
  )
}

export default Header
