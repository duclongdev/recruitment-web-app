import React, { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import clsx from 'clsx'

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([])
  const stepsRef = useRef()

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps]
    let count = 0
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: false,
        }
        count++
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        }
        count++
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        }
        count++
      }
    }

    return newSteps
  }

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    )

    stepsRef.current = stepsState
    const current = updateStep(currentStep - 1, stepsRef.current)
    setNewStep(current)
  }, [steps, currentStep])

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={clsx(style.stepsDisplay, {
          [style.fullWidth]: index !== newStep.length - 1,
        })}
      >
        {/* <div className={style.container}>
          <div className={clsx(style.selected, step.selected ? style.selected__true : '')}>
            {step.completed ? <span className={style.checked}>&#10003;</span> : index + 1}
          </div>
          <div
            className={clsx(
              style.description,
              step.highlighted ? style.description__highlighted : style.description__nonHighlighted
            )}
          >
            {step.description}
          </div>
        </div> */}
        <div
          className={clsx(
            style.line,
            step.completed ? style.line__completed : style.line__noneCompleted
          )}
        ></div>
      </div>
    )
  })
  return <div className={style.stepper}>{stepsDisplay}</div>
}

export default Stepper
