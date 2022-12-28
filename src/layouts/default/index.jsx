import React from 'react'
import Header from '../../components/Header'
import { Preview } from '../../pages/postJob/steps'
import style from './style.module.scss'
import { selectModal } from '../../redux/modalSlice'
import { selectApplyModal } from '../../redux/modalSlice'
import { useSelector } from 'react-redux'
import ApplyModal from '../../components/Modal/Apply'

const DefaultLayout = ({ children }) => {
  const modal = useSelector(selectModal)
  const applyModal = useSelector(selectApplyModal)
  console.log(applyModal)
  return (
    <div>
      <Header />
      <div>{children}</div>
      {modal && <Preview />}
      {applyModal && <ApplyModal />}
    </div>
  )
}

export default DefaultLayout
