import 'devextreme/dist/css/dx.fluent.saas.light.css'
import './components/common/styles/App.css'
import './components/common/styles/Components.css'

import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import SignIn from './components/app_components/SignIn'
import { ROUTER } from './components/app_components/Router'

export default function App() {
  return <>
    <AuthenticatedTemplate>
      <RouterProvider router={ROUTER} />
    </AuthenticatedTemplate>

    <UnauthenticatedTemplate>
      <SignIn />
    </UnauthenticatedTemplate>
  </>
}
