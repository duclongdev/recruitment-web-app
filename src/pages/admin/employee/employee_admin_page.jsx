import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Card, List, Tag } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ModalCustom } from '../components/modal/modal'

const EmployeeAdminPage = () => {
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])
  const employee = useSelector((state) => state.employee)

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
          loading={employee.loading}
          itemLayout="horizontal"
          dataSource={employee.list}
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
