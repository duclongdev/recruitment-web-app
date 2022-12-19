import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyle from './global'
import { UserProvider } from './utils/UserProvider'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <Provider store={store}>
        <UserProvider>
          <App />
        </UserProvider>
      </Provider>
    </GlobalStyle>
  </React.StrictMode>
)
