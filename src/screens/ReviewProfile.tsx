import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { IStudent, INewStudentValues } from 'interfacesAndTypes'
import { StudentDetailsForm } from 'components/StudentDetailsForm'
import { useStudents } from 'helpers/firestoreHooks'
import { createStudentFactsObject } from 'student-facts'

export const ReviewProfile: React.FC = () => {
  const params: { profileId: string } = useParams()

  const profileRef = useFirestore().collection('sharedProfiles').doc(params.profileId)
  const profileDoc = useFirestoreDocData<IStudent>(profileRef).data

  console.log(profileDoc)

  const history = useHistory()

  //   const teacherRef = useTeacherRef()
  const { studentsRef } = useStudents()
  //   const studentRef = studentsRef.doc(params.profileId)

  //   const thisStudentInStudentGroupsRef = teacherRef
  //     .collection('studentsInStudentGroups')
  //     .where('studentId', '==', params.profileId)

  //   const updateBatch = useFirestore().batch()

  const addStudentHandler = async (values: INewStudentValues) => {
    const { studentName, profilePic } = values
    const studentFacts = createStudentFactsObject(values)
    try {
      studentsRef.add({
        studentId: params.profileId,
        studentName,
        profilePic,
        studentFacts,
      })
      history.push('/manage-students')
    } catch (err) {
      console.log(err)
    }
  }

  //   const submitHandler = async (values: INewStudentValues) => {
  //     // update the 'students' collection with a studentFacts object
  //     const { studentName, profilePic } = values
  //     const studentFacts = createStudentFactsObject(values)
  //     updateBatch.update(studentRef, {
  //       studentName,
  //       profilePic,
  //       studentFacts,
  //     })

  //     // update the 'studentsInStudentsGroup' collection with a studentFacts array (for easy random selection)
  //     const studentFactsArray: { [key: string]: string }[] = []
  //     Object.keys(studentFacts).forEach(key => {
  //       if (studentFacts[key] !== '') {
  //         studentFactsArray.push({
  //           title: key,
  //           value: studentFacts[key],
  //         })
  //       }
  //     })
  //     console.log(studentFactsArray)
  //     const snapshot = await thisStudentInStudentGroupsRef.get()
  //     if (snapshot.docs.length > 0) {
  //       snapshot.docs.forEach(doc => {
  //         updateBatch.update(doc.ref, {
  //           studentInfo: { studentName, profilePic, studentFacts: studentFactsArray },
  //         })
  //       })
  //     }
  //     updateBatch.commit()
  //     history.push('/manage-students')
  //   }

  return (
    <StudentDetailsForm
      onCancel={() => console.log('poopie')}
      studentDocument={profileDoc}
      submitHandler={addStudentHandler}
    />
  )
}
