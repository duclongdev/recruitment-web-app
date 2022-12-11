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
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button title="Đăng ký" style="submit" />
    </form>
  )
}

export default Signup
