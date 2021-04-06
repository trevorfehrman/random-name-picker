import * as React from 'react'
import { useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { useParams, useHistory } from 'react-router-dom'
import HeaderWithBackButton from 'components/HeadingBoxWithBackButton'
import { Image, Box, Heading, FormErrorMessage, FormLabel, Input, Flex } from '@chakra-ui/react'
import { camelCase } from 'lodash'
import { useForm } from 'react-hook-form'
import { INewStudentValues, StudentParams, IStudent } from 'interfacesAndTypes'
import { FormBox, FormControlWithMargin, PageContentsBox } from 'styles'
import StudentFactInput from 'components/StudentFactInput'
import { studentFactInputs, createStudentFactsObject } from 'student-facts'
import SubmitButton from 'components/UI/SubmitButton'

const EditStudent: React.FC = () => {
  const params: StudentParams = useParams()
  const history = useHistory()
  const studentId = params.studentId

  const { handleSubmit, register, reset, errors } = useForm()

  const { data: user } = useUser()
  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const studentRef = teacherRef.collection('students').doc(studentId)

  const studentDocument = useFirestoreDocData<IStudent>(studentRef).data

  const thisStudentInStudentGroupsRef = teacherRef
    .collection('studentsInStudentGroups')
    .where('studentId', '==', studentId)

  // const studentsInStudentGroupsRef = teacherRef
  //   .collection('studentsInStudentGroups')
  //   .where('studentId', '==', studentId)

  const backHandler = () => {
    history.push('/manage-students')
  }

  React.useEffect(() => {
    const resetObject: Record<string, unknown> = {}
    studentFactInputs.forEach(studentFactInput => {
      const camelCaseStudentFactInput = camelCase(studentFactInput)
      if (studentDocument?.studentFacts[camelCaseStudentFactInput]) {
        resetObject[camelCaseStudentFactInput] = studentDocument?.studentFacts[camelCaseStudentFactInput].value
      }
    })
    console.log(resetObject)
    reset({
      studentName: studentDocument?.studentName,
      profilePic: studentDocument?.profilePic,
      ...resetObject,
    })
  }, [reset, studentDocument])

  const updateBatch = useFirestore().batch()

  const submitHandler = async (values: INewStudentValues) => {
    // update the 'students' collection with a studentFacts object
    const { studentName, profilePic } = values
    const studentFacts = createStudentFactsObject(values)
    updateBatch.update(studentRef, {
      studentName,
      profilePic,
      studentFacts,
    })

    // update the 'studentsInStudentsGroup' collection with a studentFacts array (for easy random selection)
    const studentFactsArray = Object.values(studentFacts).filter(studentFact => studentFact.value !== '')
    const snapshot = await thisStudentInStudentGroupsRef.get()
    if (snapshot.docs.length > 0) {
      snapshot.docs.forEach(doc => {
        updateBatch.update(doc.ref, {
          studentInfo: { studentName, profilePic, studentFacts: studentFactsArray },
        })
      })
    }
    updateBatch.commit()
    history.push('/manage-students')
  }

  return (
    <PageContentsBox>
      <HeaderWithBackButton backHandler={backHandler}>
        <Box w="100%" textAlign="center">
          <Heading margin="0 auto" as="h1">
            {studentDocument?.studentName}
          </Heading>
        </Box>
      </HeaderWithBackButton>
      <Box>
        <Box>
          <Image
            w="18rem"
            h="18rem"
            fit="cover"
            margin="2rem auto"
            border="1px solid var(--grey-dark)"
            borderRadius="3px"
            boxShadow="2px 4px 6px"
            src={studentDocument?.profilePic}
          ></Image>
        </Box>
        <FormBox>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Flex direction="column" justify="center" alignItems="center" _notLast={{ marginBottom: '1rem' }}>
              <FormControlWithMargin isInvalid={errors.name}>
                <FormLabel htmlFor="studentName">Name</FormLabel>
                <Input
                  id="studentName"
                  name="studentName"
                  placeholder="Student Name"
                  ref={register({ minLength: 5, required: true })}
                />
                {errors.studentName && errors.studentName.type === 'required' && (
                  <FormErrorMessage>Oops!</FormErrorMessage>
                )}
                {errors.studentName && errors.studentName.type === 'minLength' && (
                  <FormErrorMessage>Need more!</FormErrorMessage>
                )}
              </FormControlWithMargin>

              <FormControlWithMargin isInvalid={errors.profilePic}>
                <FormLabel htmlFor="profile-pic">Profile Pic</FormLabel>
                <Input
                  id="profile-pic"
                  name="profilePic"
                  placeholder="Profile Pic"
                  ref={register({ required: true })}
                />
                {errors.profilePic && errors.profilePic.type === 'required' && (
                  <FormErrorMessage>Oops!</FormErrorMessage>
                )}
              </FormControlWithMargin>

              {studentFactInputs.map(studentFactInput => {
                return (
                  <StudentFactInput key={studentFactInput} register={register} studentFactInput={studentFactInput} />
                )
              })}

              <SubmitButton text="Submit Changes" />
            </Flex>
          </form>
        </FormBox>
      </Box>
    </PageContentsBox>
  )
}

export default EditStudent
