import * as React from 'react'

import { useParams, useHistory } from 'react-router-dom'
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData } from 'reactfire'
import { IStudent, INewStudentValues } from 'interfacesAndTypes'
import { StudentDetailsForm } from 'components/StudentDetailsForm'
import { useStudents, useTeacherRef } from 'helpers/firestoreHooks'
import { createStudentFactsObject } from 'student-facts'

export const ReviewProfileChanges: React.FC = () => {
  const params: { profileId: string } = useParams()

  const profileRef = useFirestore().collection('sharedProfiles').doc(params.profileId)
  const profileDoc = useFirestoreDocData<IStudent>(profileRef).data

  console.log(profileDoc)

  const history = useHistory()

  const teacherRef = useTeacherRef()
  const { studentsRef } = useStudents()
  const studentRef = studentsRef.where('studentId', '==', params.profileId)
  const studentDoc = useFirestoreCollectionData<IStudent & { docId: string }>(studentRef, { idField: 'docId' })
    ?.data?.[0]

  const studentToUpdateRef = studentsRef?.doc(studentDoc?.docId)

  const thisStudentInStudentGroupsRef = teacherRef
    .collection('studentsInStudentGroups')
    .where('studentId', '==', studentDoc?.docId || '')

  const updateBatch = useFirestore().batch()

  const acceptChangesHandler = async (values: INewStudentValues) => {
    // update the 'students' collection with a studentFacts object
    const { studentName, profilePic } = values
    const studentFacts = createStudentFactsObject(values)
    await updateBatch.update(studentToUpdateRef, {
      studentName,
      profilePic,
      studentFacts,
    })

    // update the 'studentsInStudentsGroup' collection with a studentFacts array (for easy random selection)
    const studentFactsArray: { [key: string]: string }[] = []
    Object.keys(studentFacts).forEach(key => {
      if (studentFacts[key] !== '') {
        studentFactsArray.push({
          title: key,
          value: studentFacts[key],
        })
      }
    })
    console.log(studentFactsArray)
    const snapshot = await thisStudentInStudentGroupsRef.get()
    if (snapshot.docs.length > 0) {
      snapshot.docs.forEach(doc => {
        updateBatch.update(doc.ref, {
          studentInfo: { studentName, profilePic, studentFacts: studentFactsArray },
        })
      })
    }
    await updateBatch.commit()
    profileRef.delete()
    history.push('/manage-students')
  }

  return (
    <StudentDetailsForm submitText="Accept changes" studentDocument={profileDoc} submitHandler={acceptChangesHandler} />
  )
}
