import React from 'react'
import logo from '../../assets/logo.png'
import style from './style.module.scss'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dropdown, Space } from 'antd'
import { ProfileOutlined, SettingOutlined, HeartOutlined, LogoutOutlined } from '@ant-design/icons'
import { logout } from '../../redux/usrSlice'
import { UserAuth } from '../../utils/UserProvider'

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
  const dispatch = useDispatch()
  const { logOut } = UserAuth()
  const items = [
    {
      label: (
        <a
          style={{ textDecoration: 'none' }}
          href={`${user?.role == 'USER' ? '/user' : '/employee'}`}
        >
          Hồ sơ
        </a>
      ),
      icon: <ProfileOutlined style={{ marginTop: '1px' }} />,
    },
    {
      label: (
        <a style={{ textDecoration: 'none' }} href="https://www.aliyun.com">
          Việc làm của tôi
        </a>
      ),
      icon: <HeartOutlined />,
    },
    {
      label: (
        <a style={{ textDecoration: 'none' }} href="https://www.luohanacademy.com">
          Cài đặt
        </a>
      ),
      icon: <SettingOutlined />,
    },
    {
      label: (
        <a
          style={{ textDecoration: 'none' }}
          onClick={async () => {
            if (window.confirm('Bạn chắc chắn muốn đăng xuất') === true) {
              try {
                await logOut()
                dispatch(logout())
                navigate('/')
              } catch (error) {
                console.log(error)
              }
            }
          }}
        >
          Đăng xuất
        </a>
      ),
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <div className={style.header}>
      <div className={style.header__right}>
        <a href="/">
          <img src={logo} alt="logo.png" className={style.header__logo} />
        </a>
        <>
          {user?.role === 'EMPLOYEE' ? (
            <>
              <ItemHeader path="/manage-post" title="Quản lý bài đăng" />
              {user?.position == 'Manager' && (
                <>
                  <ItemHeader path="/manage-post-admin" title="Tất cả bài đăng" />
                  <ItemHeader path="/admin/*" title="Admin" />
                </>
              )}
            </>
          ) : (
            <ItemHeader path="/" title="Tìm việc" />
          )}
        </>
      </div>
      <div className={style.header__right}>
        {user?.role === 'EMPLOYEE' ? (
          <>
            <ItemHeader path="/create-cv" title="Tạo CV" />
            <ItemHeader path="/post-job" title="Đăng bài" />
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <div className={clsx(style.header__item)}>
                <span>{user.fullName}</span>
              </div>
            </Dropdown>
          </>
        ) : user?.role === 'USER' ? (
          <>
            <ItemHeader path="/create-cv" title="Tạo CV" />
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
