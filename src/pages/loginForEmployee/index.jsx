import React from 'react'
import style from './style.module.scss'
import SignIn from '../../components/SignIn'

const LoginForEmployee = () => {
  return (
    <div className={style.loginForEmploy}>
      <div className={style.info}>info</div>
      <div className={style.login}>
        <SignIn />
      </div>
    </div>
  )
}

export default LoginForEmployee
