import * as React from 'react'
import { Heading, IconButton, Flex } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

type StudentProps = {
  studentName: string
  docId: string
}

const Student: React.FC<StudentProps> = ({ studentName, docId }) => {
  const { data: user } = useUser()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const studentRef = teacherRef.collection('students').doc(docId)
  const studentsInStudentGroupsRef = teacherRef.collection('studentsInStudentGroups').where('studentId', '==', docId)

  const deleteBatch = useFirestore().batch()

  const deleteHandler = async () => {
    console.log('delete student from students collection and all instances from studentsInStudentGroups collection')
    deleteBatch.delete(studentRef)
    const snapshot = await studentsInStudentGroupsRef.get()
    if (snapshot.docs.length > 0) {
      snapshot.docs.forEach(doc => {
        deleteBatch.delete(doc.ref)
      })
    }
    deleteBatch.commit()
  }

  return (
    <Flex align="center" justify="space-between" padding="10px" border="1px solid black" w="100%" margin="auto">
      <Heading as="h3" size="md">
        {studentName}
      </Heading>
      <IconButton icon={<DeleteIcon />} aria-label="delete" onClick={deleteHandler} />
    </Flex>
  )
}

export default Student
