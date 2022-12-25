import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
const CreateCV = () => {
  const [fileList, setFileList] = useState([])
  const [date, setDate] = useState()
  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
    previewFile: (file) => {
      console.log(file)
    },
  }

  return (
    <>
      <Upload
        listType="picture"
        {...props}
        onChange={(response) => {
          if (response.file.status === undefined) {
            message.success(`${response.file.name} file uploaded successfully`)
          } else if (response.file.status === 'removed') {
            message.error(`${response.file.name} file upload removed.`)
          }
          setDate(response.file.lastModified)
        }}
      >
        {fileList.length == 0 && <Button icon={<UploadOutlined />}>Select File</Button>}
      </Upload>
      {fileList.length > 0 && (
        <div style={{ marginTop: '10px', fontSize: '12px' }}>{date ? Date(date) : ''}</div>
      )}
    </>
  )
}
export default CreateCV
