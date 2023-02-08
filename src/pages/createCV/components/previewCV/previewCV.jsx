import { Avatar, Col, Divider, Drawer, List, Row } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AimOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import './previewCV.scss'
const DescriptionItem = ({ title, content, reactNode }) => (
  <div className="site-description-item-profile-wrapper">
    {!reactNode ? (
      <span className="site-description-item-profile-p-label">{title}: </span>
    ) : (
      <span style={{ fontSize: 20 }}>{reactNode} : </span>
    )}

    <span style={{ fontSize: `${reactNode ? '18px' : '16px'}` }}>{content}</span>
  </div>
)
const PreviewCV = ({ data }) => {
  const dataCV = useSelector((state) => state.cv)
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <List
        dataSource={[
          {
            id: 1,
            name: 'l',
          },
        ]}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={showDrawer} key={`a-${item.id}`}>
                Xem CV
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a href="https://ant.design/index-cn">{item.name}</a>}
              description="CV của bạn"
            />
          </List.Item>
        )}
      />
      <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          Curriculum Vitae
        </p>
        <div
          className="site-description-item-profile-p"
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'blueviolet',
            padding: 20,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <span style={{ marginBottom: 20, fontSize: '30px', color: 'white' }}>
            {dataCV.info.username}
          </span>
          <span style={{ fontSize: 20, fontWeight: 'bold', color: 'orange' }}>
            {dataCV.info.position}
          </span>
        </div>
        <Divider />
        <p style={{ fontSize: 24, fontWeight: 'bold' }} className="site-description-item-profile-p">
          Thông tin cá nhân
        </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Row>
              <Col>
                <DescriptionItem
                  title="Số điện thoại"
                  content={dataCV.personalInformation.phoneNumber}
                  reactNode={<PhoneOutlined />}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <DescriptionItem
                  title="Email"
                  content={dataCV.personalInformation.email}
                  reactNode={<MailOutlined />}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <DescriptionItem
                  title="address"
                  content={dataCV.personalInformation.address}
                  reactNode={<AimOutlined />}
                />
              </Col>
            </Row>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://th.bing.com/th/id/OIP.W8apTKARTqVhmLzMCisNmAHaEs?pid=ImgDet&rs=1"
              alt=""
              width={200}
              height={200}
            />
          </div>
        </div>

        <Divider />
        <p style={{ fontSize: 24, fontWeight: 'bold' }} className="site-description-item-profile-p">
          Học vấn
        </p>
        {dataCV.education &&
          dataCV.education?.educations?.map((item, index) => (
            <Row key={index}>
              <Col span={24}>
                <DescriptionItem title="Trình độ học vấn" content={item} />
              </Col>
            </Row>
          ))}

        <Divider />
        <p style={{ fontSize: 24, fontWeight: 'bold' }} className="site-description-item-profile-p">
          Kinh nghiệm làm việc
        </p>
        {dataCV.exp &&
          dataCV.exp?.experience?.map((item, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <Row>
                <Col span={24}>
                  <DescriptionItem title="Công ty" content={item.company} />
                </Col>
              </Row>
              {item.year ? (
                <Row>
                  <Col span={24}>
                    <DescriptionItem title="Từ năm" content={item.year} />
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col span={24}>
                  <DescriptionItem title="Mô tả" content={item.description} />
                </Col>
              </Row>
            </div>
          ))}
        <Divider />
        <p style={{ fontSize: 24, fontWeight: 'bold' }} className="site-description-item-profile-p">
          Kĩ năng / sở thích
        </p>
        {dataCV.skills &&
          dataCV.skills?.skills?.map((item, index) => (
            <Row key={index}>
              <Col span={24}>
                <DescriptionItem title="Kĩ năng" content={item?.skill} />
              </Col>
            </Row>
          ))}
      </Drawer>
    </>
  )
}
export default PreviewCV
