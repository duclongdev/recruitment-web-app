import React from 'react'
import Header from '../../components/Header'
import style from './style.module.scss'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  )
}

export default DefaultLayout
