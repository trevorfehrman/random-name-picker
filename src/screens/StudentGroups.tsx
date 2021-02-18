import * as React from 'react'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import StudentGroupPreview from 'components/StudentGroupPreview'
import { IStudentGroup } from 'interfacesAndTypes/interfacesAndTypes'
import NewStudentGroup from 'components/NewStudentGroup'

const StudentGroups: React.FC = () => {
  const { data: user } = useUser()

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsDocuments = useFirestoreCollectionData<IStudentGroup & { docId: string }>(studentGroupsRef, {
    idField: 'docId',
  })

  return (
    <>
      <NewStudentGroup studentGroupsRef={studentGroupsRef} />
      {studentGroupsDocuments.data?.map(doc => {
        return (
          <StudentGroupPreview
            key={doc.docId}
            studentGroupId={doc.docId}
            studentGroupName={doc.studentGroupName}
            userId={user.uid}
          />
        )
      })}
    </>
  )
}

export default StudentGroups
