import * as React from 'react'
import 'App.css'

import { Flex } from '@chakra-ui/react'

import { Switch, Route } from 'react-router-dom'

import StudentGroups from 'screens/StudentGroups'
import StudentGroup from 'screens/StudentGroup'
import ManageStudents from 'screens/ManageStudents'
import EditStudent from 'screens/EditStudent'
import ManageGroup from 'screens/ManageGroup'
import MobileHeader from 'components/MobileHeader'
import { HeaderForDesktop } from 'components/HeaderForDesktop'
import { ReviewNewProfile } from 'screens/ReviewNewProfile'
import { ReviewProfileChanges } from 'screens/ReviewProfileChanges'
import { ReviewNewProfiles } from 'screens/ReviewNewProfiles'
import { navHeightInRem } from 'my-constants'

const AuthenticatedApp: React.FC = () => {
  return (
    <Flex direction="column" h="100vh">
      <Flex direction="column" h={`${navHeightInRem}rem`}>
        <MobileHeader />
        <HeaderForDesktop />
      </Flex>
      <Flex flexDirection="column" flex="1">
        <Switch>
          <Route path="/" exact component={StudentGroups} />
          <Route path="/student-group/:groupId" component={StudentGroup} />
          <Route path="/manage-students" component={ManageStudents} />
          <Route path="/edit-student/:studentId" component={EditStudent} />
          <Route path="/review-new-profiles" component={ReviewNewProfiles} />
          <Route path="/review-profile-changes/:profileId" component={ReviewProfileChanges} />
          <Route path="/review-new-profile/:profileId" component={ReviewNewProfile} />
          <Route path="/manage-group/:studentGroupId" component={ManageGroup} />
        </Switch>
      </Flex>
    </Flex>
  )
}

export { AuthenticatedApp }
