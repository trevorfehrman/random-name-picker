import * as React from 'react'
import 'App.css'

import { Switch, Route } from 'react-router-dom'

import StudentGroups from 'screens/StudentGroups'
import StudentGroup from 'screens/StudentGroup'
import ManageStudents from 'screens/ManageStudents'
import EditStudent from 'screens/EditStudent'
import ManageGroup from 'screens/ManageGroup'

const AuthenticatedApp: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={StudentGroups} />
        <Route path="/student-group/:groupId" component={StudentGroup} />
        <Route path="/manage-students" component={ManageStudents} />
        <Route path="/edit-student/:studentId" component={EditStudent} />
        <Route path="/manage-group/:studentGroupId" component={ManageGroup} />
      </Switch>
    </>
  )
}

export { AuthenticatedApp }
