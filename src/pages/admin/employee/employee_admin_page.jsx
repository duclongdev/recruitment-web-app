import React, { useEffect, useState } from 'react'
import { EmployeeAPI } from '../../../api/employee'

const EmployeeAdminPage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    EmployeeAPI.getAllEmployee().then((res) => {
      setData(res.data)
      console.log(res.data)
    })
  }, [setData])
  return <div>employee</div>
}

export default EmployeeAdminPage
