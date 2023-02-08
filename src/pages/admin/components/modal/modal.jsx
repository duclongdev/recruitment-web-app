import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Avatar,
  Collapse,
  Tooltip,
  Tag,
  Table,
  Space,
} from 'antd'
import { letterAPI } from '../../../../api/letter'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
const { Panel } = Collapse
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
}

export const ModalCustom = ({ show, setShow, item, type }) => {
  const [listJobs, setList] = useState()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)
  const [showCollapse, setShowCollapse] = useState([])

  useEffect(() => {
    type === 'employee'
      ? letterAPI.getListLetters(item._id).then((res) => {
          if (res) {
            setList(res.data)
            console.log(res.data)
          }
        })
      : null
  }, [show, item])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record.job[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const columns = [
    {
      title: 'Tên công việc',
      dataIndex: ['job', 'jobName'],
      key: 'jobName',
      editable: true,
      ellipsis: true,
      textWrap: 'word-break',
      ...getColumnSearchProps('jobName'),
      sorter: (a, b) => a.job.jobName.length - b.job.jobName.length,
      sortDirections: ['descend', 'ascend'],
      render: (jobName) => (
        <Tooltip placement="topLeft" title={jobName}>
          {jobName}
        </Tooltip>
      ),
    },

    {
      title: 'Địa điểm',
      dataIndex: ['job', 'location'],
      key: 'location',
      editable: true,
      ellipsis: true,
      ...getColumnSearchProps('location'),
      render: (location) => (
        <Tooltip placement="topLeft" title={location}>
          {location}
        </Tooltip>
      ),
    },
  ]

  const [form] = Form.useForm()
  if (type === 'user') {
    form.setFieldsValue({
      name: item.name,
      email: item.email,
      phoneNumber: item.phoneNumber,
      address: item.address,
      description: item.description,
    })
  } else {
    form.setFieldsValue({
      fullName: item.fullName,
      emailCompany: item.emailCompany,
      phoneNumber: item.phoneNumber,
      address: item.address,
      companyName: item.companyName,
    })
  }

  const handleOk = () => {
    setShow(false)
    setShowCollapse([])
  }
  return (
    <Modal
      title={`Thông tin ${type === 'user' ? 'người dùng' : 'nhân viên'}`}
      centered
      open={show}
      onOk={handleOk}
      onCancel={handleOk}
      footer={[
        <Button key="back" type="primary" onClick={handleOk}>
          Chấp nhận
        </Button>,
      ]}
    >
      {type === 'user' && (
        <div
          style={{
            marginTop: '10px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Avatar src={item.photoURL} />
        </div>
      )}
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        style={{
          maxWidth: 600,
          marginTop: '20px',
        }}
      >
        <Form.Item name={type === 'user' ? 'name' : 'fullName'} label="Tên">
          <Input />
        </Form.Item>
        <Form.Item
          name={type === 'user' ? 'email' : 'emailCompany'}
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'phoneNumber'} label="Số điện thoại">
          <Input style={{ width: '150px' }} />
        </Form.Item>
        <Form.Item name={'address'} label="Địa chỉ">
          <Input />
        </Form.Item>
        <Form.Item
          name={type === 'user' ? 'description' : 'companyName'}
          label={type === 'user' ? 'Mô tả' : 'Tên công ty'}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>

      {type === 'employee' && (
        <Collapse
          activeKey={showCollapse}
          onChange={() => setShowCollapse((prev) => (prev.length === 0 ? [1] : []))}
          accordion
        >
          <Panel header="Danh sách công việc đã đăng" key="1">
            <Table
              rowClassName="editable-row"
              columns={columns}
              dataSource={listJobs}
              bordered
              pagination={{
                pageSize: 2,
              }}
            />
          </Panel>
        </Collapse>
      )}
    </Modal>
  )
}
