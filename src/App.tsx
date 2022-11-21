import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import './styles/App.css'

import React from 'react'
import { RouterProvider, useRouteError, createBrowserRouter, isRouteErrorResponse, Link } from 'react-router-dom'
import { Button } from 'devextreme-react/button'

import Forecaster from './components/forecaster/Forecaster'
import CustomersActivityContainer from './components/customers_activity/CustomersActivityContainer'

function ErrorPage() {
  const error = useRouteError()
  console.error(error)
  return (
    <div className='ErrorPage'>
      <h1>Oops!</h1>
      <p> {isRouteErrorResponse(error) ? <i>{error.status}</i> : ''} </p>
    </div>
  )
}

function Root() {
  return (
    <div className='Root'>
      <Link to={'forecaster'}>
        <Button
          className='NavElement'
          text='Forecaster'
          focusStateEnabled={false} />
      </Link>
      <Link to={'CustomersActivity'}>
        <Button
          className='NavElement'
          text='Customers Activity'
          focusStateEnabled={false} />
      </Link>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: '/forecaster',
    element: <Forecaster />,
  },
  {
    path: '/CustomersActivity',
    element: <CustomersActivityContainer />,
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
