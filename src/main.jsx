import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyle from './global'
import { UserProvider } from './utils/UserProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <UserProvider>
        <App />
      </UserProvider>
    </GlobalStyle>
  </React.StrictMode>
)
