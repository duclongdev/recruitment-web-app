import { Avatar, List, Tag, Card, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { userAPI } from '../../../api/user'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { ModalCustom } from '../components/modal/modal'

const UserAdminPage = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])
  useEffect(() => {
    userAPI.getAllUser().then((res) => {
      setData(res.data)
      setInitLoading(false)
      console.log(res.data)
    })
  }, [setData])

  const handleShow = (item) => {
    console.log(item)
    setShow(true)
    setItem(item)
  }

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Danh sách người dùng</h1>
      <Card>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={data}
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
