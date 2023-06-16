import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import './components/common/styles/App.css'
import './components/common/styles/Components.css'

import React from 'react'
import { RouterProvider, useRouteError, createBrowserRouter, isRouteErrorResponse, Link } from 'react-router-dom'
import { Button } from 'devextreme-react/button'

import { Provider } from 'react-redux'
import { forecasterStore } from './components/forecaster/store/Store'

import Forecaster from './components/forecaster/Forecaster'
import EngineeringMetrics, { EngineeringMetricsApplySharedState } from './components/engineering_metrics/EngineeringMetricsContainer'
import { Navigate } from 'react-router-dom'


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
      <Link to={'forecaster'} className='NavigationButton'>
        <Button
          className='NavElement'
          text='Forecaster'
          focusStateEnabled={false} />
      </Link>
      <Link to={'EngineeringMetrics'} className='NavigationButton'>
        <Button
          className='NavElement'
          text='Engineering metrics'
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
    element: (
      <Provider store={forecasterStore}>
        <Forecaster />
      </Provider>
    ),
  },
  {
    path: '/CustomersActivity',
    element: <Navigate to='/EngineeringMetrics' replace={true} />,
  },
  {
    path: '/CustomersActivity/:stateId',
    element: <EngineeringMetricsApplySharedState />,
  },
  {
    path: '/CostMetrics',
    element: <Navigate to='/EngineeringMetrics' replace={true} />,
  },
  {
    path: '/CostMetrics/:stateId',
    element: <EngineeringMetricsApplySharedState />,
  },
  {
    path: '/EngineeringMetrics',
    element: <EngineeringMetrics />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
