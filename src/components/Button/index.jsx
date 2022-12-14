import React from 'react'
import style from './style.module.scss'
import clsx from 'clsx'
const Button = ({ title, type, onClick, className, disable, contrast }) => {
  return (
    <button
      className={clsx(style.button, className, {
        [style.disable]: disable,
        [style.contrast]: contrast,
      })}
      type={type}
      onClick={onClick}
    >
      <span style={{ fontWeight: '700', fontSize: '1rem' }}>{title}</span>
    </button>
  )
}

export default Button
