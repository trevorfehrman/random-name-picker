import * as React from 'react'
import { AuthCheck } from 'reactfire'
import 'firebase/auth'

import { Login } from 'components/Login'
import { AuthenticatedApp } from 'authenticated-app'

const App: React.FC = () => {
  return <AuthCheck fallback={<Login />}>{<AuthenticatedApp />}</AuthCheck>
}

export default App
