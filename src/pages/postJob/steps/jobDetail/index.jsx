import React from 'react'
import style from './style.module.scss'
import { BtnControl, HeaderPostJob, InputContainer } from '../job'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Error } from '../../../../components/Input'
import clsx from 'clsx'
import { DownArrowIcon } from '../../../../assets/icon'
import { jobDetail } from '../../../../utils/dataForOptions'
import { postStepContext } from '../../../../utils/MultiFormProvider'

export const Checkbox = ({ label, register, value, onChange, data = 'jobType', checked }) => {
  return (
    <label className={style.container}>
      <span className={style.label}>{label}</span>
      {checked ? (
        <input type="checkbox" {...register(data)} value={value} onChange={onChange} checked />
      ) : (
        <input type="checkbox" {...register(data)} value={value} onChange={onChange} />
      )}
      <span className={style.checkmark}></span>
    </label>
  )
}

export const DropdownInput = ({ register, error, label, id, listData, onChange, required }) => {
  return (
    <div className={style.dropdownContainer}>
      <label
        htmlFor="amountOfJob"
        className={clsx({
          [style.required]: required,
        })}
      >
        {label}
      </label>
      <div
        className={clsx(style.selectContainer, {
          [style.fieldInvalid]: error,
          [style.fieldValid]: !error,
        })}
      >
        {
          onChange ? 
        <select id={id} {...register(id)} onChange={onChange}>
          {listData.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            )
          })}
        </select> : 
        <select id={id} {...register(id)} >
          {listData.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            )
          })}
        </select>


        }
        <DownArrowIcon className={style.arrowIcon} />
      </div>

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
  const { postData, setPostData } = postStepContext()
  console.log(postData)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      jobType: postData.jobDetail?.jobType,
      amountOfJob: postData.jobDetail?.amountOfJob,
      amountOfWeek: postData.jobDetail?.amountOfWeek,
    },
  })

  const onSubmit = (data) => {
    const jobDetail = data
    setPostData({ ...postData, jobDetail })
    handleClick('next')
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
            required
            register={register}
            id={'amountOfJob'}
            error={errors.amountOfJob}
            label={'Bạn muốn thuê bao nhiêu người cho công việc này'}
            listData={jobDetail.amountOfJob}
          />
          <br />
          <DropdownInput
            required
            register={register}
            id={'amountOfWeek'}
            error={errors.amountOfWeek}
            label={'Bạn cần thuê nhanh trong bao lâu'}
            listData={jobDetail.amountOfWeek}
          />
        </InputContainer>
        <BtnControl handleClick={handleClick} />
      </form>
    </div>
  )
}

export default JobDetail
