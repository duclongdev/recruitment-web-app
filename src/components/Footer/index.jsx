import React from 'react'
import style from './style.module.scss'

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.bottom}>
        <div className={style.bottom__content}>
          <div className={style.item}>
            <strong>Về SPACE</strong>
            <ul>
              <li>
                <a>Trang chủ</a>
              </li>
              <li>
                <a>Việc làm</a>
              </li>
              <li>
                <a>Câu hỏi thường gặp</a>
              </li>
              <li>
                <a>Liên hệ</a>
              </li>
            </ul>
          </div>
          <div className={style.item}>
            <strong>Điều khoản chung</strong>
            <ul>
              <li>
                <a> Điều khoản chung </a>
              </li>
              <li>
                <a> Quy định bảo mật </a>
              </li>
              <li>
                <a> Quy chế hoạt động </a>
              </li>
              <li>
                <a> Giải quyết khiếu nại</a>
              </li>
              <li>
                <a> Thoả thuận sử dụng </a>
              </li>
              <li>
                <a> Thông cáo báo chí </a>
              </li>
            </ul>
          </div>
          <div className={style.item}>
            <ul>
              <li>
                Copyright © <a>SPACE JSC</a>
              </li>
              <li>MST: 1703200221566</li>
            </ul>
          </div>
        </div>
        <div>
          <strong>Liên hệ để biết thêm chi tiết tại </strong>
          <br />
          <span>
            Hồ Chí Minh: (+84) 0906 592 672 - Hà Nội: (+84) 0906 592 673 - Email: love@space.com
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
