import React, { useState } from 'react'
import style from './style.module.scss'
import { UseContextProvider } from '../../utils/MultiFormProvider'
import { Final, Info, Job, Preview, JobDetail } from './steps'
import Stepper from './stepper'
import StepperControl from './stepperControl'
import clsx from 'clsx'
import Salary from './steps/salary'
import Description from './steps/description'
const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    'Account Information',
    'Job Overview',
    'Job Detail',
    'Salary',
    'Description',
    'Final',
  ]

  const handleClick = (direction) => {
    let newStep = currentStep
    direction === 'next' ? newStep++ : newStep--
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
  }
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Info handleClick={handleClick} />
      case 2:
        return <Job handleClick={handleClick} />
      case 3:
        return <JobDetail handleClick={handleClick} />
      case 4:
        return <Salary handleClick={handleClick} />
      case 5:
        return <Description handleClick={handleClick} />
      case 6:
        return <Final handleClick={handleClick} />
      default:
    }
  }

  return (
    <div className={style.postJob}>
      <Stepper steps={steps} currentStep={currentStep} />
      <div className={clsx(currentStep !== 1 ? style.stepper : null)}>
        <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
      </div>
      {/* {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
          className={style.hi}
        />
      )} */}
    </div>
  )
}

export default PostJob
