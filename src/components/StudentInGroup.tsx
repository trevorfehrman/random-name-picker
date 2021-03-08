import * as React from 'react'
import { Heading, Icon, IconButton, transition } from '@chakra-ui/react'
// import { DeleteIcon } from '@chakra-ui/icons'
import { BiTrash } from 'react-icons/bi'
import { useFirestore, useUser } from 'reactfire'
import { StudentContainer } from 'styles'
import { AnimatePresence } from 'framer-motion'

type StudentInGroupProps = {
  studentName: string
  studentInStudentGroupId: string
  selected: boolean
}

const StudentInGroup: React.FC<StudentInGroupProps> = ({ studentName, studentInStudentGroupId, selected }) => {
  const { data: user } = useUser()

  const studentsInStudentGroupsRef = useFirestore()
    .collection('teachers')
    .doc(user.uid)
    .collection('studentsInStudentGroups')
    .doc(studentInStudentGroupId)

  const removeHandler = () => {
    studentsInStudentGroupsRef.delete()
  }

  return (
    <AnimatePresence>
      <StudentContainer
        layout
        animate={{ backgroundColor: selected ? '#90CDF4' : '' }}
        transition={{ duration: 1, type: 'spring' }}
        exit={{ x: '100vw', transition: { duration: 2 } }}
      >
        <Heading as="h3" size="md">
          {studentName}
        </Heading>
        <IconButton icon={<Icon as={BiTrash} />} aria-label="delete" onClick={removeHandler} />
      </StudentContainer>
    </AnimatePresence>
  )
}

export default StudentInGroup
