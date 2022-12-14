import React from 'react'
import { BtnControl } from '../job'

const Preview = ({ handleClick }) => {
  return (
    <div>
      <BtnControl handleClick={handleClick} isValid={true} />
      Preview
    </div>
  )
}

export default Preview
