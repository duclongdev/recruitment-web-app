import { EyeOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, List, Tag } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ModalCustom } from '../components/modal/modal'

const UserAdminPage = () => {
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])
  const user = useSelector((state) => state.user)
  const handleShow = (item) => {
    setShow(true)
    setItem(item)
  }

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Danh sách người dùng</h1>
      <Card>
        <List
          className="demo-loadmore-list"
          loading={user.loading}
          itemLayout="horizontal"
          dataSource={user.list}
          pagination={{
            pageSize: 5,
          }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  onClick={() => {
                    handleShow(item)
                  }}
                  type="dashed"
                  icon={<EyeOutlined />}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.photoURL} />}
                title={
                  <a
                    onClick={() => {
                      handleShow(item)
                    }}
                    href="#"
                  >
                    {item.name}
                  </a>
                }
                description={item.email}
              />
              <Tag color="cyan">{item.role.toLowerCase()}</Tag>
            </List.Item>
          )}
        />
      </Card>
      <ModalCustom show={show} setShow={setShow} item={item} type={'user'} />
    </div>
  )
}

export default UserAdminPage
