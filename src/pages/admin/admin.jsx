import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useRoutes, Router, Routes, Route, Outlet } from 'react-router-dom'
import { EmployeeAPI } from '../../api/employee'
import { userAPI } from '../../api/user'
import { getListEmployee } from '../../redux/employeeSlice'
import { getListUser } from '../../redux/usrSlice'
import './admin.css'

const AdminPage = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    EmployeeAPI.getAllEmployee().then((res) => {
      dispatch(getListEmployee(res.data))
    })

    userAPI.getAllUser().then((res) => {
      dispatch(getListUser(res.data))
    })
  }, [dispatch])

  return (
    <div className="body" style={{ backgroundColor: 'rgb(240, 242, 245)' }}>
      <div>
        <div className="sidebar" id="sidebar">
          <div className="logo_content">
            <div
              className="logo"
              onClick={() => {
                navigate('/admin/*')
              }}
            >
              <img style={{ margin: '0 40px' }} width={100} src="/src/assets/logo.png" />
            </div>
          </div>
          <ul>
            <li id="li">
              <Link to={'/admin/*/dashboard'}>
                <i className="bx bxs-bar-chart-alt-2" id="bx"></i>
                <span className="links_name" id="span">
                  Trang chủ
                </span>
              </Link>

              <span className="tooltip" id="tooltip">
                Dashboard
              </span>
            </li>
            <li id="li">
              <Link to={'/admin/*/jobs'}>
                <i className="bx bxs-data" id="bx"></i>
                <span className="links_name" id="span">
                  Công việc
                </span>
              </Link>

              <span className="tooltip" id="tooltip">
                Rooms
              </span>
            </li>
            <li id="li">
              <Link to={'/admin/*/employee'}>
                <i class="bx bxs-user-badge"></i>
                <span className="links_name" id="span">
                  Nhân viên
                </span>
              </Link>

              <span className="tooltip" id="tooltip">
                Employees
              </span>
            </li>
            <li id="li">
              <Link to={'/admin/*/user'}>
                <i class="bx bxs-user"></i>
                <span className="links_name" id="span">
                  Người dùng
                </span>
              </Link>

              <span className="tooltip" id="tooltip">
                Users
              </span>
            </li>
          </ul>
          <div className="profile_content">
            <div className="profile">
              <div className="profile_details">
                <img src="/src/assets/logo.png" />
                <div className="name_jobs">
                  <div className="name"></div>
                  <div className="Jobs">Admin</div>
                </div>
              </div>
              <button
                className="btn_menu1"
                onClick={() => {
                  navigate('/')
                }}
              >
                <i className="bx bx-log-out" id="log_out"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="Home_content"></div>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
