import { AimOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import React, { forwardRef, useEffect } from 'react'

import { Button, DatePicker, Divider, Form, Input } from 'antd'
import './personalInformation.scss'
import { setCVDataPersonalInfo } from '../../../../redux/CVSlice'
import { useDispatch } from 'react-redux'

const PersonalInformation = forwardRef(({ data }, ref) => {
  const [form] = Form.useForm()
  const phoneNumber = Form.useWatch('phoneNumber', form)
  const email = Form.useWatch('email', form)
  const address = Form.useWatch('address', form)
  const dispatch = useDispatch()
  const onFinish = (values) => {
    const val = form.getFieldsValue('')
    dispatch(
      setCVDataPersonalInfo({
        ...val,
        isValidate: val.username ? true : false,
      })
    )
  }

  useEffect(() => {
    const val = form.getFieldsValue('')
    dispatch(
      setCVDataPersonalInfo({
        ...val,
        isValidate: val.address && val.phoneNumber && val.email ? true : false,
      })
    )
  }, [address, phoneNumber, email])
  return (
    <>
      <Divider style={{ color: '#FF8000', fontWeight: 'bold' }} orientation="left">
        Phần thông tin cá nhân
      </Divider>
      <div>
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          onFinish={onFinish}
          size="large"
          style={{
            maxWidth: 800,
          }}
        >
          <Form.Item
            label={<PhoneOutlined style={{ fontSize: '20px' }} />}
            name="phoneNumber"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Vui lòng điền số điện thoại của bạn !',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<MailOutlined style={{ fontSize: '20px' }} />}
            name="email"
            hasFeedback
            rules={[
              {
                type: 'email',
                message: 'Email không hợp lệ!',
              },
              {
                required: true,
                message: 'Vui lòng nhập email của bạn!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<AimOutlined style={{ fontSize: '20px' }} />}
            name="address"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Xin vui lòng điền địa chỉ của bạn !',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button style={{ display: 'none' }} ref={ref} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  )
})

export default PersonalInformation
