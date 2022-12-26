import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import clsx from 'clsx'
import noSaved from '../../../../public/assets/noSaved.svg'
import noCompleted from '../../../../public/assets/noCompleted.svg'
import noApplied from '../../../../public/assets/noApplied.svg'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import { letterAPI } from '../../../api/letter'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/usrSlice'
import { LogoIcon } from '../../../assets/icon'
import Close from '../../../assets/icon/Close'
import { convertTime } from "../../../components/Jobs"

const Item = ({ label, number = 0, value, onClick }) => {
  return (
    <div
      className={clsx(style.item, {
        [style.focus]: value === label,
      })}
      onClick={onClick}
    >
      {label}
      <span>{number}</span>
    </div>
  )
}
const Header = ({ display, setDisplay }) => {
  return (
    <div className={style.header}>
      <Item label="Đã lưu" value={display} onClick={() => setDisplay('Đã lưu')} />
      <Item label="Ứng tuyển" value={display} onClick={() => setDisplay('Ứng tuyển')} />
      <Item label="Chấp nhận" value={display} onClick={() => setDisplay('Chấp nhận')} />
    </div>
  )
}

const NoneData = ({ icon, description }) => {
  const navigate = useNavigate()

  const backHome = () => {
    console.log('dcm')
    navigate('/', { replace: true })
  }

  return (
    <div className={style.noneData}>
      <img src={icon} alt="" />
      <div className={style.noneData__description}>{description}</div>
      <div className={style.findJob}>
        <label style={{ margin: '20px' }}>Không tìm thấy công việc?</label>
        <Button title="Tìm việc" onClick={backHome} />
      </div>
    </div>
  )
}

const Job = ({ data, display }) => {
  console.log(data)
  return (
    <div className={style.job}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={style.job__logo}>
          <div className={style.job__logo__container}>
            <LogoIcon />
          </div>
        </div>
        <div className={style.job__info}>
          <div className={style.job__info__name}>{data._doc.jobName}</div>
          <div className={style.job__info__companyName}>{data._doc.companyName}</div>
          <div className={style.job__info__location}>{data._doc.location}</div>
          <div className={style.job__info__time}>{convertTime(data.savedTime, display)}</div>
        </div>
      </div>
      <div className={style.job__option}>
        <div>
          {
            display === 'Đã lưu' ? <Button title="Ứng tuyển ngay" /> : display === 'Đã ứng tuyển' ? <Button title={'Đang chờ xử lý...'} disable /> : null
          }

        </div>
        {

          display === 'Đã lưu' && <div className={style.close}>
            <Close />
          </div>
        }

      </div>
    </div >
  )
}

const Saved = ({ data }) => {
  return (
    <div>
      {data.length === 0 ? (
        <NoneData icon={noSaved} description="Chưa có công việc nào được lưu" />
      ) : (
        <div>
          {data.map((item) => {
            return (
              <div key={item._id}>
                <Job data={item} display={'Đã lưu'} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const Applied = ({ data }) => {

  return (
    <div>
      {data.length === 0 ? (
        <NoneData icon={noApplied} description="Chưa ứng tuyển công việc nào" />
      ) : (
        <div>
          {data.map((item) => {
            return (
              <div key={item._id}>
                <Job data={item} display={'Đã ứng tuyển'} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const Achieved = ({ data }) => {

  return (
    <div>
      {data.length === 0 ? (
        <NoneData icon={noCompleted} description="Chưa được chấp nhận công việc nào" />
      ) : (
        <div>co data</div>
      )}
    </div>
  )
}

const Body = ({ display }) => {
  const user = useSelector(selectUser)
  const userId = user._id
  const [savedData, setSavedData] = useState([])
  const [applyData, setApplyData] = useState([])
  const [achievedData, setAchievedData] = useState([])
  useEffect(() => {
    letterAPI.getSavedJobByUserId(userId).then((response) => {
      setSavedData(response.data)
    })
    letterAPI.getApplyJobByUserId(userId).then((response) => {
      setApplyData(response.data)
    })
    letterAPI.getAchievedJobByUserId(userId).then((response) => {
      setAchievedData(response.data)
    })
  }, [])
  return (
    <div className={style.body}>
      {display === 'Đã lưu' ? (
        <Saved data={savedData} />
      ) : display === 'Ứng tuyển' ? (
        <Applied data={applyData} />
      ) : (
        <Achieved data={achievedData} />
      )}
    </div>
  )
}

const UserJob = () => {
  const [display, setDisplay] = useState('Đã lưu')
  return (
    <div className={style.userJob}>
      <Header display={display} setDisplay={setDisplay} />
      <Body display={display} />
    </div>
  )
}

export default UserJob
