import * as React from 'react'

import { Switch, Route } from 'react-router-dom'

import StudentGroups from 'screens/StudentGroups'
import StudentGroup from 'screens/StudentGroup'
import ShowAllStudents from 'screens/ShowAllStudents'
import ManageStudents from 'screens/ManageStudents'
import EditStudent from 'screens/EditStudent'

const AuthenticatedApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={StudentGroups} />
      <Route path="/student-group/:groupId" component={StudentGroup} />
      <Route path="/show-all-students/:groupId" component={ShowAllStudents} />
      <Route path="/manage-students" component={ManageStudents} />
      <Route path="/edit-student/:studentId" component={EditStudent} />
    </Switch>
  )
}

export { AuthenticatedApp }
