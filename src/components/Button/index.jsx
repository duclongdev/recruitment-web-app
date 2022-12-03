import React from 'react'
import style from './style.module.scss'
const Button = ({ title }) => {
  return (
    <div className={style.button}>
      <a href="">{title}</a>
    </div>
  )
}

export default Button
