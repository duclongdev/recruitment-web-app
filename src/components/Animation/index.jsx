import React, { useEffect, useRef } from 'react'

import Lottie from 'lottie-web'
import signin from '../../assets/animations/signin.json'
const Animation = ({ animationData = signin }) => {
  const container = useRef(null)

  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    })
    return () => instance.destroy()
  }, [])

  return (
    <div>
      <div ref={container}></div>
      <div></div>
    </div>
  )
}

export default Animation
