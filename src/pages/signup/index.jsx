import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import errorMessages from '../../utils/errorMessage.json'
import * as yup from 'yup'
import Button from '../../components/Button'
import { userAPI } from '../../api/user'
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/usrSlice'
import { useDispatch } from 'react-redux'
import { RegExp } from '../../utils/regexExpression'
import style from './style.module.scss'

const validationSchema = yup.object({
  fullName: yup.string().required(errorMessages.required.fullName),
  email: yup
    .string()
    .required(errorMessages.required.email)
    .matches(RegExp.email, errorMessages.emailValidation),
  password: yup
    .string()
    .required(errorMessages.required.password)
    .matches(RegExp.password, errorMessages.password),
  confirmPassword: yup
    .string()
    .required(errorMessages.required.confirmPassword)
    .oneOf([yup.ref('password'), null], errorMessages.confirmPassword),
})
const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const onSubmit = async (data) => {
    userAPI
      .signin(data)
      .then((res) => {
        dispatch(login(res.data))
        navigate('/', { replace: true })
      })
      .catch((error) => {
        if (error.response.data == 'Email is exists') {
          setError('email', {
            message: 'Email đã tồn tại',
          })
        }
      })
  }
  return (
    <div className={style.container}>
      <div className={style.other}>
        <img src="assets/loginbg.jpg" alt="" />
      </div>
      <div className={style.signIn}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <h1>Đăng ký</h1>
          <Input
            label={'Họ và tên'}
            id={'fullName'}
            register={register}
            required
            placeholder={'Nguyễn Đức Long'}
            type={'text'}
            error={errors.fullName}
          />
          <Input
            label="Email"
            id="email"
            placeholder="duclong@space.com"
            register={register}
            required
            type={'email'}
            error={errors.email}
          />
          <Input
            label="Mật khẩu"
            id="password"
            register={register}
            required
            type="password"
            error={errors.password}
          />
          <Input
            label="Nhập lại mật khẩu"
            id="confirmPassword"
            register={register}
            required
            type="password"
            error={errors.confirmPassword}
          />
          <Button title="Đăng ký" style="submit" />
        </form>
      </div>
    </div>
  )
}

export default Signup
