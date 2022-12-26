import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, Skeleton, Card } from 'antd'
import { letterAPI } from '../../api/letter'
import { useSelector } from 'react-redux'
import { minHeight } from '@mui/system'
const count = 3
const Apply = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const user = useSelector((state) => state.user.value)
  useEffect(() => {
    letterAPI.getListLetters(user._id).then((res) => {
      setInitLoading(false)
      setData(res)
    })
  }, [])
  const onLoadMore = () => {
    setLoading(true)
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    )
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results)
        setData(newData)
        setList(newData)
        setLoading(false)
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'))
      })
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
      <h2>Danh sách công việc đã ứng tuyển</h2>
      <Card>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={data.length > 0 ? loadMore : null}
          dataSource={list}
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
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name?.last}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>content</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
export default Apply
