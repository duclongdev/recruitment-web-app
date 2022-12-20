import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card, Col, Form, Input, Row, Button } from 'antd'

const Employee = () => {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  console.log(user)
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
        >
          <Form.Item
            label="Họ tên"
            name="name"
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
          <Form.Item name="position" label="Vị trí" initialValue={user.position}>
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

          <Row>
            <Col span={18} style={{ textAlign: 'right' }}>
              <Button type="primary">Lưu thay đổi</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default Employee
