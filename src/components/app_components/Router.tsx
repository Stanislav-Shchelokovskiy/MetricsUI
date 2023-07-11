import React from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { forecasterStore } from '../forecaster/store/Store'
import Forecaster from '../forecaster/Forecaster'

import EngineeringMetrics, { EngineeringMetricsApplySharedState } from '../engineering_metrics/EngineeringMetricsContainer'
import { Context } from '../common/store/multiset_container/Context'

import ErrorPage from '../app_components/ErrorPage'
import NavMenu from '../app_components/Navigation'

import {
  FORECASTER,
  SUPPORT_METRICS,
  COST_METRICS,
  ENGINEERING_METRICS,
} from './Paths'


export const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <NavMenu />,
    errorElement: <ErrorPage />
  },
  {
    path: FORECASTER,
    element: (
      <Provider store={forecasterStore}>
        <Forecaster />
      </Provider>
    ),
  },
  {
    path: SUPPORT_METRICS,
    element: <Navigate to={ENGINEERING_METRICS} replace={true} />,
  },
  {
    path: `${SUPPORT_METRICS}/:stateId`,
    element: <EngineeringMetricsApplySharedState context={Context.Support} />,
  },
  {
    path: COST_METRICS,
    element: <Navigate to={ENGINEERING_METRICS} replace={true} />,
  },
  {
    path: `${COST_METRICS}/:stateId`,
    element: <EngineeringMetricsApplySharedState context={Context.Cost} />,
  },
  {
    path: ENGINEERING_METRICS,
    element: <EngineeringMetrics />,
  },
])
