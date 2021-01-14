import * as React from 'react'

import { Switch, Route } from 'react-router-dom'

import Classrooms from 'screens/Classrooms'

const AuthenticatedApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Classrooms}></Route>
    </Switch>
  )
}

export { AuthenticatedApp }
