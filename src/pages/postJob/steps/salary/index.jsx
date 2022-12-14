import React from 'react'
import { BtnControl } from '../job'
import { InputContainer } from '../job'
const Salary = ({ handleClick }) => {
  return (
    <div>
      <form>
        <InputContainer></InputContainer>
        <BtnControl handleClick={handleClick} isValid={true} />
      </form>
    </div>
  )
}

export default Salary
