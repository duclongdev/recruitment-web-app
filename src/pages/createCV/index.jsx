import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Empty, message, Progress, Steps, theme, Tooltip } from 'antd'
import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Education from './components/education/education'
import Experience from './components/experience/experience'
import NameCV from './components/nameCV/nameCV'
import PersonalInformation from './components/personalInformation/personalInformation'
import PreviewCV from './components/previewCV/previewCV'
import Skills from './components/skills/skills'

const steps = [
  {
    title: 'Thông tin CV',
    content: 'Thông tin CV',
  },
  {
    title: 'Thông tin cá nhân',
    content: 'Thông tin',
  },
  {
    title: 'Học vấn',
    content: 'Học vấn',
  },
  {
    title: 'Kinh nghiệm',
    content: 'Kinh nghiệm',
  },
  {
    title: 'Kỹ năng',
    content: 'Kỹ năng',
  },
]

const CreateCV = () => {
  const [percent, setPercent] = useState(0)
  const button = useRef(null)
  const [changeState, setChangeState] = useState(false)
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const [data, setData] = useState([])
  const dataCVInfo = useSelector((state) => state.cv.info)
  const dataCVPersonalInfo = useSelector((state) => state.cv.personalInformation)
  const dataCVEducation = useSelector((state) => state.cv.education)
  const dataCVExp = useSelector((state) => state.cv.exp)
  const dataCVSkills = useSelector((state) => state.cv.skills)
  const next = () => {
    button.current.click()
    if (current === 0 && dataCVInfo.isValidate) {
      setCurrent(current + 1)
      setPercent((prev) => prev + 20)
    } else if (current === 1 && dataCVPersonalInfo.isValidate) {
      setCurrent(current + 1)
      setPercent((prev) => prev + 20)
    } else if (current === 2 && dataCVEducation.isValidate) {
      setCurrent(current + 1)
      setPercent((prev) => prev + 20)
    } else if (current === 3 && dataCVExp.isValidate) {
      setCurrent(current + 1)
      setPercent((prev) => prev + 20)
    }
  }
  const prev = () => {
    setPercent((prev) => prev - 20)
    setCurrent(current - 1)
  }
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))
  const contentStyle = {
    minHeight: '150px',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '20%' }}>
          <PreviewCV data={data} />
        </div>

        <div style={{ width: '80%', padding: '20px', position: 'relative' }}>
          <div
            style={{
              width: '100%',
            }}
          >
            <div>
              <Card>
                {data.length != 0 ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      style={{
                        zIndex: 10,
                        width: '100%',
                        maxWidth: 400,
                        position: 'relative',
                      }}
                      src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ"
                      alt="示例图片"
                    />
                  </div>
                ) : changeState ? (
                  <>
                    <Tooltip title="Trở về">
                      <Button
                        onClick={() => {
                          setChangeState((prev) => !prev)
                        }}
                        style={{ marginBottom: 16 }}
                        shape="circle"
                        icon={<ArrowLeftOutlined />}
                      />
                    </Tooltip>
                    <div style={{ marginBottom: 16, textAlign: 'center' }}>
                      <Progress type="dashboard" percent={percent} gapDegree={30} />
                    </div>

                    <Steps current={current} items={items} />
                    <div style={contentStyle}>
                      <Card>
                        <NameCV data={dataCVInfo} ref={button} />
                        {current > 0 && (
                          <PersonalInformation data={dataCVPersonalInfo} ref={button} />
                        )}

                        {current > 1 && (
                          <div>
                            <Divider
                              style={{ color: '#FF8000', fontWeight: 'bold' }}
                              orientation="left"
                            >
                              Phần học vấn
                            </Divider>
                            <Education data={dataCVEducation} ref={button} />
                          </div>
                        )}

                        {current > 2 && (
                          <div>
                            <Divider
                              style={{ color: '#FF8000', fontWeight: 'bold' }}
                              orientation="left"
                            >
                              Phần kinh nghiệm
                            </Divider>
                            <Experience data={dataCVExp} ref={button} />
                          </div>
                        )}

                        {current > 3 && (
                          <div>
                            <Divider
                              style={{ color: '#FF8000', fontWeight: 'bold' }}
                              orientation="left"
                            >
                              Phần kĩ năng
                            </Divider>
                            <Skills data={dataCVSkills} ref={button} />
                          </div>
                        )}
                      </Card>
                    </div>
                    <div
                      style={{
                        marginTop: 24,
                      }}
                    >
                      {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                          Tiếp tục
                        </Button>
                      )}
                      {current === steps.length - 1 && (
                        <Button
                          type="primary"
                          onClick={() => {
                            button.current.click()
                            if (current === 4 && dataCVSkills.isValidate) {
                              setCurrent(current + 1)
                              setPercent((prev) => prev + 20)
                              message.success('Tạo CV của bạn thành công!')
                              setTimeout(() => {
                                setData([
                                  ...data,
                                  {
                                    id: 1,
                                    name: 'l',
                                  },
                                ])
                              }, 3000)
                            }
                          }}
                        >
                          Hoàn thành
                        </Button>
                      )}
                      {current > 0 && (
                        <Button
                          style={{
                            margin: '0 8px',
                          }}
                          onClick={() => prev()}
                        >
                          Trở về
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 60,
                    }}
                    description={
                      <span style={{ fontSize: '30px' }}>
                        Bạn chưa có <a href="#">CV ?</a>
                      </span>
                    }
                  >
                    <Button
                      onClick={() => {
                        setChangeState((prev) => !prev)
                      }}
                      type="primary"
                    >
                      Tạo CV
                    </Button>
                  </Empty>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateCV
