import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../utils/UserProvider'
import logo from '../../assets/logo.png'
import style from './style.module.scss'
import { CheckedIcon } from '../../assets/icon'

const Login = () => {
  const { googleSignIn, user } = UserAuth()

  const navigate = useNavigate()
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
    <>
      <p style={{ fontSize: '20px', padding: '20px 50px' }}>
        <span>Chào mừng đến với </span>
        <img src={logo} alt="" style={{ height: '20px', marginLeft: '5px' }} />
      </p>
      <div className={style.login}>
        <div className={style.login__form}>
          <button onClick={handleGoogleSignIn} className={style.loginGoogle}>
            <div
              style={{ padding: '3px 3px 0px 3px', borderRadius: '10px', backgroundColor: 'white' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google"
              />
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

          <form action="" className={style.login__form__item}>
            <div className={style.email}>
              <div className={style.email__header}>
                <label htmlFor="username">
                  Địa chỉ email <span style={{ color: 'red' }}>*</span>
                </label>
              </div>

              <input type="text" id="username" placeholder="Email" />
            </div>

            <div className={style.email}>
              <div className={style.email__header}>
                <label htmlFor="password">
                  Mật khẩu <span style={{ color: 'red' }}>*</span>
                </label>
                <a href="">Quên mật khẩu</a>
              </div>

              <input type={'password'} id="password" placeholder="Mật khẩu" />
            </div>
            <button onClick={handleGoogleSignIn} className={style.loginGoogle} type={'submit'}>
              <span>Đăng nhập </span>
            </button>
            <div className={style.email__signUp}>
              <span>
                Bạn chưa có tài khoản? <a href="">Đăng ký ngay</a>
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
    </>
  )
}

export default Login
