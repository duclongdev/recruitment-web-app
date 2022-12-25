import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card, Col, Form, Input, Row, Button, Avatar, Image } from 'antd'

const User = () => {
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
          minHeight: 1000 - 220 - 72,
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
          <Row>
            <Col span={22} style={{ textAlign: 'center' }}>
              <Avatar src={user.photoURL} style={{ width: 80, height: 80, marginBottom: 20 }} />
            </Col>
          </Row>

          <Form.Item
            label="Họ tên"
            name="name"
            rules={[
              {
                required: true,
                message: 'Xin vui lòng nhập tên của bạn!',
              },
            ]}
            initialValue={user.name}
          >
            <Input />
          </Form.Item>
          <Form.Item name="position" label="Vị trí" initialValue={user.role}>
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
            initialValue={user.email}
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

export default User
