import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useHistory } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore, useUser, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import {
  Button,
  Flex,
  useDisclosure,
  Icon,
  IconButton,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'
import { BiExpand } from 'react-icons/bi'
import { IStudentGroup, IStudent, IStudentInStudentGroup, Params } from 'interfacesAndTypes'
import FullScreenDisplay from 'components/FullScreenDisplay'
import AddExistingStudentsModal from 'components/AddExisitingStudentsModal'
import NewStudent from 'components/NewStudent'
import { PageContentsBox } from 'styles'
import HeadingBoxWithBackButton from 'components/HeadingBoxWithBackButton'
import EditableStudentGroupName from 'components/EditableStudentGroupName'
import NameDisplay from 'components/NameDisplay'
import UnselectedStudents from 'components/UnselectedStudents'
import styled from '@emotion/styled'

type FormData = {
  studentGroupName: string
}

const StudentGroupNameForm = styled.form`
  width: 16rem;
  max-width: 85%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
`

const StudentGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [unselected, setUnselected] = React.useState<IStudentInStudentGroup[]>([])
  const [selectedStudent, setSelectedStudent] = React.useState<IStudentInStudentGroup | null>(null)
  const [fullScreenDisplayIsOpen, setFullScreenDisplayIsOpen] = React.useState(false)
  const [isTimeToShuffle, setIsTimeToShuffle] = React.useState(false)

  const { handleSubmit, errors, register, formState } = useForm()

  function validateName(value: string) {
    console.log('this is running')
    if (!value) {
      return 'Name is required'
    } else if (value !== 'Naruto') {
      return "Jeez! You're not a fan 😱"
    } else true
  }

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

  const backHandler = () => {
    history.push('/')
  }

  const selectHandler = () => {
    if (studentsInThisStudentGroupDocuments.length === 0) {
      return
    }
    const randomIndex = Math.floor(Math.random() * unselected.length)
    const selectedStudent = unselected[randomIndex]
    setSelectedStudent(selectedStudent)
    if (unselected.length <= 1) {
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

  const showAllHandler = () => {
    history.push(`/show-all-students/${studentGroupId}`)
  }

  const editStudentGroupNameHandler = (values: FormData) => {
    console.log(values)
    // if (values.length > 22) {
    //   console.log('hello?')
    //   return
    // }
    studentGroupRef.update({ studentGroupName: values.studentGroupName }).catch(err => {
      console.log(err)
    })
  }

  const mySubmitHandler = () => {
    handleSubmit(editStudentGroupNameHandler)()
  }

  return (
    <PageContentsBox>
      <HeadingBoxWithBackButton backHandler={backHandler}>
        {/* <EditableStudentGroupName studentGroupRef={studentGroupRef} studentGroupDocument={studentGroupDocument} /> */}
        <Flex justify="flex-end">
          <StudentGroupNameForm name="myForm" onSubmit={handleSubmit(editStudentGroupNameHandler)}>
            <FormControl isInvalid={errors.studentGroupName}>
              {studentGroupDocument && (
                <Editable
                  defaultValue={studentGroupDocument.studentGroupName}
                  fontSize="1.2rem"
                  fontWeight="bolder"
                  w="100%"
                  minWidth="200px"
                  textAlign="right"
                  color="blue.900"
                  // onBlur={handleSubmit(editStudentGroupNameHandler)}
                  onSubmit={mySubmitHandler}
                >
                  <EditablePreview _hover={{ cursor: 'pointer' }} />
                  <EditableInput name="studentGroupName" ref={register({ maxLength: 22, required: true })} />
                </Editable>
                // <Input
                //   name="studentGroupName"
                //   variant="unstyled"
                //   defaultValue={studentGroupDocument.studentGroupName}
                //   maxWidth="90%"
                //   textAlign="right"
                //   border="none"
                //   fontSize="1.3rem"
                //   fontWeight="bold"
                //   color="blue.900"
                //   _after={{ backgroundColor: 'white' }}
                //   _hover={{ border: '1px solid black' }}
                //   ref={register({ maxLength: 22, required: true })}
                //   onBlur={handleSubmit(editStudentGroupNameHandler)}
                // />
              )}
              <FormErrorMessage>
                {errors.studentGroupName?.type === 'maxLength' && <p>Please pick a name with 22 characters or less</p>}
              </FormErrorMessage>
              <FormErrorMessage>
                {errors.studentGroupName?.type === 'required' && <p>Please put something</p>}
              </FormErrorMessage>
            </FormControl>
          </StudentGroupNameForm>
        </Flex>
      </HeadingBoxWithBackButton>
      <NewStudent
        openAddExistingModalHandler={onOpen}
        studentsRef={studentsRef}
        studentsInStudentGroupsRef={studentsInStudentGroupsRef}
        studentGroupDocument={studentGroupDocument}
        studentGroupId={studentGroupId}
      />

      <NameDisplay
        selectedStudent={selectedStudent}
        setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
        selectHandler={selectHandler}
      />

      {/* <Flex flexWrap="wrap" justifyContent="space-evenly" width="100%" padding="1rem">
        <Button onClick={showAllHandler}>Show All</Button>
        <Button colorScheme="blue" onClick={selectHandler}>
          Select Name
        </Button>
      </Flex> */}

      <UnselectedStudents unselected={unselected} studentGroupId={studentGroupId} />

      <AddExistingStudentsModal
        onClose={onClose}
        isOpen={isOpen}
        studentDocuments={studentDocuments}
        studentsInThisStudentGroupDocuments={studentsInThisStudentGroupDocuments}
        studentsInStudentGroupsRef={studentsInStudentGroupsRef}
        studentGroupDocument={studentGroupDocument}
      />

      <FullScreenDisplay
        modalHeadingText="FullScreenMode"
        onClose={() => setFullScreenDisplayIsOpen(false)}
        isOpen={fullScreenDisplayIsOpen}
        selectHandler={selectHandler}
      >
        <NameDisplay
          selectedStudent={selectedStudent}
          isFullScreen
          setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
          selectHandler={selectHandler}
        />
      </FullScreenDisplay>
    </PageContentsBox>
  )
}

export default StudentGroup
