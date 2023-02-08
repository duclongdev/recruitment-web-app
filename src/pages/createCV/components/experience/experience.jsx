import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space, DatePicker, Divider } from 'antd'
import { forwardRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCVDataExp } from '../../../../redux/CVSlice'
import './experience.scss'

const Experience = forwardRef(({ data }, ref) => {
  const [form] = Form.useForm()
  const exp = Form.useWatch('experience', form)
  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(
      setCVDataExp({
        ...values,
        isValidate: values.experience ? true : false,
      })
    )
  }

  useEffect(() => {
    dispatch(
      setCVDataExp({
        ...exp,
        isValidate: exp ? true : false,
      })
    )
  }, [exp])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Form
        form={form}
        name="dynamic_form_complex"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="experience">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Item
                      {...field}
                      label="Công ty"
                      name={[field.name, 'company']}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng điền tên công ty hoặc dự án',
                        },
                      ]}
                    >
                      <Input placeholder="Công ty hoặc dự án đã tham gia" />
                    </Form.Item>
                    <Space align="baseline">
                      <Form.Item {...field} label="Từ" name={[field.name, 'year']}>
                        <DatePicker.RangePicker picker="year" />
                      </Form.Item>
                    </Space>
                    <Form.Item
                      {...field}
                      label="Mô tả"
                      name={[field.name, 'description']}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng mô tả thông tin công việc đã tham gia',
                        },
                      ]}
                    >
                      <Input.TextArea
                        style={{ minHeight: '100px' }}
                        placeholder="Mô tả công việc"
                      />
                    </Form.Item>
                    <Divider
                      style={{ borderBlockStart: '1px solid grey' }}
                      orientation="left"
                    ></Divider>
                  </div>
                  <MinusCircleOutlined
                    style={{ marginLeft: 10, marginBottom: 30 }}
                    onClick={() => remove(field.name)}
                  />
                </div>
              ))}

              <Form.Item>
                <Button
                  style={{ maxWidth: '500px' }}
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Button style={{ display: 'none' }} ref={ref} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
})
export default Experience
