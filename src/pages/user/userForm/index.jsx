import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../components/Input'
import style from './style.module.scss'
import { DropdownInput } from '../../postJob/steps/jobDetail'
import Button from '../../../components/Button'
import locationData from '../../../assets/mockData/location.json'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { userAPI } from '../../../api/user'
import { useDispatch } from 'react-redux'
import { showToastMessage } from '../../../redux/modalSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Textarea = ({ label, register, id }) => {
  return (
    <div className={style.textarea}>
      <label>{label}</label>
      <textarea {...register(id)} rows={8} />
    </div>
  )
}
const validationSchema = yup.object({
  fullName: yup.string().required('Không được để trống phần này'),
})

const UserForm = ({ user }) => {
  const [suggestion, setSuggestion] = useState(user?.address ? user?.address : '')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: user.name,
      email: user.email,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      education: user?.education,
      github: user?.github,
      linkedin: user?.linkedin,
      description: user?.description,
    },
  })
  const dataList = [
    { value: 'elementarySchool', label: 'Tiểu học' },
    { value: 'middleSchool', label: 'Trung học' },
    { value: 'hightSchool', label: 'Cấp 3' },
    { value: 'bachelor', label: 'Cử nhân' },
    { value: 'vocational', label: 'Học nghề' },
    { value: 'master', label: 'Thạc sĩ' },
    { value: 'doctorate', label: 'Tiến sĩ' },
  ]
  const onSubmit = (data) => {
    const userId = user._id
    const userInfo = data
    const payload = {
      userId,
      userInfo,
    }
    userAPI.update(payload).then((response) => {
      toast.success('Thay đổi thông tin thành công', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    })
    console.log(payload)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <div className={style.header}>
        <h1>Thông tin chi tiết</h1>
        <div>
          <Button type="button" title={'Reset'} />
        </div>
      </div>
      <div className={style.formContainer}>
        <div className={style.left}>
          <Input register={register} id="fullName" label="Họ và tên" error={errors.fullName} />
          <Input register={register} id="email" label="Địa chỉ email" />
          <Input register={register} id="phoneNumber" label="Số điện thoại" />
          <Input
            register={register}
            id="address"
            label="Địa chỉ"
            onChange={(e) => setSuggestion(e.target.value)}
            value={suggestion}
          />
          <div className={style.suggestion}>
            <div className={style.suggestion__container}>
              {locationData
                .filter((item) => {
                  const suggestItem = suggestion.toLowerCase()
                  const locationItem = item.name.toLowerCase()
                  return (
                    suggestItem &&
                    locationItem.startsWith(suggestItem) &&
                    locationItem != suggestItem
                  )
                })
                .map((item) => (
                  <div onClick={() => setSuggestion(item.name)} className={style.suggestion__item}>
                    {item.name}
                  </div>
                ))}
            </div>
          </div>
          <DropdownInput
            register={register}
            id={'education'}
            label={'Học vấn'}
            listData={dataList}
          />
        </div>
        <div className={style.right}>
          <div>
            <Input register={register} id="github" label="GitHub link" />
            <Input register={register} id="linkedin" label="Linkedin link" />
            <Textarea register={register} label={'Mô tả về bản thân'} id="description" />
          </div>
          <Button title="Lưu" />
        </div>
      </div>
    </form>
  )
}
export default UserForm
