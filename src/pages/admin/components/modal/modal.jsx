import React, { useEffect } from 'react'
import { Button, Form, Input, InputNumber, Modal, Avatar } from 'antd'
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
}
export const ModalCustom = ({ show, setShow, item, type }) => {
  console.log(item)
  const [form] = Form.useForm()
  if (type === 'user') {
    form.setFieldsValue({
      name: item.name,
      email: item.email,
      phoneNumber: item.phoneNumber,
      address: item.address,
      description: item.description,
    })
  } else {
    form.setFieldsValue({
      fullName: item.fullName,
      emailCompany: item.emailCompany,
      phoneNumber: item.phoneNumber,
      address: item.address,
      companyName: item.companyName,
    })
  }

  const handleOk = () => {
    setShow(false)
  }
  return (
    <Modal
      title={`Thông tin ${type === 'user' ? 'người dùng' : 'nhân viên'}`}
      centered
      open={show}
      onOk={handleOk}
      onCancel={handleOk}
      footer={[
        <Button key="back" type="primary" onClick={handleOk}>
          Chấp nhận
        </Button>,
      ]}
    >
      {type === 'user' && (
        <div
          style={{
            marginTop: '10px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Avatar src={item.photoURL} />
        </div>
      )}
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        style={{
          maxWidth: 600,
          marginTop: '30px',
        }}
      >
        <Form.Item name={type === 'user' ? 'name' : 'fullName'} label="Tên">
          <Input />
        </Form.Item>
        <Form.Item
          name={type === 'user' ? 'email' : 'emailCompany'}
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'phoneNumber'} label="Số điện thoại">
          <Input style={{ width: '150px' }} />
        </Form.Item>
        <Form.Item name={'address'} label="Địa chỉ">
          <Input />
        </Form.Item>
        <Form.Item
          name={type === 'user' ? 'description' : 'companyName'}
          label={type === 'user' ? 'Mô tả' : 'Tên công ty'}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}
