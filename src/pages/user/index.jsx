import React from 'react'
import { UserAuth } from '../../utils/UserProvider'
import { useNavigate } from 'react-router-dom'

const User = () => {
  const { logOut, user } = UserAuth()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button onClick={handleSignOut}>log out</button>
      User
    </div>
  )
}

export default User
