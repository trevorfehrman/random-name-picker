import * as React from 'react'
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
} from '@chakra-ui/react'
import { IStudentToAdd, IStudentFact } from 'interfacesAndTypes'
import StudentPreview from 'components/StudentPreview'
import { useFirestore } from 'reactfire'
import {
  useStudentGroup,
  useStudentsInThisStudentGroup,
  useStudents,
  useStudentsInStudentGroups,
} from 'helpers/firestoreHooks'

type AddExistingStudentsModalProps = {
  onClose: () => void
  isOpen: boolean
  studentGroupId: string
}

const AddExistingStudentsModal: React.FC<AddExistingStudentsModalProps> = ({ onClose, isOpen, studentGroupId }) => {
  const [selectedStudentsToAdd, setSelectedStudentsToAdd] = React.useState<IStudentToAdd[]>([])

  const { studentsInThisStudentGroupDocuments } = useStudentsInThisStudentGroup(studentGroupId)
  const studentsInStudentGroupsRef = useStudentsInStudentGroups()
  const { studentGroupDocument } = useStudentGroup(studentGroupId)
  const { studentDocuments } = useStudents()
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([])

  const addBatch = useFirestore().batch()

  const findLowestOrderNumber = () => {
    let lowestOrderNumber = 0
    studentsInThisStudentGroupDocuments.forEach(student => {
      if (student.order < lowestOrderNumber) {
        lowestOrderNumber = student.order
      }
    })
    return lowestOrderNumber
  }

  const addExistingHandler = () => {
    let lowestOrderNumber = findLowestOrderNumber()
    selectedStudentsToAdd.forEach(student => {
      const newStudentInStudentGroupRef = studentsInStudentGroupsRef.doc()
      const studentFacts: IStudentFact[] = []
      Object.keys(student.studentFacts).forEach(key => {
        if (student.studentFacts[key] !== '') {
          studentFacts.push({ title: key, value: student.studentFacts[key] })
        }
        return studentFacts
      })
      addBatch.set(newStudentInStudentGroupRef, {
        studentInfo: {
          studentName: student.studentName,
          profilePic: student.profilePic,
          studentFacts,
        },
        studentId: student.studentId,
        studentGroupId: studentGroupDocument.docId,
        studentGroupName: studentGroupDocument.studentGroupName,
        selected: false,
        // assign an order value one less than the lowestOrderNumber found above
        // and decrement that value
        order: --lowestOrderNumber,
      })
    })
    return addBatch
      .commit()
      .then(() => {
        onClose()
        setSelectedStudentsToAdd([])
      })
      .catch(err => console.log(err))
  }

  const studentsNotInStudentGroup = studentDocuments?.filter(student => {
    let studentIsInStudentGroup = false
    studentsInThisStudentGroupDocuments?.forEach(studentInGroup => {
      if (studentInGroup.studentId === student.docId) {
        studentIsInStudentGroup = true
      }
    })
    return !studentIsInStudentGroup
  })

  const selectAllHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const selection: IStudentToAdd[] = []
    if (selectedStudentsToAdd.length < studentsNotInStudentGroup.length) {
      studentsNotInStudentGroup.forEach(studentInThisGroup => {
        selection.push({
          studentId: studentInThisGroup.docId,
          studentName: studentInThisGroup.studentName,
          profilePic: studentInThisGroup.profilePic,
          studentFacts: studentInThisGroup.studentFacts,
        })
      })
    }
    setSelectedStudentsToAdd(selection)
  }

  const studentsNotInThisStudentGroupDisplay = studentsNotInStudentGroup?.map(doc => {
    return (
      <StudentPreview
        key={doc.docId}
        student={doc}
        selectedStudentsToAdd={selectedStudentsToAdd}
        setSelectedStudentsToAdd={setSelectedStudentsToAdd}
        selectedStudents={selectedStudents}
        setSelectedStudents={setSelectedStudents}
      />
    )
  })

  console.log(selectedStudentsToAdd)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="90%" alignSelf="center">
        <ModalHeader>Add Students</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Checkbox
            onClick={selectAllHandler}
            isChecked={selectedStudentsToAdd.length === studentsNotInStudentGroup?.length}
          >
            Select All
          </Checkbox>
          <Box
            border="1px solid var(--grey-dark)"
            borderRadius="3px"
            maxHeight="50vh"
            minHeight="100px"
            padding="10px"
            overflowY="auto"
          >
            {studentsNotInStudentGroup?.length > 0
              ? studentsNotInThisStudentGroupDisplay
              : 'All students already in group!'}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            backgroundColor="var(--main-color-medium)"
            color="var(--white)"
            mr={3}
            onClick={addExistingHandler}
            isDisabled={selectedStudentsToAdd.length === 0}
          >
            Add To Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddExistingStudentsModal
