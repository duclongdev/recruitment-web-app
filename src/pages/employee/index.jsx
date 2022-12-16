import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/usrSlice'

const Employee = () => {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  return (
    <div>
      <div>{user ? <span>{JSON.stringify(user)}</span> : 'not found'}</div>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Employee
