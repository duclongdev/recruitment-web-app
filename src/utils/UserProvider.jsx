import { useContext, createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { userAPI } from '../api/user'
import { auth } from '../firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../redux/usrSlice'
import { useDispatch } from 'react-redux'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState([])
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }
  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log(currentUser)
        const user = {
          userId: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName,
          photoURL: currentUser.photoURL,
          password: null,
        }

        await userAPI
          .login(user)
          .then((res) => {
            currentUser.role = res.data.role
            dispatch(login(res.data))
          })
          .catch((err) => {
            console.log('dang nhap that bai')
          })
        setUser(currentUser)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ googleSignIn, logOut, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
