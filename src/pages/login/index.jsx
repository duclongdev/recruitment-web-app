import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import style from './style.module.scss'
import { CheckedIcon } from '../../assets/icon'
import { Link } from 'react-router-dom'
import { userAPI } from '../../api/user'
import { UserAuth } from '../../utils/UserProvider'
import Input from '../../components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../../components/Button'
import { EmployeeAPI } from '../../api/employee'
import * as yup from 'yup'
import errorMessages from '../../utils/errorMessage.json'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/usrSlice'

const validationSchema = yup.object({
  email: yup
    .string()
    .required(errorMessages.required.email)
    .matches(RegExp.email, errorMessages.emailValidation),
  password: yup
    .string()
    .required(errorMessages.required.password)
    .matches(RegExp.password, errorMessages.password),
})

const Login = ({ type }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { googleSignIn, user, setUser } = UserAuth()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    console.log(type)
    const api = type === 'em' ? EmployeeAPI : userAPI
    console.log(api)

    api
      .login(data)
      .then((res) => {
        dispatch(login(res.data))
        console.log('navigate')
        navigate('/', { replace: true })
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data === 'Email is not exists') {
          setError('email', {
            message: 'Email không tồn tại',
          })
        } else if (error.response.data === 'Password incorrect') {
          setError('password', {
            message: 'Mật khẩu không chính xác',
          })
        }
      })
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user?.displayName != null) {
      navigate('/')
    }
  }, [user])
  return (
    <div>
      <p style={{ fontSize: '20px', padding: '20px 50px', position: 'relative' }}>
        <span>Chào mừng đến với </span>
        <img src={logo} alt="" style={{ height: '20px', marginLeft: '5px' }} />
        {type === 'em' ? <span className={style.note}> Tuyển dụng</span> : null}
      </p>
      <div className={style.login}>
        <div className={style.login__form}>
          {type !== 'em' ? (
            <>
              <button onClick={handleGoogleSignIn} className={style.loginGoogle}>
                <div
                  style={{
                    padding: '3px 3px 0px 3px',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                  }}
                >
                  <img src="assets/googleLG.svg" alt="google" />
                </div>

                <span>Đăng nhập bằng Google</span>
              </button>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={{ height: '1px', backgroundColor: '#ccc', flexGrow: '1' }}></div>
                <div style={{ padding: '20px 10px', fontWeight: '500' }}>Hoặc</div>
                <div style={{ height: '1px', backgroundColor: '#ccc', flexGrow: '1' }}></div>
              </div>
            </>
          ) : (
            <h1>Log In</h1>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className={style.login__form__item}>
            <Input
              register={register}
              label={<span className={style.label}>Email</span>}
              id="email"
              type="text"
              error={errors.email}
              required
            />
            <div className={style.hi}>
              <Input
                register={register}
                label={<span className={style.label}>Mật khẩu</span>}
                id="password"
                type="password"
                required
                error={errors.password}
              />
              <span className={style.fogotPW}>
                <Link>Quên mật khẩu</Link>
              </span>
            </div>

            <Button title="Đăng nhập" type="submit" />

            <div className={style.email__signUp}>
              <span>
                Bạn chưa có tài khoản? <Link to="/sign-up">Đăng ký ngay</Link>
              </span>
            </div>
          </form>
        </div>

        <div className={style.login__info}>
          <h2>Đăng nhập để có quyền truy cập ngay vào hàng ngàn đánh giá và thông tin về lương</h2>
          <p>
            <CheckedIcon /> Xem mức lương để giúp bạn thương lượng lời đề nghị hoặc tăng lương
          </p>
          <p>
            <CheckedIcon />
            Tìm hiểu về phúc lợi, phỏng vấn, văn hóa công ty qua các bài đánh giá
          </p>
          <p>
            <CheckedIcon />
            Dễ dàng áp dụng chỉ với 1 cú nhấp chuột
          </p>
          <p>
            <CheckedIcon />
            Quản lý hồ sơ và quyền riêng tư của riêng bạn
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
