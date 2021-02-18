import * as React from 'react'

import { Switch, Route } from 'react-router-dom'

import StudentGroups from 'screens/StudentGroups'
import StudentGroup from 'screens/StudentGroup'
import ManageStudents from 'screens/ManageStudents'

const AuthenticatedApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={StudentGroups} />
      <Route path="/student-group/:groupId" component={StudentGroup} />
      <Route path="/manage-students" component={ManageStudents} />
    </Switch>
  )
}

export { AuthenticatedApp }
