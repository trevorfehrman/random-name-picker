import * as React from 'react'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'
import { useParams, useHistory } from 'react-router-dom'
import { INewStudentValues, StudentParams, IStudent } from 'interfacesAndTypes'
import { createStudentFactsObject } from 'student-facts'
import { useStudents, useTeacherRef } from 'helpers/firestoreHooks'
import { StudentDetailsForm } from 'components/StudentDetailsForm'
import firebase from 'firebase'

const EditStudent: React.FC = () => {
  const params: StudentParams = useParams()
  const studentId = params.studentId

  const { data } = useUser()

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

  const storage = firebase.storage()

  const submitHandler = async (values: INewStudentValues) => {
    // update the 'students' collection with a studentFacts object
    const { studentName, profilePic } = values

    const shouldUpdateProfilePic = profilePic.length > 0

    if (shouldUpdateProfilePic && profilePic[0].size > 1000000) {
      return console.log('please upload a photo less than 1mb')
    }

    const existingImageUrl = studentDocument?.profilePic
    const existingImageRef = storage.ref(existingImageUrl)

    let newImageUrl: string | null = null
    let newImageRef

    if (shouldUpdateProfilePic) {
      newImageUrl = `images/${data.uid}/${studentDocument.studentName}/${profilePic[0].name}`
      newImageRef = storage.ref(newImageUrl)
    }

    const studentFacts = createStudentFactsObject(values)

    try {
      let updates = {}
      if (newImageRef && newImageUrl) {
        await newImageRef.put(profilePic[0])
        updates = { studentName, studentFacts, profilePic: newImageUrl }
      } else {
        updates = { studentName, studentFacts }
      }

      updateBatch.update(studentRef, updates)

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
      let studentGroupUpdates: {
        studentName: string
        profilePic?: string | null
        studentFacts: { [key: string]: string }[]
      }
      if (shouldUpdateProfilePic) {
        studentGroupUpdates = { studentName, profilePic: newImageUrl, studentFacts: studentFactsArray }
      } else {
        studentGroupUpdates = { studentName, studentFacts: studentFactsArray }
      }
      const snapshot = await thisStudentInStudentGroupsRef.get()
      if (snapshot.docs.length > 0) {
        snapshot.docs.forEach(doc => {
          updateBatch.update(doc.ref, {
            studentInfo: studentGroupUpdates,
          })
        })
      }
      await updateBatch.commit()

      if (shouldUpdateProfilePic) {
        existingImageRef.delete()
      }

      history.push('/manage-students')
    } catch (err) {
      console.log(err)
    }
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
