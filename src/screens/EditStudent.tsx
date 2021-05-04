import * as React from 'react'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { useParams, useHistory } from 'react-router-dom'
import { Image, Box, FormErrorMessage, FormLabel, Input, Flex } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { INewStudentValues, StudentParams, IStudent } from 'interfacesAndTypes'
import { FormControlWithMargin } from 'styles'
import StudentFactInput from 'components/StudentFactInput'
import { studentFactInputs, createStudentFactsObject } from 'student-facts'
import FooterWithButtons from 'components/UI/FooterWithButtons'
import styled from '@emotion/styled'
import { useStudents, useTeacherRef } from 'helpers/firestoreHooks'

const ContentsBox = styled.div`
  color: var(--grey-dark);
  width: 100%;
  height: 100vh;
  padding: 1.3rem;
  position: relative;
`

const EditStudent: React.FC = () => {
  const params: StudentParams = useParams()
  const studentId = params.studentId

  const history = useHistory()

  const { handleSubmit, register, reset, errors } = useForm()

  const teacherRef = useTeacherRef()
  const { studentsRef } = useStudents()
  const studentRef = studentsRef.doc(studentId)

  const studentDocument = useFirestoreDocData<IStudent>(studentRef).data

  const thisStudentInStudentGroupsRef = teacherRef
    .collection('studentsInStudentGroups')
    .where('studentId', '==', studentId)

  React.useEffect(() => {
    const resetObject: Record<string, unknown> = {}
    studentFactInputs.forEach(studentFactInput => {
      if (studentDocument?.studentFacts[studentFactInput]) {
        resetObject[studentFactInput] = studentDocument?.studentFacts[studentFactInput]
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
    const studentFactsArray: { [key: string]: string }[] = []
    Object.keys(studentFacts).forEach(key => {
      if (studentFacts[key] !== '') {
        studentFactsArray.push({
          title: key,
          value: studentFacts[key],
        })
      }
    })
    console.log(studentFactsArray)
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

  const onCancel = () => {
    history.push('/manage-students')
  }

  return (
    <ContentsBox>
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          width: '100%',
        }}
      >
        <Box width="100%" overflowY="auto" maxHeight="70%" margin="0 auto 2rem auto" paddingBottom="2rem" height="95vh">
          <Box>
            <Image
              w="9.5rem"
              h="9.5rem"
              fit="cover"
              margin="1rem auto 0 auto"
              borderRadius="3px"
              src={studentDocument?.profilePic}
            ></Image>
          </Box>

          <Flex
            width="100%"
            maxWidth="50rem"
            direction="column"
            justify="center"
            alignItems="center"
            margin="auto"
            padding="1rem"
            _notLast={{ marginBottom: '1rem' }}
          >
            <FormControlWithMargin isInvalid={errors.name} isRequired>
              <FormLabel color="var(--main-color-medium)" htmlFor="studentName">
                Name
              </FormLabel>
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

            <FormControlWithMargin isInvalid={errors.profilePic} isRequired>
              <FormLabel color="var(--main-color-medium)" htmlFor="profile-pic">
                Profile Pic
              </FormLabel>
              <Input id="profile-pic" name="profilePic" placeholder="Profile Pic" ref={register({ required: true })} />
              {errors.profilePic && errors.profilePic.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
            </FormControlWithMargin>

            {studentFactInputs.map(studentFactInput => {
              return <StudentFactInput key={studentFactInput} register={register} studentFactInput={studentFactInput} />
            })}

            {/* <SubmitButton text="Submit Changes" /> */}
          </Flex>
        </Box>
        <FooterWithButtons onCancel={onCancel} submitText="SUBMIT CHANGES" />
      </form>
    </ContentsBox>
  )
}

export default EditStudent
