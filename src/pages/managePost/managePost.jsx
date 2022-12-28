import { Button, Card, List, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { JobAPI } from '../../api/job'
import { letterAPI } from '../../api/letter'
import ModalDetailPost from './modalDetailPost/modalDetailPost'
const count = 3
const ManagePost = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const [item, setItem] = useState()
  const user = useSelector((state) => state.user.value)
  useEffect(() => {
    letterAPI.getListLetters(user._id).then((res) => {
      setInitLoading(false)
      setData(res.data)
      setList(res.data)
    })
  }, [setData])

  const showModal = (item) => {
    setIsModalOpen(true)
    setItem(item)
    console.log(item)
  }
  const onLoadMore = () => {
    setLoading(true)
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          job: {},
          letter: {},
        }))
      )
    )
  }
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null
  return (
    <div style={{ padding: '20px', minHeight: 'calc(100vh - 220px - 72px)' }}>
      <h2>Danh sách các công việc đã đăng bài</h2>
      <Card>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={data.length > 3 ? loadMore : null}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">edit</a>,
                <a
                  key="list-loadmore-more"
                  onClick={() => {
                    showModal(item)
                  }}
                >
                  more
                </a>,
                <a
                  key="list-loadmore-delete"
                  onClick={() => {
                    JobAPI.deleteJobById(item.job._id).then((res) => {
                      console.log(res)
                    })
                  }}
                >
                  delete
                </a>,
              ]}
            >
              <Skeleton title={false} loading={item.loading} active>
                <List.Item.Meta title={<a href="#">{item.job.jobName}</a>} />
                <div>{item.job.location}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
      <ModalDetailPost show={isModalOpen} setShow={setIsModalOpen} item={item} />
    </div>
  )
}
export default ManagePost
