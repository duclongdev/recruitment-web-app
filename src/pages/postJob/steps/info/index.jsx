import React from 'react'
import style from './style.module.scss'
import Input from '../../../../components/Input'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import errorMessages from '../../../../utils/errorMessage.json'
import Button from '../../../../components/Button'
import { useSelector } from 'react-redux'

const validationSchema = yup.object({
  companyName: yup.string().required(errorMessages.required.fullName),
  fullName: yup.string().required(errorMessages.required.fullName),
  phoneNumber: yup.string().matches(RegExp.phone, errorMessages.phoneNumber.invalid),
  email: yup
    .string()
    .required(errorMessages.required.email)
    .matches(RegExp.email, errorMessages.emailValidation),
})
const Info = ({ handleClick }) => {
  const user = useSelector((state) => state.user.value)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      companyName: user.companyName,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.emailCompany,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <div className={style.info}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Xác nhận thông tin tài khoản</h1>
        <Input
          label={<span className={style.required}>Tên công ty</span>}
          id={'companyName'}
          register={register}
          required
          placeholder={'CÔNG TY CỔ PHẦN SPACE'}
          type={'text'}
          error={errors.companyName}
        />
        <Input
          label={<span className={style.required}>Họ và tên</span>}
          id={'fullName'}
          register={register}
          required
          placeholder={'Nguyễn Đức Long'}
          type={'text'}
          error={errors.fullName}
        />
        <Input
          label={<span className={style.required}>Số điện thoại</span>}
          id={'phoneNumber'}
          register={register}
          required
          placeholder={'0906592672'}
          type={'text'}
          error={errors.phoneNumber}
        />
        <Input
          label={<span className={style.required}>Email công ty</span>}
          id={'email'}
          register={register}
          required
          type={'text'}
          error={errors.email}
        />

        <div className={style.btnContainer}>
          <Button
            title="Lưu và tiếp tục"
            type="submit"
            onClick={isValid ? () => handleClick('next') : null}
            className={style.btn}
            disable={isValid ? false : true}
          />
        </div>
      </form>
      <div className={style.imgContainer}>
        <img src="assets/mgPJ.svg" alt="" />
      </div>
    </div>
  )
}

export default Info
