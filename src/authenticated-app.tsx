import * as React from 'react'

import { Switch, Route } from 'react-router-dom'

import StudentGroups from 'screens/StudentGroups'

const AuthenticatedApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={StudentGroups}></Route>
    </Switch>
  )
}

export { AuthenticatedApp }
