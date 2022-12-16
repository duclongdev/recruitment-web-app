import React from 'react'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import style from './style.module.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object({
  jobName: yup.string().required('Vui lòng điền tên công việc'),
  location: yup.string().required('Vui lòng nhập nơi bạn cần quảng cáo'),
})

export const BtnControl = ({ handleClick }) => {
  return (
    <div className={style.btnControl}>
      <Button
        contrast
        title={
          <span>
            &#10094;<span> Quay lại</span>
          </span>
        }
        className={style.back}
        onClick={() => handleClick()}
      />
      <Button title="Lưu và tiếp tục" className={style.next} type="submit" />
    </div>
  )
}
export const HeaderPostJob = ({ title, path }) => {
  return (
    <div className={style.job__header}>
      <h1>{title}</h1>
      <img src={path} alt="" />
    </div>
  )
}
export const InputContainer = ({ children }) => {
  return <div className={style.job__item}>{children}</div>
}
const Job = ({ handleClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      jobName: 'duclong',
      location: 'dafd',
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    handleClick('next')
  }
  return (
    <div>
      <HeaderPostJob title="Cung cấp một vài thông tin cơ bản" path={'assets/imgJob.svg'} />
      <form className={style.job__info} onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Input
            label="Tên công việc"
            id="jobName"
            register={register}
            required
            error={errors.jobName}
          />
        </InputContainer>
        <InputContainer>
          <Input
            label="Bạn muốn bài đăng của mình xuất hiện ở đâu"
            id="location"
            register={register}
            required
            error={errors.location}
          />
        </InputContainer>
        <BtnControl handleClick={handleClick} isValid={isValid} />
      </form>
    </div>
  )
}

export default Job
