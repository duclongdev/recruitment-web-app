import React, { useState } from 'react'
import style from './style.module.scss'
import { UseContextProvider } from '../../utils/MultiFormProvider'
import { Final, Info, Job, Preview } from './steps'
import Stepper from './stepper'
import StepperControl from './StepperControl'
const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = ['Account Information', 'Personal Details', 'Payment', 'Complete']

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Info />
      case 2:
        return <Job />
      case 3:
        return <Preview />
      case 4:
        return <Final />
      default:
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep
    direction === 'next' ? newStep++ : newStep--
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
  }

  return (
    <div className={style.postJob}>
      <div className={style.stepper} style={{ marginBottom: '200px' }}>
        <Stepper steps={steps} currentStep={currentStep} />
        <div>
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>
      {currentStep !== steps.length && (
        <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} />
      )}
    </div>
  )
}

export default PostJob
