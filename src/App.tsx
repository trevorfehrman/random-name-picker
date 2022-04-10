import * as React from 'react'
import { AuthCheck } from 'reactfire'
import 'firebase/auth'

import { AuthenticatedApp } from 'authenticated-app'
import { Welcome } from 'screens/Welcome'

const App: React.FC = () => {
  return <AuthCheck fallback={<Welcome />}>{<AuthenticatedApp />}</AuthCheck>
}

export default App
