import React, { forwardRef, useEffect } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import './education.scss'
import { setCVDataEducation } from '../../../../redux/CVSlice'
import { useDispatch } from 'react-redux'
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
}
const Education = forwardRef(({ data }, ref) => {
  const [form] = Form.useForm()
  const educations = Form.useWatch('educations', form)
  const dispatch = useDispatch()
  const onFinish = (values) => {
    dispatch(
      setCVDataEducation({
        ...values,
        isValidate: values.educations ? true : false,
      })
    )
  }

  useEffect(() => {
    const val = form.getFieldsValue('')
    dispatch(
      setCVDataEducation({
        ...val,
        isValidate: val.educations ? true : false,
      })
    )
  }, [educations])
  return (
    <div>
      <Form
        name="dynamic_form_item_education"
        {...formItemLayoutWithOutLabel}
        style={{
          maxWidth: 800,
        }}
        onFinish={onFinish}
      >
        <Form.List
          name="educations"
          rules={[
            {
              validator: async (_, educations) => {
                if (!educations || educations.length < 1) {
                  return Promise.reject(new Error('Phải có ít nhất 1 thông tin về học vấn'))
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Từ' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Vui lòng điền thông tin học vấn.',
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="2010 - 2012: Tốt nghiệp...."
                      style={{
                        width: '80%',
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: '80%',
                  }}
                  icon={<PlusOutlined />}
                >
                  Thêm
                </Button>

                <Form.ErrorList errors={errors} />
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

export default Education
