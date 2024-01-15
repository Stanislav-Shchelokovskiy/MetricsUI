import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MsalProvider } from '@azure/msal-react'
import { getMsalInstance } from './components/common/ms_id/Msal'
import config from 'devextreme/core/config'

const licenseKey = 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImJmYThjNTM3LTlhNjEtMTFlNC05NzBhLWY0NmQwNDkwY2JjZiIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMyCn0=.TNODzBejb/mh/zM49wL/dpWbi100ZhC8Bh4CXpglNo2XsIyCS0avSQlbkEqNKq0V657I3QYG2OsD9iNW+P1PA2WqTCwd6295Qe5nElO369IfoxxTLOwOwYQ5+Rq+joHgBQYnZg=='
config({ licenseKey });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const msalInstance = getMsalInstance()

root.render(
  // <React.StrictMode>
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
