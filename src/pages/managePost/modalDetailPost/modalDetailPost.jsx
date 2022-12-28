import React, { useState } from 'react'
import { Button, Modal, Typography, Card, Avatar, Row, Col } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
const { Meta } = Card
const { Title, Paragraph, Text, Link } = Typography
const style = {
  padding: '8px 0',
}
const ModalDetailPost = ({ show, setShow, item }) => {
  const handleOk = () => {
    setShow(false)
  }
  const handleCancel = () => {
    setShow(false)
  }
  return (
    <>
      <Modal title="Chi tiết" open={show} onOk={handleOk} onCancel={handleCancel} width={700}>
        <Typography>
          <Title>{item?.job.jobName}</Title>
        </Typography>
        <Typography>{item?.job.location}</Typography>
        <Typography>{item?.job.userId}</Typography>
        <Typography>{Date(item?.job.createdAt)}</Typography>
        <Typography>{Date(item?.job.updatedAt)}</Typography>
        <Typography>Số người ứng tuyển: {item?.letter.length}</Typography>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
          }}
        >
          {item?.letter &&
            item?.letter.map((element) => (
              <Col className="gutter-row" span={8}>
                <div style={style}>
                  <Card
                    style={{
                      width: 200,
                      marginTop: 15,
                    }}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src={element.infoUser?.photoURL} />}
                      title={element.infoUser?.fullName}
                      description={element.infoUser?.someDescription}
                    />
                  </Card>
                </div>
              </Col>
            ))}
        </Row>
      </Modal>
    </>
  )
}
export default ModalDetailPost
