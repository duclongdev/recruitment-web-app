import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import style from './style.module.scss'
import Button from '../Button'
import { Link, useNavigate } from 'react-router-dom'
import { EmployeeAPI } from '../../api/employee'
import { login } from '../../redux/usrSlice'
import { useDispatch } from 'react-redux'
import Input, { Error } from '../Input'
import * as yup from 'yup'
import errorMessages from '../../utils/errorMessage.json'
import { RegExp } from '../../utils/regexExpression'
import { ApiError } from '../../error/apiError'

const InputRadio = ({ id, register, name, value }) => {
  return (
    <label htmlFor={id} className={style.radioBtn}>
      {value}
      <input {...register('address')} type="radio" name={name} value={value} id={id} />

      <span className={style.checkmark}></span>
    </label>
  )
}

const validationSchema = yup
  .object({
    fullName: yup.string().required(errorMessages.required.fullName),
    email: yup
      .string()
      .required(errorMessages.required.email)
      .matches(RegExp.email, errorMessages.emailValidation),
    password: yup
      .string()
      .required(errorMessages.required.password)
      .matches(RegExp.password, errorMessages.password),
    position: yup.string().required(errorMessages.required.position),
    phoneNumber: yup
      .string()
      .required(errorMessages.required.phoneNumber)
      .matches(RegExp.phone, errorMessages.phoneNumber.invalid)
      .min(10, errorMessages.phoneNumber.tooShort)
      .max(10, errorMessages.phoneNumber.tooLong),
    address: yup.string().required(errorMessages.required.address).nullable(),
    companyWebsite: yup.string().required(errorMessages.required.companyWebsite),
    companyName: yup.string().required(errorMessages.required.companyName),
    confirmPassword: yup
      .string()
      .required(errorMessages.required.confirmPassword)
      .oneOf([yup.ref('password'), null], errorMessages.confirmPassword),
  })
  .required()

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    const user = {
      fullName: data.fullName,
      position: data.position,
      emailCompany: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      companyName: data.companyName,
      websiteCompany: data.websiteCompany,
      password: data.password,
      role: 'EMPLOYEE',
    }
    console.log(user)
    await EmployeeAPI.signIn(user)
      .then((res) => {
        dispatch(login(res.data))
        navigate('/', { replace: true })
      })
      .catch((error) => {
        if (error.response.data === ApiError.emailExists)
          setError('email', {
            message: 'Email đã tồn tại',
          })
        console.log(errors)
      })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formSignin}>
      {/* full name */}

      <Input
        label={'Họ và tên'}
        id={'fullName'}
        register={register}
        required
        placeholder={'Nguyễn Đức Long'}
        type={'text'}
        error={errors.fullName}
      />

      {/* Chức Vụ */}

      <Input
        label={'Chức vụ'}
        id={'position'}
        register={register}
        placeholder="Trưởng phòng nhân sự"
        required
        type={'text'}
        error={errors.position}
      />

      {/* email & sdt */}
      <div className={style.inputRow}>
        <div className={style.inputRow__itemLeft}>
          <Input
            label="Email Công ty"
            id="email"
            placeholder="duclong@space.com"
            register={register}
            required
            type={'email'}
            error={errors.email}
          />
        </div>
        <div className={style.inputRow__itemRight}>
          <Input
            label="Số điện thoại"
            id="phoneNumber"
            placeholder="0906592672"
            register={register}
            required
            type="text"
            error={errors.phoneNumber}
          />
        </div>
      </div>

      {/*Địa chỉ công ty */}

      <div className={style.radioContainer}>
        <div className={style.radioGroup}>
          <InputRadio id="HCM" register={register} name={'address'} value="Hồ Chí Minh" />
          <InputRadio id="HN" register={register} name={'address'} value="Hà Nội" />
          <InputRadio id="DN" register={register} name={'address'} value="Đà Nẵng" />
          <InputRadio id="other" register={register} name={'address'} value="Khác" />
        </div>
        <Error error={errors.address} />
      </div>

      {/*tên công ty*/}
      <Input
        label="Tên công ty"
        id="companyName"
        placeholder="CÔNG TY CỔ PHẦN SPACE"
        register={register}
        required
        type={'text'}
        error={errors.companyName}
      />
      {/*website công ty */}
      <Input
        label="Website công ty"
        id="companyWebsite"
        register={register}
        required
        type="text"
        placeholder="https://space.com"
        error={errors.companyWebsite}
      />
      {/* password */}
      <div className={style.passwordContainer}>
        <div className={style.passwordContainer__itemLeft}>
          <Input
            label="Mật khẩu"
            id="password"
            register={register}
            required
            type="password"
            error={errors.password}
          />
        </div>
        <div className={style.passwordContainer__itemRight}>
          <Input
            label="Nhập lại mật khẩu"
            id="confirmPassword"
            register={register}
            required
            type="password"
            error={errors.confirmPassword}
          />
        </div>
      </div>

      <Button title="Đăng ký" type="submit" />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <span>
          Bạn đã có tài khoản <Link to="/login-employ">Đăng nhập</Link>
        </span>
      </div>
    </form>
  )
}

export default SignIn
