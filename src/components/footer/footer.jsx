import React from 'react'
import style from './footer.module.scss'
import { Button } from 'antd'
const Footer = () => {
  return (
    <div className={style.footer_container}>
      <div className={style.footer_grid}>
        <li>
          <a href="#">Trung tâm bảo mật</a>
        </li>
        <li>
          <a href="#">Cookie</a>
        </li>
        <li>
          <a href="#">Quyền riêng tư</a>
        </li>
        <li>
          <a href="#">Điều khoản</a>
        </li>
      </div>
      <div className={style.cv_container}>
        <h3 style={{ fontSize: '18px' }}>Dễ dàng ứng tuyển việc làm</h3>
        <Button type="primary" size="large">
          Tạo CV của bạn
        </Button>
      </div>
    </div>
  )
}

export default Footer
