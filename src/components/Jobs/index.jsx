import React from 'react'
import style from './style.module.scss'
import Button from '../Button'
import { HeadIcon } from '../../assets/icon'

const Jobs = ({ listJob }) => {
  return (
    <div className={style.container}>
      <div className={style.listJob}>
        {listJob.map((job, index) => (
          <div key={index} className={style.job}>
            <h3>{job.name}</h3>
            <p>{job.companyName}</p>
            <p>{job.location}</p>
            <ul className={style.job__description}>
              <li>
                Tốt nghiệp cao đẳng trở lên các ngành: Marketing, QTKD, truyền thông báo chí,….
              </li>
              <li>
                Có kỹ năng viết lách, nắm vững các kiến thức chuyên môn về truyền thông và
                marketing.
              </li>
              <li>Yêu thích công việc marketing và có nhiều ý tưởng tốt.</li>
            </ul>
          </div>
        ))}
        <button className={style.moreBtn}>Hiển thị thêm việc làm</button>
      </div>
      <div className={style.jobDetail}>
        <div className={style.jobDetail__header}>
          <h3>[Quận 7] Giám Sát Nhà Hàng Âu - Basta Hiro</h3>
          <p>
            Công ty: <a>M9 Logistics</a>
            <br />
            Địa điểm: Thành phố Hồ Chí Minh
          </p>
          <div className={style.jobDetail__header__buttonContainer}>
            <Button title={'Ứng tuyển ngay'} />
            <button
              style={{
                marginLeft: '20px',
                borderRadius: '10px',
                border: 'none',
                padding: '10px 20px',
              }}
            >
              <HeadIcon />
            </button>
          </div>
        </div>

        <div className={style.jobDetail__body}></div>
      </div>
    </div>
  )
}

export default Jobs
