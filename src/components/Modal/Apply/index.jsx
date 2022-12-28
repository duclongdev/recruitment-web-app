import React from 'react'
import style from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { closeApplyModal } from '../../../redux/modalSlice'
import { selectJob } from '../../../redux/jobSlice'
import draftToHtml from 'draftjs-to-html'
import { CloseIcon } from '../../../assets/icon'
import { Button } from '../../../components'
import { useForm } from 'react-hook-form'
import Input from '../../Input'
import { DropdownInput } from '../../../pages/postJob/steps/jobDetail'
import { selectUser } from '../../../redux/usrSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { userAPI } from '../../../api/user'
import { showToastMessage } from '../../../redux/modalSlice'

const Header = () => {
  const dispatch = useDispatch()
  const handleCloseModal = () => {
    dispatch(closeApplyModal())
  }
  return (
    <div className={style.header}>
      <div className={style.header__title}>
        <h3>Form ứng tuyển công việc</h3>
      </div>
      <div className={style.header__close} onClick={handleCloseModal}>
        <CloseIcon />
      </div>
    </div>
  )
}

const TextArea = ({ title, register, id }) => {
  return (
    <div className={style.textarea}>
      <label htmlFor={id}>{title}</label>
      <br />
      <textarea rows="5" {...register(id)} id={id} />
    </div>
  )
}

const validationSchema = yup.object({
  fullName: yup.string().required('Không được để trống phần này'),
  email: yup.string().required('Vui lòng nhập địa chỉ eemail'),
  phoneNumber: yup.string().required('Vui lòng nhập số điện thoại của bạn'),
  address: yup.string().required('Vui lòng điền nơi mà bạn đang sinh sống'),
  education: yup.string().required('Vui lòng không để trống phần này'),
  experience: yup.string().required('Vui lòng không để trống phần này'),
})

const InfoUser = ({ jobId, deleteLetterId }) => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: user.name,
      email: user.email,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      education: user?.education,
    },
  })
  const onSubmit = (data) => {
    const payload = {
      userId: user._id,
      jobId: jobId,
      deleteLetterId: deleteLetterId,
      infoUser: { ...data, photoURL: user.photoURL },
    }
    userAPI.applyJob(payload)
    dispatch(showToastMessage())
    dispatch(closeApplyModal())
  }
  const dataList = [
    { value: '', label: 'Vui lòng chọn đúng cấp học' },
    { value: 'elementarySchool', label: 'Tiểu học' },
    { value: 'middleSchool', label: 'Trung học' },
    { value: 'hightSchool', label: 'Cấp 3' },
    { value: 'bachelor', label: 'Cử nhân' },
    { value: 'vocational', label: 'Học nghề' },
    { value: 'master', label: 'Thạc sĩ' },
    { value: 'doctorate', label: 'Tiến sĩ' },
  ]

  const amountOfexpYear = [
    { value: '', label: 'Chọn số năm kinh nghiệm' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ]
  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.form__container}>
        <div className={style.infoUser}>
          <Input
            register={register}
            id={'fullName'}
            label={'Họ và tên'}
            required
            error={errors.fullName}
          />
          <Input register={register} id={'email'} label={'Email'} required error={errors.email} />
          <Input
            register={register}
            id={'phoneNumber'}
            label={'Số điện thoại'}
            required
            error={errors.phoneNumber}
          />
          <Input
            register={register}
            id={'address'}
            label={'Hiện tại bạn đang sống'}
            required
            error={errors.address}
          />
        </div>
        <div className={style.userDescription}>
          <DropdownInput
            register={register}
            id={'education'}
            label={'Trình độ học vấn cao nhất mà bạn đạt được'}
            required
            listData={dataList}
            error={errors.education}
          />
          <DropdownInput
            listData={amountOfexpYear}
            register={register}
            id={'experience'}
            label={'Số năm kinh nghiệm'}
            required
            error={errors.experience}
          />
          <TextArea title="Mô tả một chút về bản thân" register={register} id="someDescription" />
          <TextArea
            title="Bạn có câu hỏi gì cho nhà tuyển dụng"
            register={register}
            id="questions"
          />
        </div>
      </div>
      <br />
      <Button title="Nộp đơn" />
    </form>
  )
}

const ApplyModal = () => {
  const jobDetail = useSelector(selectJob)
  const data = JSON.parse(jobDetail.jobDescription)
  const marked = draftToHtml(data)
  console.log(jobDetail)
  return (
    <div className={style.container}>
      <div className={style.formInfoUser}>
        <Header />
        <div className={style.formInfoUser__body}>
          <InfoUser jobId={jobDetail._id} deleteLetterId={jobDetail.deleteLetterId} />
        </div>
      </div>
      <div className={style.jobDescription}>
        <div className={style.jobDescription__header}>
          <h3>{jobDetail.jobName}</h3>
          <p>
            {jobDetail.companyName} - {jobDetail.location}
          </p>
        </div>
        <div
          className={style.jobDescription__body}
          dangerouslySetInnerHTML={{ __html: marked }}
        ></div>
      </div>
    </div>
  )
}

export default ApplyModal
