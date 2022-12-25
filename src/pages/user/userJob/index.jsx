import React, { useState } from 'react'
import style from './style.module.scss'
import clsx from 'clsx'
import noSaved from '../../../../public/assets/noSaved.svg'
import noCompleted from '../../../../public/assets/noCompleted.svg'
import noApplied from '../../../../public/assets/noApplied.svg'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom'

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

const Saved = () => {
  const data = []
  return (
    <div>
      {data.length === 0 ? (
        <NoneData icon={noSaved} description="Chưa có công việc nào được lưu" />
      ) : (
        <div>co data</div>
      )}
    </div>
  )
}

const Applied = () => {
  const data = []
  return (
    <div>
      {data.length === 0 ? (
        <NoneData icon={noApplied} description="Chưa ứng tuyển công việc nào" />
      ) : (
        <div>co data</div>
      )}
    </div>
  )
}

const Completed = () => {
  const data = []
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
  return (
    <div className={style.body}>
      {display === 'Đã lưu' ? <Saved /> : display === 'Ứng tuyển' ? <Applied /> : <Completed />}
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
