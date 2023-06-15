import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import './components/common/styles/App.css'
import './components/common/styles/Components.css'

import React from 'react'
import { RouterProvider, useRouteError, createBrowserRouter, isRouteErrorResponse, Link } from 'react-router-dom'
import { Button } from 'devextreme-react/button'

import { Provider } from 'react-redux';
import { forecasterStore } from './components/forecaster/store/Store'
import { supportMetricsStore } from './components/support_metrics/store/Store'
import { costMetricsStore } from './components/cost_metrics/store/Store'

import Forecaster from './components/forecaster/Forecaster'
import SupportMetrics, { SupportMetricsApplySharedState } from './components/support_metrics/SupportMetricsContainer'
import CostMetrics, { CostMetricsApplySharedState } from './components/cost_metrics/CostMetricsContainer'


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
      <Link to={'CustomersActivity'} className='NavigationButton'>
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
    element: (
      <Provider store={forecasterStore}>
        <Forecaster />
      </Provider>
    ),
  },
  {
    path: '/CustomersActivity',
    element: (
      <Provider store={supportMetricsStore}>
        <SupportMetrics />
      </Provider>
    ),
  },
  {
    path: '/CustomersActivity/:stateId',
    element: (
      <Provider store={supportMetricsStore}>
        <SupportMetricsApplySharedState />
      </Provider>
    ),
  },
  {
    path: '/CostMetrics',
    element: (
      <Provider store={costMetricsStore}>
        <CostMetrics />
      </Provider>
    ),
  },
  {
    path: '/CostMetrics/:stateId',
    element: (
      <Provider store={costMetricsStore}>
        <CostMetricsApplySharedState />
      </Provider>
    ),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
