import React from 'react'
import style from './style.module.scss'
const Button = ({ title, type }) => {
  return (
    <button className={style.button} type={type}>
      <span style={{ fontWeight: '600' }}>{title}</span>
    </button>
  )
}

export default Button
