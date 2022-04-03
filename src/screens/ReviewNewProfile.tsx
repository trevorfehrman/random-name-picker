import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { IStudent, INewStudentValues } from 'interfacesAndTypes'
import { StudentDetailsForm } from 'components/StudentDetailsForm'
import { useStudents } from 'helpers/firestoreHooks'
import { createStudentFactsObject } from 'student-facts'

export const ReviewNewProfile: React.FC = () => {
  const params: { profileId: string } = useParams()

  const profileRef = useFirestore().collection('sharedProfiles').doc(params.profileId)
  const profileDoc = useFirestoreDocData<IStudent>(profileRef).data

  console.log(profileDoc)

  const history = useHistory()

  const { studentsRef } = useStudents()

  const addStudentHandler = async (values: INewStudentValues) => {
    const { studentName, profilePic } = values
    const studentFacts = createStudentFactsObject(values)
    try {
      await studentsRef.add({
        profileId: params.profileId,
        studentName,
        profilePic,
        studentFacts,
      })
      profileRef.delete()
      history.push('/manage-students')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <StudentDetailsForm submitText="Accept Student" studentDocument={profileDoc} submitHandler={addStudentHandler} />
  )
}
