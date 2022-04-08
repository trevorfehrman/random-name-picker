import * as React from 'react'
import 'App.css'
import { useFirestore, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import { useTeacherRef } from 'helpers/firestoreHooks'
import { Flex } from '@chakra-ui/react'

import { Switch, Route } from 'react-router-dom'

import StudentGroups from 'screens/StudentGroups'
import StudentGroup from 'screens/StudentGroup'
import ManageStudents from 'screens/ManageStudents'
import EditStudent from 'screens/EditStudent'
import ManageGroup from 'screens/ManageGroup'
import MobileHeader from 'components/MobileHeader'
import { HeaderForDesktop } from 'components/HeaderForDesktop'
import { ISharedStudentProfile } from 'interfacesAndTypes'
import { ReviewNewProfile } from 'screens/ReviewNewProfile'
import { ReviewProfileChanges } from 'screens/ReviewProfileChanges'
import { ReviewNewProfiles } from 'screens/ReviewNewProfiles'
import { navHeightInRem } from 'my-constants'

interface iTeacherDoc {
  displayName: string
  email: string
  photoURL: string
  teacherCode: string
  uid: string
}

const AuthenticatedApp: React.FC = () => {
  const teacherRef = useTeacherRef()
  const teacherCode = useFirestoreDocData<iTeacherDoc>(teacherRef).data?.teacherCode || ''

  console.log(teacherCode)

  let sharedProfiles = null

  const sharedProfilesRef = useFirestore().collection('sharedProfiles').where('teacherCode', '==', teacherCode)
  sharedProfiles = useFirestoreCollectionData<ISharedStudentProfile & { docId: string }>(sharedProfilesRef, {
    idField: 'docId',
  }).data

  const sharedProfileAmount = sharedProfiles?.length

  React.useEffect(() => {
    console.log('a thing')
  }, [])

  return (
    <Flex direction="column" h="100vh">
      <Flex direction="column" h={`${navHeightInRem}rem`}>
        <MobileHeader />
        <HeaderForDesktop sharedProfileAmount={sharedProfileAmount} />
      </Flex>
      <Flex flexDirection="column" flex="1">
        <Switch>
          <Route path="/" exact component={StudentGroups} />
          <Route path="/student-group/:groupId" component={StudentGroup} />
          <Route path="/manage-students">
            <ManageStudents sharedProfileAmount={sharedProfileAmount} />
          </Route>
          <Route path="/edit-student/:studentId" component={EditStudent} />
          <Route path="/review-new-profiles">
            <ReviewNewProfiles sharedProfiles={sharedProfiles} />
          </Route>
          <Route path="/review-profile-changes/:profileId" component={ReviewProfileChanges} />
          <Route path="/review-new-profile/:profileId" component={ReviewNewProfile} />
          <Route path="/manage-group/:studentGroupId" component={ManageGroup} />
        </Switch>
      </Flex>
    </Flex>
  )
}

export { AuthenticatedApp }
