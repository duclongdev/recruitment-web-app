import React, { useEffect, useState, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import {
  Button,
  Input,
  Space,
  Table,
  Tag,
  Popconfirm,
  InputNumber,
  Form,
  Typography,
  Tooltip,
} from 'antd'
import { JobAPI } from '../../../api/job'
import Highlighter from 'react-highlight-words'
import './jobs_admin_page.css'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const JobsAdminPage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    JobAPI.getAllJobs().then((res) => {
      setData(res.data)
      console.log(res.data)
    })
  }, [setData])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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

  const handleDelete = (id) => {
    console.log(id)
    const newData = data.filter((item) => item._id !== id)
    JobAPI.deleteJobById(id)
    setData(newData)
  }

  const columns = [
    {
      title: 'Tên công việc',
      dataIndex: 'jobName',
      key: 'jobName',
      editable: true,
      ellipsis: true,
      textWrap: 'word-break',
      ...getColumnSearchProps('jobName'),
      sorter: (a, b) => a.jobName.length - b.jobName.length,
      sortDirections: ['descend', 'ascend'],
      render: (jobName) => (
        <Tooltip placement="topLeft" title={jobName}>
          {jobName}
        </Tooltip>
      ),
    },
    {
      title: 'Công ty',
      dataIndex: 'companyName',
      key: 'companyName',
      editable: true,
      ellipsis: true,
      ...getColumnSearchProps('companyName'),
      sorter: (a, b) => a.companyName.length - b.companyName.length,
      sortDirections: ['descend', 'ascend'],
      render: (companyName) => (
        <Tooltip placement="topLeft" title={companyName}>
          {companyName}
        </Tooltip>
      ),
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
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
    {
      title: 'Thẻ',
      dataIndex: ['jobDetail', 'jobType'],
      key: ['jobDetail', 'jobType'],
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'fullTime') {
              color = 'volcano'
            } else if (tag === 'intern') {
              color = 'green'
            } else if (tag === 'partTime') {
              color = 'yellow'
            }
            return (
              <Tag style={{ margin: '3px 2px' }} color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </span>
      ),
    },
    {
      title: 'Lương',
      dataIndex: ['salary'],
      key: ['salary'],
      ellipsis: true,
      render: (record) => (
        <span style={{ color: 'Highlight' }}>
          {record !== null
            ? record?.salaryType === 'range'
              ? `${record?.startAmount} - ${record?.endAmount} per month`
              : `${record?.amount} per month`
            : ''}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '',
      render: (_, record) => {
        const editable = isEditing(record)
        return (
          <Space size="middle">
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record._id)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Lưu
                </Typography.Link>
                <Popconfirm title="Bạn muốn hủy bỏ thao tác này?" onConfirm={cancel}>
                  <a>Hủy</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                Sửa
              </Typography.Link>
            )}
            <Popconfirm
              title="Bạn muốn xóa công việc này?"
              onConfirm={() => handleDelete(record._id)}
            >
              <a>Xóa</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record._id === editingKey
  const edit = (record) => {
    form.setFieldsValue({
      jobName: '',
      companyName: '',
      location: '',
      ...record,
    })
    setEditingKey(record._id)
  }
  const cancel = () => {
    setEditingKey('')
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item._id)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        await JobAPI.updateJob(key, row)
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        await JobAPI.updateJob(key, row)
        setData(newData)
        setEditingKey('')
      }

      console.log(index, row)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <>
      <h2>Tất cả bài đăng</h2>
      <Space
        style={{
          marginBottom: 16,
        }}
      ></Space>
      <Form form={form} component={false}>
        <Table
          rowClassName="editable-row"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={data}
          bordered
          pagination={{
            pageSize: 5,
          }}
        />
      </Form>
    </>
  )
}
export default JobsAdminPage
