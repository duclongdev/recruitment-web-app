import React, { useEffect, useState } from 'react'
import { EmployeeAPI } from '../../../api/employee'
import { Avatar, List, Tag, Card, Typography, Button } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { ModalCustom } from '../components/modal/modal'

const EmployeeAdminPage = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])
  useEffect(() => {
    EmployeeAPI.getAllEmployee().then((res) => {
      setData(res.data)
      setInitLoading(false)
      console.log(res.data)
    })
  }, [setData])

  const handleShow = (item) => {
    setShow(true)
    setItem(item)
  }
  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Danh sách nhân viên</h1>
      <Card>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={data}
          pagination={{
            pageSize: 4,
          }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="primary" icon={<EditOutlined />} />,
                <Button type="primary" icon={<DeleteOutlined />} danger />,
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
                title={
                  <div>
                    <a
                      onClick={() => {
                        handleShow(item)
                      }}
                      style={{ marginRight: '10px', fontSize: '17px' }}
                      href="#"
                    >
                      {item.fullName}
                    </a>
                    <span style={{ fontSize: '11px' }}>{item.companyName}</span>
                  </div>
                }
                description={item.emailCompany}
              />
              <Tag color="#87d068">{item.phoneNumber}</Tag>
              <Tag color="red">{item.role.toLowerCase()}</Tag>
            </List.Item>
          )}
        />
      </Card>
      <ModalCustom show={show} setShow={setShow} item={item} type={'employee'} />
    </div>
  )
}

export default EmployeeAdminPage
