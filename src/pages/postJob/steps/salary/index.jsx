import React, { useState } from 'react'
import style from './style.module.scss'
import { BtnControl, HeaderPostJob } from '../job'
import { InputContainer } from '../job'
import { useForm } from 'react-hook-form'
import { DropdownInput } from '../jobDetail'
import Input from '../../../../components/Input'
import clsx from 'clsx'
import { Checkbox } from '../jobDetail'
import { salary } from '../../../../utils/dataForOptions'

const Salary = ({ handleClick }) => {
  const [range, setRange] = useState(true)
  const [startSalary, setStartSalary] = useState('')
  const [endSalary, setEndSalary] = useState('')
  const [checkBox, setCheckBox] = useState(true)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const amount = {
    startAmount: 'startAmount',
    endAmount: 'endAmount',
    amount: 'amount',
  }

  const onSubmit = (data) => {
    let flag = true
    if (data.noneSalary === false) {
      if (data.salaryType === 'range') {
        if (data.startAmount === '') {
          setError(amount.startAmount, { message: 'Không được để trống phần này' })
          flag = false
        }
        if (data.endAmount === '') {
          setError(amount.endAmount, { message: 'Không được để trống phần này' })
          flag = false
        }
        if (
          data.startAmount !== '' &&
          data.endAmount !== '' &&
          parseInt(data.startAmount) >= parseInt(data.endAmount)
        ) {
          setError(amount.endAmount, { message: 'Không được ít hơn số tiền ban đầu' })
          flag = false
        }
        if (flag === true) {
          console.log(data)
          handleClick('next')
        }
      } else {
        if (data.amount === '') setError(amount.amount, { message: 'Không được để trống phần này' })
        else {
          console.log(data)
          handleClick('next')
        }
      }
    } else {
      console.log('completed')
      handleClick('next')
    }
  }
  const handleStartAmount = (e) => {
    if (isNaN(e.target.value)) {
      setError(amount.startAmount, { message: 'Số tiền không hợp lệ' })
    } else {
      clearErrors(amount.startAmount)
      setStartSalary(e.target.value)
      setCheckBox(false)
    }
    if (endSalary === '' && e.target.value === '') {
      setCheckBox(true)
    }
  }

  const handleEndAmount = (e) => {
    if (isNaN(e.target.value)) {
      setError(amount.endAmount, { message: 'Số tiền không hợp lệ' })
    } else {
      clearErrors(amount.endAmount)
      setEndSalary(e.target.value)
    }
    if (parseInt(e.target.value) <= startSalary) {
      setError(amount.endAmount, { message: 'Không được ít hơn số tiền ban đầu' })
    } else {
      clearErrors(amount.endAmount)
      setCheckBox(false)
    }
    if (e.target.value === '' && startSalary === '') {
      setCheckBox(true)
    }
  }

  const handleAmount = (e) => {
    if (isNaN(e.target.value)) {
      setError(amount.amount, { message: 'Số tiền không hợp lệ' })
    } else {
      setCheckBox(false)
      clearErrors(amount.amount)
    }
    if (e.target.value === '') setCheckBox(true)
  }

  const handleNoneSalary = (e) => {
    if (e.target.checked === true) console.log(e.target.checked)
    clearErrors([amount.startAmount, amount.endAmount, amount.amount])
  }

  return (
    <div className={style.salary}>
      <HeaderPostJob title="Thêm mức lương" path="assets/salary.svg" />
      <form className={style.salary__form} onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <fieldset>
            <legend>Mức lương cho công việc</legend>
            <DropdownInput
              label={'Hiển thị lương theo'}
              register={register}
              listData={salary.types}
              id={'salaryType'}
              onChange={(event) => {
                event.target.value === 'range' ? setRange(true) : setRange(false)
              }}
            />
            <div className={style.salary__amount}>
              <div
                className={clsx(style.rangeContainer, {
                  [style.hidden]: !range,
                })}
              >
                <Input
                  className={style.rangeItem}
                  label={'Từ'}
                  id="startAmount"
                  register={register}
                  children="VND"
                  error={errors.startAmount}
                  onChange={handleStartAmount}
                ></Input>
                <Input
                  className={style.rangeItem}
                  label={'Đến'}
                  id="endAmount"
                  register={register}
                  error={errors.endAmount}
                  children="VND"
                  onChange={handleEndAmount}
                ></Input>
              </div>

              <div
                className={clsx({
                  [style.hidden]: range,
                })}
              >
                <Input
                  error={errors.amount}
                  label={'Lương'}
                  id="amount"
                  register={register}
                  children="VND"
                  onChange={handleAmount}
                />
              </div>
              <DropdownInput label="Theo" register={register} listData={salary.times} id="time" />
            </div>
          </fieldset>
          {checkBox && (
            <Checkbox
              register={register}
              label="Tôi chọn không bao gồm thông tin thanh toán. Tôi hiểu rằng những công việc không có loại thông tin này sẽ nhận được ít hồ sơ chất lượng hơn."
              value={'nothing'}
              data="noneSalary"
              onChange={handleNoneSalary}
            />
          )}
        </InputContainer>

        <BtnControl handleClick={handleClick} />
      </form>
    </div>
  )
}

export default Salary
