import * as React from 'react'
import 'App.css'
import { useFirestore, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import { useTeacherRef } from 'helpers/firestoreHooks'

import { Switch, Route } from 'react-router-dom'

import StudentGroups from 'screens/StudentGroups'
import StudentGroup from 'screens/StudentGroup'
import ManageStudents from 'screens/ManageStudents'
import EditStudent from 'screens/EditStudent'
import ManageGroup from 'screens/ManageGroup'
import MobileHeader from 'components/MobileHeader'
import { HeaderForDesktop } from 'components/HeaderForDesktop'
import { IStudent } from 'interfacesAndTypes'
import { ReviewProfile } from 'screens/ReviewProfile'

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
  sharedProfiles = useFirestoreCollectionData<IStudent & { teacherCode: string } & { docId: string }>(
    sharedProfilesRef,
    {
      idField: 'docId',
    },
  ).data

  const notificationValue = sharedProfiles?.length

  React.useEffect(() => {
    console.log('a thing')
  }, [])

  return (
    <>
      <MobileHeader />
      <HeaderForDesktop notificationValue={notificationValue} />
      <Switch>
        <Route path="/" exact component={StudentGroups} />
        <Route path="/student-group/:groupId" component={StudentGroup} />
        <Route path="/manage-students">
          <ManageStudents sharedProfiles={sharedProfiles} />
        </Route>
        <Route path="/edit-student/:studentId" component={EditStudent} />
        <Route path="/review-profile/:profileId" component={ReviewProfile} />
        <Route path="/manage-group/:studentGroupId" component={ManageGroup} />
      </Switch>
    </>
  )
}

export { AuthenticatedApp }
