import React, { useState } from 'react'
import { UserAuth } from '../../utils/UserProvider'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/usrSlice'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.scss'
import { selectUser } from '../../redux/usrSlice'
import {
  ProfileIcon,
  HeartIcon,
  PencilIcon,
  PhoneIcon,
  LocationIcon,
  UserIcon,
} from '../../assets/icon'
import UserForm from './userForm'
import clsx from 'clsx'
import Email from '../../assets/icon/Email'
import UserJob from './userJob'

const SideBar = ({ setDisplay, display }) => {
  const { logOut } = UserAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    if (window.confirm('Bạn chắc chắn muốn đăng xuất') === true) {
      try {
        await logOut()
        dispatch(logout())
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className={style.sideBar}>
      <div
        onClick={() => setDisplay('infoUser')}
        className={clsx(style.sideBar__item, {
          [style.active]: display === 'infoUser',
        })}
      >
        <div className={style.icon}>
          <ProfileIcon />
        </div>
        Thông tin cá nhân
      </div>
      <div
        className={clsx(style.sideBar__item, {
          [style.active]: display === 'userJob',
        })}
        onClick={() => setDisplay('userJob')}
      >
        <div className={style.icon}>
          <HeartIcon />
        </div>
        Công việc của tôi
      </div>
      <div
        className={style.sideBar__item}
        style={{ justifyContent: 'center' }}
        onClick={handleSignOut}
      >
        Đăng xuất
      </div>
    </div>
  )
}

const Item = ({ icon, content }) => {
  return (
    <>
      {content !== undefined ? (
        <div style={{ display: 'flex' }}>
          <div style={{ width: '20px', marginRight: '10px' }}>{icon}</div>
          {content}
        </div>
      ) : null}
    </>
  )
}
const InfoUser = () => {
  const user = useSelector(selectUser)
  const photoURL = user.photoURL
  return (
    <div className={style.infoUser}>
      <div className={style.infoUser__left}>
        <UserForm user={user} />
      </div>
      <div className={style.infoUser__right}>
        <img src={photoURL} className={style.infoUser__userImg} />
        <div className={style.infoUser__btnEdit}>
          Chỉnh sửa
          <div style={{ width: '20px', marginLeft: '10px' }}>
            <PencilIcon />
          </div>
        </div>
        <div className={style.info}>
          <Item icon={<UserIcon />} content={user.name} />
          <Item icon={<Email />} content={user.email} />
          <Item icon={<PhoneIcon />} content={user.phoneNumber} />
          <Item icon={<LocationIcon />} content={user.address} />
        </div>
      </div>
    </div>
  )
}

const Body = ({ display }) => {
  return <div className={style.body}>{display === 'infoUser' ? <InfoUser /> : <UserJob />}</div>
}

const User = () => {
  const [display, setDisplay] = useState('infoUser')
  return (
    <div className={style.user}>
      {/* <button onClick={handleSignOut}>log out</button> */}
      <div className={style.user__sideBar}>
        <SideBar setDisplay={setDisplay} display={display} />
      </div>
      <div className={style.user__body}>
        <div className={style.main}>
          <Body display={display} />
        </div>
      </div>
    </div>
  )
}

export default User
