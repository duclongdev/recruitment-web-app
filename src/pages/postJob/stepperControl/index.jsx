import React from 'react'
import style from './style.module.scss'
import Button from '../../../components/Button'
import clsx from 'clsx'

const StepperControl = ({ handleClick, currentStep, steps, className }) => {
  return (
    <div className={className}>
      <Button
        title="Quay lại"
        onClick={() => handleClick()}
        className={clsx(currentStep === 1 ? style.notAllow : '', style.btn)}
      />
      <Button
        title={currentStep === steps.length - 1 ? 'Hoàn thành' : 'Lưu và tiếp tục'}
        onClick={() => handleClick('next')}
        className={style.btn}
      />
    </div>
  )
}

export default StepperControl
