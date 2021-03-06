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
  outline,
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
import Header from 'components/Header'

type FormData = {
  studentGroupName: string
  studentGroup: string
}

const StudentGroupNameForm = styled.form`
  width: 16rem;
  max-width: 90%;
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
  const [errors, setErrors] = React.useState<string[]>([])

  // const { handleSubmit, errors, register, formState } = useForm()

  // function validateName(value: string) {
  //   console.log('this is running')
  //   if (!value) {
  //     return 'Name is required'
  //   } else if (value !== 'Naruto') {
  //     return "Jeez! You're not a fan 😱"
  //   } else true
  // }

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
    unselectedStudentsDocuments && setUnselected(unselectedStudentsDocuments.sort((a, b) => a.order - b.order))
  }, [unselectedStudentsDocuments])

  const backHandler = () => {
    history.push('/')
  }

  const selectHandler = () => {
    const selectedStudent = unselected[0]
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
    const orderArray: number[] = []
    for (let i = 1; i <= studentsInThisStudentGroupDocuments.length; i++) {
      orderArray[i - 1] = i
    }
    console.log(orderArray)
    studentsInThisStudentGroupRef
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log(doc, 'made it here')
          const randomOrderValue = orderArray.splice(Math.floor(Math.random() * orderArray.length), 1)
          updateBatch.update(doc.ref, { selected: false, order: randomOrderValue[0] })
        })
        return updateBatch.commit().catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  const showAllHandler = () => {
    history.push(`/show-all-students/${studentGroupId}`)
  }

  const editStudentGroupNameHandler = (value: string) => {
    console.log(value)
    // if (values.length > 22) {
    //   console.log('hello?')
    //   return
    // }
    studentGroupRef.update({ studentGroupName: value }).catch(err => {
      console.log(err)
    })
  }

  const checkForErrors = (value: string) => {
    const errorArray = []
    if (value === '') {
      errorArray.push('Please enter a group name')
    }
    if (value.length >= 35) {
      errorArray.push('Please enter a value with less than 35 characters')
    }
    setErrors(errorArray)
    if (errorArray.length > 0) {
      return true
    } else {
      return false
    }
  }

  const mySubmitHandler = (value: string) => {
    const thereAreErrors = checkForErrors(value)
    if (!thereAreErrors) {
      editStudentGroupNameHandler(value)
    }
  }

  return (
    <PageContentsBox>
      <HeadingBoxWithBackButton backHandler={backHandler}>
        {/* <EditableStudentGroupName studentGroupRef={studentGroupRef} studentGroupDocument={studentGroupDocument} /> */}
        <Flex justify="flex-end">
          <StudentGroupNameForm>
            <FormControl isInvalid={errors.length > 0} display="flex" flexDirection="column" alignItems="flex-end">
              {/* {studentGroupDocument && (
                <Input
                  defaultValue={studentGroupDocument.studentGroupName}
                  fontSize="1.2rem"
                  fontWeight="bolder"
                  w="100%"
                  minWidth="200px"
                  textAlign="right"
                  color="blue.900"
                  // onBlur={handleSubmit(editStudentGroupNameHandler)}
                  // onSubmit={mySubmitHandler}
                  name="studentGroup"
                  ref={register({ maxLength: 22, required: true })}
                />
              )}
              <FormErrorMessage>
                {errors.studentGroup?.type === 'maxLength' && <p>Please pick a name with 22 characters or less</p>}
              </FormErrorMessage>
              <FormErrorMessage>
                {errors.studentGroup?.type === 'required' && <p>Please put something</p>}
              </FormErrorMessage> */}
              {studentGroupDocument && (
                <Editable
                  defaultValue={studentGroupDocument.studentGroupName}
                  placeholder="Student Group Name"
                  w="100%"
                  textAlign="right"
                  color="blue.900"
                  fontSize="1.2rem"
                  fontWeight="bolder"
                  // onBlur={handleSubmit(editStudentGroupNameHandler)}
                  onSubmit={mySubmitHandler}
                >
                  <EditablePreview _hover={{ cursor: 'pointer' }} />
                  <EditableInput />
                  {/* ref={register({ maxLength: 22, required: true })}  */}
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
              {errors.map(errorMessage => {
                return (
                  <FormErrorMessage margin={0} key={errorMessage}>
                    {errorMessage}
                  </FormErrorMessage>
                )
              })}
              {/* <FormErrorMessage>
                {errors.studentGroupName?.type === 'maxLength' && <p>Please pick a name with 22 characters or less</p>}
              </FormErrorMessage>
              <FormErrorMessage>
                {errors.studentGroupName?.type === 'required' && <p>Please put something</p>}
              </FormErrorMessage> */}
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
