import React from 'react'
import { UserAuth } from '../../utils/UserProvider'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/usrSlice'
import { useDispatch } from 'react-redux'
import style from './review-company.module.scss'
const ReviewCompany = () => {
  const { logOut, user } = UserAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      await logOut()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return <div className={style.review_container}>User</div>
}

export default ReviewCompany
