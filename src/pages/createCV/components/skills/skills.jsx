import React, { useEffect } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Rate } from 'antd'
import { useDispatch } from 'react-redux'
import { setCVDataSkills } from '../../../../redux/CVSlice'
import { forwardRef } from 'react'

const formItemLayout1 = {
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

const formItemLayoutWithOutLabel1 = {
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

const Skills = forwardRef(({ data }, ref) => {
  const [form] = Form.useForm()

  const skills = Form.useWatch('skills', form)
  const dispatch = useDispatch()
  const onFinish = (values) => {
    console.log(values)
    dispatch(
      setCVDataSkills({
        ...values,
        isValidate: values.skills ? true : false,
      })
    )
  }

  useEffect(() => {
    const val = form.getFieldsValue('')
    dispatch(
      setCVDataSkills({
        ...val,
        isValidate: val.skills ? true : false,
      })
    )

    console.log(skills)
  }, [skills])
  return (
    <div>
      <Form
        name="dynamic_form_item_skills"
        form={form}
        {...formItemLayoutWithOutLabel1}
        style={{
          maxWidth: 800,
        }}
        onFinish={onFinish}
      >
        <Form.List name="skills">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout1 : formItemLayoutWithOutLabel1)}
                  label={index === 0 ? 'Kĩ năng' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'skill']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Vui lòng điền thông tin kĩ năng.',
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Nói lưu loát bằng Tiếng anh, Đàn, Hát... "
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

export default Skills
