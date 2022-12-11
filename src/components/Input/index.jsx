import React from 'react'
import style from './style.module.scss'
import clsx from 'clsx'

export const Error = ({ error }) => {
  return (
    <div className={style.error}>
      {error ? (
        <span style={{ color: 'red' }}>{error.message}</span>
      ) : (
        <span style={{ color: 'white' }}></span>
      )}
    </div>
  )
}
const Input = ({ label, id, register, required, type, error, placeholder }) => {
  return (
    <div className={style.container}>
      <label htmlFor={id}>{label}</label>
      <input
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
        id={id}
        className={clsx({
          [style.fieldInvalid]: error,
          [style.fieldValid]: !error,
        })}
      />

      <Error error={error} />
    </div>
  )
}

export default Input
