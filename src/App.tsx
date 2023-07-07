import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import './components/common/styles/App.css'
import './components/common/styles/Components.css'

import React, { PropsWithChildren } from 'react'
import { Navigate, RouterProvider, useRouteError, createBrowserRouter, isRouteErrorResponse, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'

import { Button } from 'devextreme-react/button'
import SignInButton from './components/common/ms_id/SignInButton'

import { forecasterStore } from './components/forecaster/store/Store'
import Forecaster from './components/forecaster/Forecaster'

import EngineeringMetrics, { EngineeringMetricsApplySharedState } from './components/engineering_metrics/EngineeringMetricsContainer'
import { Context } from './components/common/store/multiset_container/Context'


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

function Root(props: PropsWithChildren) {
  return <div className='Root'>
    {props.children}
  </div>
}

function NavMenu() {
  return (
    <Root>
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
    </Root>
  )
}

function SignIn() {
  return <Root>
    <SignInButton />
  </Root>
}

export default function App() {
  return <>
    <AuthenticatedTemplate>
      <RouterProvider router={router} />
    </AuthenticatedTemplate>

    <UnauthenticatedTemplate>
      <SignIn />
    </UnauthenticatedTemplate>
  </>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavMenu />,
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
    element: <EngineeringMetricsApplySharedState context={Context.Support} />,
  },
  {
    path: '/CostMetrics',
    element: <Navigate to='/EngineeringMetrics' replace={true} />,
  },
  {
    path: '/CostMetrics/:stateId',
    element: <EngineeringMetricsApplySharedState context={Context.Cost} />,
  },
  {
    path: '/EngineeringMetrics',
    element: <EngineeringMetrics />,
  },
])
