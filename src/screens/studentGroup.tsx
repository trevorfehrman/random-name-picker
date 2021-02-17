import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore, useUser, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import {
  Input,
  Heading,
  Button,
  Box,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { IStudentGroup, IStudent, IStudentInStudentGroup, Params } from 'interfacesAndTypes/interfacesAndTypes'
import styled from '@emotion/styled'
import Student from 'components/Student'
import StudentPreview from 'components/StudentPreview'

interface IStudentToAdd {
  studentId: string
  studentName: string
}

const StudentBox = styled.div`
  margin: auto;
  width: 90%;
  border: 1px solid black;
`

const StudentGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedStudentsToAdd, setSelectedStudentsToAdd] = React.useState<IStudentToAdd[]>([])
  const [studentInput, setStudentInput] = React.useState('')
  const [unselected, setUnselected] = React.useState<IStudentInStudentGroup[]>([])
  const [selectedStudent, setSelectedStudent] = React.useState<IStudentInStudentGroup | null>(null)

  const history = useHistory()
  const params: Params = useParams()
  const studentGroupId = params.groupId

  const { data: user } = useUser()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)

  const studentGroupRef = teacherRef.collection('studentGroups').doc(studentGroupId)
  const studentGroupDocument = useFirestoreDocData<IStudentGroup & { docId: string }>(studentGroupRef, {
    idField: 'docId',
  }).data

  const studentsInStudentGroupsRef = teacherRef.collection('studentsInStudentGroups')

  const studentsInThisStudentGroupRef = studentsInStudentGroupsRef.where('studentGroupId', '==', studentGroupId)
  const studentsInThisStudentGroupDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    studentsInThisStudentGroupRef,
    { idField: 'docId' },
  ).data

  const unselectedStudentsRef = studentsInStudentGroupsRef
    .where('studentGroupId', '==', studentGroupId)
    .where('selected', '==', false)

  const unselectedStudentsDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    unselectedStudentsRef,
    { idField: 'docId' },
  ).data

  const studentsRef = teacherRef.collection('students')
  const studentDocuments = useFirestoreCollectionData<IStudent & { docId: string }>(studentsRef, { idField: 'docId' })
    .data

  React.useEffect(() => {
    console.log(unselectedStudentsDocuments)
    setUnselected(unselectedStudentsDocuments)
  }, [unselectedStudentsDocuments])

  const addStudentHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (studentInput === '') {
      return
    }
    try {
      const studentResult = await studentsRef.add({
        studentName: studentInput,
      })
      console.log(studentResult)
      studentsInStudentGroupsRef
        .add({
          studentId: studentResult.id,
          studentName: studentInput,
          studentGroupId,
          studentGroupName: studentGroupDocument.studentGroupName,
          selected: false,
        })
        .catch(err => console.log(err))
      setStudentInput('')
    } catch (err) {
      console.log(err)
    }
  }

  const editStudentGroupNameHandler = (value: string) => {
    console.log(value)
    studentGroupRef.update({ studentGroupName: value }).catch(err => {
      console.log(err)
    })
  }

  const addBatch = useFirestore().batch()

  const addExistingHandler = () => {
    console.log(selectedStudentsToAdd)
    selectedStudentsToAdd.forEach(student => {
      const newStudentInStudentGroupRef = studentsInStudentGroupsRef.doc()
      addBatch.set(newStudentInStudentGroupRef, {
        studentName: student.studentName,
        studentId: student.studentId,
        studentGroupId: studentGroupDocument.docId,
        studentGroupName: studentGroupDocument.studentGroupName,
        selected: false,
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

  const backHandler = () => {
    history.push('/')
  }

  const selectHandler = () => {
    const randomIndex = Math.floor(Math.random() * unselected.length)
    const selectedStudent = unselected[randomIndex]
    setSelectedStudent(selectedStudent)
    if (unselected.length === 1) {
      resetSelectedStatus()
    } else {
      studentsInStudentGroupsRef
        .doc(selectedStudent.docId)
        .update({ selected: true })
        .catch(err => console.log(err))
    }
  }

  const updateBatch = useFirestore().batch()

  const resetSelectedStatus = () => {
    studentsInThisStudentGroupRef
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log(doc, 'made it here')
          updateBatch.update(doc.ref, { selected: false })
        })
        return updateBatch.commit().catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  const manageRouteHandler = () => {
    history.push(`/manage-student-group/${studentGroupId}`)
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box position="relative" w="90%" textAlign="center">
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="back"
            position="absolute"
            left={0}
            top="10px"
            onClick={backHandler}
          />
          {studentGroupDocument && (
            <Editable
              defaultValue={studentGroupDocument.studentGroupName}
              onSubmit={editStudentGroupNameHandler}
              fontSize="2.5rem"
              margin="auto"
            >
              <EditablePreview _hover={{ cursor: 'pointer' }} />
              <EditableInput />
            </Editable>
          )}
        </Box>

        <form onSubmit={addStudentHandler}>
          <label htmlFor="student-name">Name:</label>
          <Input
            placeholder="Student name"
            id="student-name"
            aria-label="student-name"
            onChange={e => setStudentInput(e.target.value)}
            value={studentInput}
          ></Input>
          <Button aria-label="add" type="submit">
            Add New
          </Button>
          <Button onClick={onOpen}>Add Existing</Button>
          <Button onClick={selectHandler}>Select Name</Button>
          <Button onClick={manageRouteHandler}>Manage Students</Button>
        </form>
      </Box>
      <Flex h="7rem" w="100%" justify="center" align="center">
        {selectedStudent === null ? (
          <Heading as="h3" fontSize="3rem">
            {'click "Select Name"'}
          </Heading>
        ) : (
          <Heading as="h1" fontSize="6rem">
            {selectedStudent?.studentName}
          </Heading>
        )}
      </Flex>
      <Heading as="h2" margin="15px 0 0 5%">
        Unselected Students:
      </Heading>
      <StudentBox>
        <Box>
          {unselected?.map(doc => {
            return <Student key={doc.studentId} studentName={doc.studentName} studentInStudentGroupId={doc.docId} />
          })}
        </Box>
      </StudentBox>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Existing Students</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box border="1px solid black" maxHeight="500px" minHeight="100px" padding="10px" overflowY="auto">
              {studentDocuments
                ?.filter(student => {
                  let studentIsInClass = false
                  studentsInThisStudentGroupDocuments?.forEach(studentInGroup => {
                    if (studentInGroup.studentId === student.docId) {
                      studentIsInClass = true
                    }
                  })
                  return !studentIsInClass
                })
                .map(doc => {
                  return (
                    <StudentPreview
                      key={doc.docId}
                      studentName={doc.studentName}
                      studentId={doc.docId}
                      selectedStudentsToAdd={selectedStudentsToAdd}
                      setSelectedStudentsToAdd={setSelectedStudentsToAdd}
                    />
                  )
                })}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={addExistingHandler}>
              Add To Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default StudentGroup
