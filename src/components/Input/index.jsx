import React from 'react'
import style from './style.module.scss'
import clsx from 'clsx'
import { ErrorIcon } from '../../assets/icon'

export const Error = ({ error }) => {
  return (
    <div className={style.error}>
      {error ? (
        <div className={style.error__message}>
          <ErrorIcon />
          <span>{error.message}</span>
        </div>
      ) : (
        <span style={{ color: 'white' }}></span>
      )}
    </div>
  )
}
const Input = ({ label, id, register, required, type = 'text', error, placeholder, value }) => {
  return (
    <div className={style.container}>
      <label htmlFor={id} className={clsx({ [style.invalid]: error })}>
        {label}
      </label>
      <input
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
        id={id}
        className={clsx({
          [style.fieldInvalid]: error,
          [style.fieldValid]: !error,
        })}
        value={value}
      />
      <Error error={error} />
    </div>
  )
}

export default Input
