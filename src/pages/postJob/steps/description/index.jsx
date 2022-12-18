import React, { useState } from 'react'
import { BtnControl, HeaderPostJob, InputContainer } from '../job'
import MyEditor from '../../../../components/MyEditor'
import { useForm } from 'react-hook-form'
import style from './style.module.scss'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Error } from '../../../../components/Input'
import clsx from 'clsx'
import { postStepContext } from '../../../../utils/MultiFormProvider'
import { useDispatch } from 'react-redux'
import { openModal, setDataPostJob } from '../../../../redux/modalSlice'

yup.addMethod(yup.mixed, 'length', function (msg) {
  return this.test({
    name: 'length',
    message: msg,
    test: (value) => value.getCurrentContent().getPlainText().length > 30,
  })
})

const validationSchema = yup.object({
  jobDescription: yup.mixed().length('Yêu cầu phải có ít nhất 30 ký tự'),
})

const Description = ({ handleClick }) => {
  const { postData, setPostData } = postStepContext()
  const [prepare, setPrepare] = useState(false)

  const dispatch = useDispatch()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      jobDescription: postData.jobDescription
        ? EditorState.createWithContent(convertFromRaw(postData.jobDescription))
        : EditorState.createEmpty(),
    },
  })

  const onSubmit = (data) => {
    const jobDescription = convertToRaw(data.jobDescription.getCurrentContent())
    setPostData({ ...postData, jobDescription })
    if (prepare === true) {
      setPostData({ ...postData, jobDescription })
      dispatch(setDataPostJob({ ...postData, jobDescription }))
      console.log(postData)
      dispatch(openModal())
      setPrepare(false)
    } else {
      setPostData({ ...postData, jobDescription })
      if (
        window.confirm(
          'Sau bước này bài viết của bạn sẽ được đăng... Vui lòng xem kỹ trước khi đăng'
        ) === true
      )
        handleClick('next')
    }
  }

  const handlePreview = () => {
    setPrepare(true)
  }

  return (
    <div className={style.description}>
      <HeaderPostJob title="Mô tả công việc" path="assets/teacher.svg" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <label
            className={clsx({
              [style.labelWarning]: errors.jobDescription,
            })}
          >
            Mô tả chi tiết công việc
          </label>
          <div className={style.suggestion}>
            Mô tả trách nhiệm của công việc này, kinh nghiệm làm việc, kỹ năng hoặc trình độ học vấn
            cần thiết.
          </div>
          <MyEditor
            control={control}
            name={'jobDescription'}
            className={clsx({
              [style.warning]: errors.jobDescription,
            })}
          />
          {errors.jobDescription && <Error error={errors.jobDescription} />}
        </InputContainer>
        <BtnControl handleClick={handleClick} handlePreview={handlePreview} showPreview final />
      </form>
    </div>
  )
}

export default Description
