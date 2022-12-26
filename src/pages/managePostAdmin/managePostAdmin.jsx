import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, Skeleton, Card } from 'antd'
import { JobAPI } from '../../api/job'
const count = 3
const ManagePostAdmin = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  useEffect(() => {
    JobAPI.getAllJobs().then((res) => {
      setInitLoading(false)
      setData(res.data)
      setList(res.data)
      console.log(res)
    })
  }, [setData])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tất cả bài đăng</h2>
      <Card>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          pagination={{ pageSize: 8 }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">edit</a>,
                <a key="list-loadmore-more">more</a>,
                <a key="list-loadmore-delete">delete</a>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.jobName}</a>}
                  description={item.companyName}
                />
                <div>{item.location}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
export default ManagePostAdmin
