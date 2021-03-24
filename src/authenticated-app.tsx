import * as React from 'react'
import 'App.css'

import { Switch, Route } from 'react-router-dom'

import StudentGroups from 'screens/StudentGroups'
import StudentGroup from 'screens/StudentGroup'
import ManageStudents from 'screens/ManageStudents'
import EditStudent from 'screens/EditStudent'
import Header from 'components/Header'

const AuthenticatedApp: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={StudentGroups} />
        <Route path="/student-group/:groupId" component={StudentGroup} />
        <Route path="/manage-students" component={ManageStudents} />
        <Route path="/edit-student/:studentId" component={EditStudent} />
      </Switch>
    </>
  )
}

export { AuthenticatedApp }
