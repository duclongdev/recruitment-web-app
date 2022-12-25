import { Button, Card, Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EmployeeAPI } from '../../api/employee'
import CreateCV from '../createCV'

const Employee = () => {
  const user = useSelector((state) => state.user.value)
  const [info, setInfo] = useState()
  const dispatch = useDispatch()

  const handleSave = async (value) => {
    await EmployeeAPI.updateProfile(user._id, value)
  }

  return (
    <div>
      <Card
        title="Hồ sơ người dùng"
        bordered={false}
        style={{
          width: '100%',
          padding: '0px 50px',
        }}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          size="large"
          style={{ margin: 'auto' }}
          onFinish={handleSave}
        >
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Xin vui lòng nhập tên của bạn!',
              },
            ]}
            initialValue={user.fullName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="emailCompany"
            rules={[
              {
                type: 'email',
                message: 'Email không hợp lệ!',
              },
              {
                required: true,
                message: 'Xin vui lòng nhập email!',
              },
            ]}
            initialValue={user.emailCompany}
          >
            <Input />
          </Form.Item>
          <Form.Item name="companyName" label="Tên công ty" initialValue={user.companyName}>
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: 'Xin vui lòng nhập số điện thoại!',
              },
            ]}
            initialValue={user.phoneNumber}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: 'Xin vui lòng nhập địa chỉ!',
              },
            ]}
            initialValue={user.address}
          >
            <Input />
          </Form.Item>
          <Form.Item label="CV của bạn">
            <CreateCV />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Employee
