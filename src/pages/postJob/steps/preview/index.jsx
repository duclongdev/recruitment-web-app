import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../../../components/Button'
import { closeModal } from '../../../../redux/modalSlice'

import style from './style.module.scss'
import { useSelector } from 'react-redux'
import { selectDataPostJob } from '../../../../redux/modalSlice'
import draftToHtml from 'draftjs-to-html'
import { getType } from '@reduxjs/toolkit'

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

const Body = ({ data }) => {
  const marked = draftToHtml(data.jobDescription)
  console.log(data)

  const getType = (salaryType) => {
    switch (salaryType) {
      case 'startingAmount':
        return 'Từ'
      case 'maximunAmount':
        return 'Lên tới'
      default:
        return ''
    }
  }

  const getTime = (time) => {
    switch (time) {
      case 'perMonth':
        return 'mỗi tháng'
      case 'perDay':
        return 'mỗi ngày'
      case 'perWeek':
        return 'mỗi tuần'
      case 'perYear':
        return 'mỗi năm'
      default:
        return ''
    }
  }

  const getJobType = (jobType) => {
    switch (jobType) {
      case 'intern':
        return 'Thực tập'
      case 'fullTime':
        return 'Toàn thời gian'
      case 'partTime':
        return 'Bán thời gian'
      case 'temporary':
        return 'Thời vụ'
      case 'permanent':
        return 'Dài hạn'
      default:
        return ''
    }
  }
  return (
    <div className={style.preview__body}>
      <div className={style.main}>
        <div className={style.main__header}>
          <div className={style.main__header__item}>
            <h2>{data.jobBasic.jobName}</h2>
            <span className={style.main__header__bot}>{data.jobBasic.location}</span>
            <div className={style.main__header__groupControl}>
              <Button title="Ứng tuyển ngay" disable className={style.applyDisable} />
            </div>
          </div>
        </div>
        <div className={style.main__body}>
          <div
            className={style.main__body__content}
            dangerouslySetInnerHTML={{ __html: marked }}
          ></div>
          <div className={style.main__body__insights}>
            <h3>Chi tiết công việc</h3>

            {data.salary !== 'noneSalary' ? (
              <div>
                Mức lương:{' '}
                <span>
                  {data.salary.salaryType === 'range' ? (
                    <span>
                      {data.salary.startAmount}₫ - {data.salary.endAmount}₫
                    </span>
                  ) : (
                    <span>
                      {getType(data.salary.salaryType)} {data.salary.amount}₫{' '}
                    </span>
                  )}{' '}
                  <span>{getTime(data.salary.time)}</span>
                </span>
              </div>
            ) : null}
            <div>
              Loại công việc:{' '}
              {data.jobDetail.jobType.map((item, index) => {
                return <span>{getJobType(item)}, </span>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Preview = () => {
  const dispatch = useDispatch()
  const data = useSelector(selectDataPostJob)

  return (
    <div className={style.container}>
      <div className={style.preview}>
        <Header />
        <Body data={data} />
        <div className={style.preview__bot}>
          <Button title="Đóng" onClick={() => dispatch(closeModal())} className={style.closeBtn} />
        </div>
      </div>
    </div>
  )
}

export default Preview
