import React from 'react'
import style from './style.module.scss'
const Button = ({ title, type, onClick }) => {
  return (
    <button className={style.button} type={type} onClick={onClick}>
      <span style={{ fontWeight: '600' }}>{title}</span>
    </button>
  )
}

export default Button
