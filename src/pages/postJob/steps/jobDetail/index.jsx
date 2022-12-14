import React from 'react'
import style from './style.module.scss'
import { BtnControl, HeaderPostJob, InputContainer } from '../job'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input, { Error } from '../../../../components/Input'
import clsx from 'clsx'
import { DownArrowIcon } from '../../../../assets/icon'

const amountOfJob = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '10+',
  'Tôi liên tục tuyển dụng vị trí này',
]

const amountOfWeek = ['1 dến 3 ngày', '3 đến 7 ngày', '1 đến 2 tuần', '2 đến 4 tuần', 'Trên 4 tuần']

const Checkbox = ({ label, register, value }) => {
  return (
    <label className={style.container}>
      <span className={style.label}>{label}</span>
      <input type="checkbox" {...register('jobType')} value={value} />
      <span className={style.checkmark}></span>
    </label>
  )
}

const DropdownInput = ({ register, error, label, id, listData }) => {
  return (
    <div className={style.dropdownContainer}>
      <label htmlFor="amountOfJob">{label}</label>
      <select
        id={id}
        {...register(id)}
        className={clsx({
          [style.fieldInvalid]: error,
          [style.fieldValid]: !error,
        })}
      >
        <option value="">Chọn số lượng</option>
        {listData.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          )
        })}
      </select>

      <DownArrowIcon className={style.arrowIcon} />

      <Error error={error} />
    </div>
  )
}

const validationSchema = yup.object({
  jobType: yup
    .array()
    .min(1)
    .of(yup.string().required('Phải chọn ít nhất một loại công việc'))
    .required('Phải chọn ít nhất một loại công việc')
    .nullable(),
  amountOfJob: yup.string().required('Vui lòng chọn số lượng hợp lệ'),
  amountOfWeek: yup.string().required('Vui lòng chọn số lượng hợp lệ'),
})

const JobDetail = ({ handleClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
    console.log(errors.jobType)
  }

  const doSomething = async (value) => {
    // do something with my select value onChange
    console.log('trigger: ' + value)
  }
  return (
    <div className={style.jobDetail}>
      <HeaderPostJob title="Chi tiết về công việc" path="assets/imgDetailJob.svg" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <fieldset className={style.checkboxContainer}>
            <legend>Đó là loại công việc gì ? </legend>
            <Checkbox label="Toàn thời gian" register={register} value={'fullTime'} />
            <Checkbox label="Bán thời gian" register={register} value={'partTime'} />
            <Checkbox label="Thực tập sinh" register={register} value={'intern'} />
            <Checkbox label="Thời vụ" register={register} value="temporary" />
            <Checkbox label="Dài hạn" register={register} value="permanent" />
            <Error error={errors.jobType} />
          </fieldset>
        </InputContainer>
        <InputContainer>
          <DropdownInput
            register={register}
            id={'amountOfJob'}
            error={errors.amountOfJob}
            label={'Bạn muốn thuê bao nhiêu người cho công việc này'}
            listData={amountOfJob}
          />
          <br />
          <DropdownInput
            register={register}
            id={'amountOfWeek'}
            error={errors.amountOfWeek}
            label={'Bạn cần thuê nhanh trong bao lâu'}
            listData={amountOfWeek}
          />
        </InputContainer>
        <BtnControl handleClick={handleClick} isValid={isValid} />
      </form>
    </div>
  )
}

export default JobDetail
