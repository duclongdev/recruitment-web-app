import { useContext, createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../firebase'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }
  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ googleSignIn, logOut, user }}>{children}</UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
