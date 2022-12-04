import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAYdcW5Pe4SZE7qHbJspnLFqq3VUl57jy0',
  authDomain: 'recruitmentapp-173abc.firebaseapp.com',
  projectId: 'recruitmentapp-173abc',
  storageBucket: 'recruitmentapp-173abc.appspot.com',
  messagingSenderId: '746855018485',
  appId: '1:746855018485:web:3c884df6a59e48c0ba3abc',
  measurementId: 'G-Y13X4TCB85',
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)
const auth = getAuth(app)
export { auth, storage }
