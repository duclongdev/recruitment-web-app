import React from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { Avatar, List, Card } from 'antd'
import { JobAPI } from '../../api/job'
import { useDispatch } from 'react-redux'
import { enableLoadMore } from '../../redux/homeSlice'

const History = ({ history, setShow, toSearch, switchScreen, setJobs }) => {
  const dispatch = useDispatch()

  return (
    <Card
      style={{
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <List
        style={{ textAlign: 'center', width: '500px' }}
        itemLayout="horizontal"
        dataSource={history}
        renderItem={(item) => (
          <List.Item
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const item2 = {
                jobName: item.jobName,
                location: item.location,
              }
              JobAPI.searchJobs(item2).then((response) => {
                setJobs(response.data)
              })

              toSearch(item2)
              dispatch(enableLoadMore())
              setShow(true)
              switchScreen()
            }}
          >
            <List.Item.Meta
              title={`Từ khóa: ${item.jobName}`}
              description={`Địa điểm: ${item?.location}`}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
export default History
