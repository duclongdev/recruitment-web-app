import { Form, Modal, Upload, Input, Button } from 'antd'
import React, { useEffect, useState, useRef, forwardRef } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setCVDataInfo } from '../../../../redux/CVSlice'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
const NameCV = forwardRef(({ data }, ref) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState(data.avatar)
  const [form] = Form.useForm()
  const userName = Form.useWatch('username', form)
  const dispatch = useDispatch()

  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const onFinish = (values) => {
    const val = form.getFieldsValue('')
    dispatch(
      setCVDataInfo({
        ...val,
        avatar: fileList,
        isValidate: val.username ? true : false,
      })
    )
  }

  useEffect(() => {
    const val = form.getFieldsValue('')
    dispatch(
      setCVDataInfo({
        ...val,
        avatar: fileList,
        isValidate: val.username ? true : false,
      })
    )
  }, [userName])

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '50%', textAlign: 'left' }}>
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên"
            name="username"
            hasFeedback
            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn !' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Vị trí" name="position">
            <Input />
          </Form.Item>

          <Button style={{ display: 'none' }} ref={ref} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length === 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  )
})

export default NameCV
