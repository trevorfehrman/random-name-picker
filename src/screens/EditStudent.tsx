import * as React from 'react'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { useParams, useHistory } from 'react-router-dom'
import { INewStudentValues, StudentParams, IStudent } from 'interfacesAndTypes'
import { createStudentFactsObject } from 'student-facts'
import { useStudents, useTeacherRef } from 'helpers/firestoreHooks'
import { StudentDetailsForm } from 'components/StudentDetailsForm'

const EditStudent: React.FC = () => {
  const params: StudentParams = useParams()
  const studentId = params.studentId

  const history = useHistory()

  const teacherRef = useTeacherRef()
  const { studentsRef } = useStudents()
  const studentRef = studentsRef.doc(studentId)

  const studentDocument = useFirestoreDocData<IStudent>(studentRef).data

  console.log(studentDocument)

  const thisStudentInStudentGroupsRef = teacherRef
    .collection('studentsInStudentGroups')
    .where('studentId', '==', studentId)

  const updateBatch = useFirestore().batch()

  const submitHandler = async (values: INewStudentValues) => {
    // update the 'students' collection with a studentFacts object
    const { studentName, profilePic } = values
    const studentFacts = createStudentFactsObject(values)
    updateBatch.update(studentRef, {
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
    updateBatch.commit()
    history.push('/manage-students')
  }

  return (
    <StudentDetailsForm
      cancelDestination="/manage-students"
      submitHandler={submitHandler}
      studentDocument={studentDocument}
      submitText="Submit Changes"
    />
  )
}

export default EditStudent
