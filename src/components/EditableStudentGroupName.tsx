import * as React from 'react'
import firebase from 'firebase'
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

type EditableStudentGroupNameProps = {
  studentGroupDocument: firebase.firestore.DocumentData
  studentGroupRef: firebase.firestore.DocumentReference
}

const EditableStudentGroupName: React.FC<EditableStudentGroupNameProps> = ({
  studentGroupDocument,
  studentGroupRef,
}) => {
  const editStudentGroupNameHandler = (value: string) => {
    console.log(value)
    if (value.length > 22) {
      console.log('hello?')
      return
    }
    studentGroupRef.update({ studentGroupName: value }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      {studentGroupDocument && (
        <Editable
          defaultValue={studentGroupDocument.studentGroupName}
          onSubmit={editStudentGroupNameHandler}
          fontWeight="bolder"
          w="100%"
          minWidth="13rem"
          textAlign="right"
          color="blue.900"
        >
          <EditablePreview _hover={{ cursor: 'pointer' }} />
          <EditableInput />
        </Editable>
      )}
    </>
  )
}

export default EditableStudentGroupName
