import React, { useEffect, useState } from 'react'
import { userAPI } from '../../../api/user'

const UserAdminPage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    userAPI.getAllUser().then((res) => {
      setData(res.data)
      console.log(res.data)
    })
  }, [setData])
  return <div>User</div>
}

export default UserAdminPage
