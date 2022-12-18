import React, { useEffect, useRef } from 'react'
import style from './style.module.scss'
import { postStepContext } from '../../../../utils/MultiFormProvider'
import { Button } from '../../../../components'
import Lottie from 'lottie-web'
import { useNavigate } from 'react-router-dom'
import doneAnimation from '../../../../assets/animations/done.json'

const Final = () => {
  const navigate = useNavigate()
  const container = useRef(null)
  const { postData } = postStepContext()
  console.log('render')
  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: doneAnimation,
    })
    return () => instance.destroy()
  }, [])

  console.log(postData)
  const navigateHome = () => {
    navigate('/', { replace: true })
  }
  return (
    <div className={style.final}>
      <div className={style.container} ref={container}></div>
      <div className={style.description}>Bài tuyển dụng của bạn đã được đăng</div>
      <Button title="Quay về trang chủ" onClick={navigateHome} />
    </div>
  )
}

export default Final
