import * as React from 'react'

import { Switch, Route } from 'react-router-dom'

import StudentGroups from 'screens/StudentGroups'
import StudentGroup from 'screens/StudentGroup'

const AuthenticatedApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={StudentGroups} />
      <Route path="/student-group/:groupId" component={StudentGroup} />
    </Switch>
  )
}

export { AuthenticatedApp }
