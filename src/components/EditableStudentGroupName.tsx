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
          fontSize="1.4rem"
          fontWeight="bolder"
          margin="15px auto 0 auto"
          w="40%"
          minWidth="200px"
          textAlign="center"
        >
          <EditablePreview _hover={{ cursor: 'pointer' }} />
          <EditableInput />
        </Editable>
      )}
    </>
  )
}

export default EditableStudentGroupName
