import { createContext, useContext, useState } from 'react'

const StepperContext = createContext({ postData: '', setPostData: null })

export function UseContextProvider({ children }) {
  const [postData, setPostData] = useState('')

  return (
    <StepperContext.Provider value={{ postData, setPostData }}>{children}</StepperContext.Provider>
  )
}

export function postStepContext() {
  const { postData, setPostData } = useContext(StepperContext)

  return { postData, setPostData }
}
