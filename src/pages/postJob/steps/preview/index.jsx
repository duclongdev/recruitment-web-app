import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../../../components/Button'
import { closeModal } from '../../../../redux/modalSlice'
import { BtnControl } from '../job'
import style from './style.module.scss'

const Header = () => (
  <div className={style.preview__header}>
    <img src="assets/previewHeader.svg" alt="" />
    <div className={style.preview__header__title}>
      <span style={{ fontWeight: '600' }}>
        Đây là bản xem trước của những gì mọi người có thể thấy
      </span>
      <span>Tin tuyển dụng của bạn có thể trông hơi khác khi đăng trực tuyến.</span>
    </div>
  </div>
)

const Body = () => (
  <div className={style.preview__body}>
    <div className={style.main}>
      <div className={style.main__header}>
        <div className={style.main__header__item}>
          <h2>Chức vụ</h2>
          <span className={style.main__header__bot}>Địa chỉ tuyển dụng</span>
          <div className={style.main__header__groupControl}>
            <Button title="Ứng tuyển ngay" />
          </div>
        </div>
      </div>
      <div className={style.main__body}></div>
    </div>
  </div>
)

const Preview = () => {
  const dispatch = useDispatch()
  return (
    <div className={style.container}>
      <div className={style.preview}>
        <Header />
        <Body />
        <div className={style.preview__bot}>
          <Button title="Đóng" onClick={() => dispatch(closeModal())} className={style.closeBtn} />
        </div>
      </div>
    </div>
  )
}

export default Preview
