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
const Input = ({
  label,
  id,
  register,
  required,
  type = 'text',
  error,
  placeholder,
  value,
  children,
  className,
  onChange,
}) => {
  return (
    <div className={clsx(style.container, className)}>
      <label
        htmlFor={id}
        className={clsx({ [style.invalid]: error, [style.labelRequired]: required })}
      >
        {label}
      </label>
      <div
        className={clsx(style.inputContainer, {
          [style.fieldInvalid]: error,
          [style.fieldValid]: !error,
        })}
      >
        <input
          {...register(id)}
          placeholder={placeholder}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
        />
        <div className={style.children}>{children}</div>
      </div>
      <Error error={error} />
    </div>
  )
}

export default Input
