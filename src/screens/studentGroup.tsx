import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore, useUser, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import {
  Input,
  Button,
  Box,
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
import { IStudentGroup, IStudent } from 'interfaces and types/IStudentGroup'
import styled from '@emotion/styled'
import Student from 'components/Student'
import StudentPreview from 'components/StudentPreview'

interface Params {
  groupId: string
}

interface IStudentToAdd {
  studentId: string
  studentName: string
}

interface IStudentInStudentGroup {
  docId: string
  studentId: string
  studentName: string
  studentGroupId: string
  studentGroupName: string
  selected: boolean
}

const StudentBox = styled.div`
  margin: auto;
  width: 90%;
  border: 1px solid black;
  min-height: 100px;
`

const StudentGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedStudentsToAdd, setSelectedStudentsToAdd] = React.useState<IStudentToAdd[]>([])

  const [studentInput, setStudentInput] = React.useState('')

  const [unselected, setUnselected] = React.useState<IStudentInStudentGroup[]>([])

  const [selected, setSelected] = React.useState<IStudentInStudentGroup | null>(null)

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

  const batch = useFirestore().batch()

  const addExistingHandler = () => {
    console.log(selectedStudentsToAdd)
    selectedStudentsToAdd.forEach(student => {
      const newStudentInStudentGroupRef = studentsInStudentGroupsRef.doc()
      batch.set(newStudentInStudentGroupRef, {
        studentName: student.studentName,
        studentId: student.studentId,
        studentGroupId: studentGroupDocument.docId,
        studentGroupName: studentGroupDocument.studentGroupName,
        selected: false,
      })
    })
    return batch
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
    if (unselected.length === 0) return console.log('no more names')
    const randomIndex = Math.floor(Math.random() * unselected.length)
    const selectedStudent = unselected[randomIndex]
    // const updatedUnselected = unselected.filter((student, index) => {
    //   return index !== randomIndex
    // })
    studentsInStudentGroupsRef
      .doc(selectedStudent.docId)
      .update({ selected: true })
      .catch(err => console.log(err))
    // setUnselected(updatedUnselected)
    setSelected(selectedStudent)
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <h1>
          {unselected?.map(doc => {
            return <div key={doc.studentId}>{doc.studentName}</div>
          })}
        </h1>
        <h1>{selected?.studentName}</h1>
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
        </form>
        <Button onClick={selectHandler}>Select Name</Button>
      </Box>
      <StudentBox>
        {studentsInThisStudentGroupDocuments?.map(doc => {
          return <Student key={doc.studentId} studentName={doc.studentName} studentInStudentGroupId={doc.docId} />
        })}
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
            <Button variant="ghost">Cancel</Button>
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
