import * as React from 'react'
import { useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { useParams, useHistory } from 'react-router-dom'
import { StudentParams, IStudent } from 'interfacesAndTypes'
import HeaderWithBackButton from 'components/HeadingBoxWithBackButton'
import { PageContentsBox } from 'styles'
import { Image, Box, Heading, FormControl, FormErrorMessage, FormLabel, Input, Button, Flex } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { INewStudentValues } from 'interfacesAndTypes'

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
    reset({
      studentName: studentDocument?.studentName,
      profilePic: studentDocument?.profilePic,
      favoriteFood: studentDocument?.favoriteFood,
    })
  }, [reset, studentDocument])

  const updateBatch = useFirestore().batch()

  const submitHandler = async (values: INewStudentValues) => {
    const { studentName, profilePic, favoriteFood } = values
    updateBatch.update(studentRef, {
      studentName,
      profilePic,
      favoriteFood,
    })
    const snapshot = await thisStudentInStudentGroupsRef.get()
    if (snapshot.docs.length > 0) {
      snapshot.docs.forEach(doc => {
        updateBatch.update(doc.ref, {
          studentInfo: { studentName, profilePic, favoriteFood },
        })
      })
    }
    updateBatch.commit()
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
            w="75%"
            margin="2rem auto"
            border="1px solid #535353"
            borderRadius="3px"
            boxShadow="2px 4px 6px"
            src={studentDocument?.profilePic}
          ></Image>
        </Box>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Flex direction="column" justify="center" alignItems="center">
            <FormControl isInvalid={errors.name}>
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
            </FormControl>
            <FormControl isInvalid={errors.profilePic}>
              <FormLabel htmlFor="profile-pic">Profile Pic</FormLabel>
              <Input id="profile-pic" name="profilePic" placeholder="Profile Pic" ref={register({ required: true })} />
              {errors.profilePic && errors.profilePic.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.favoriteFood}>
              <FormLabel htmlFor="favorite-food">Favorite Food</FormLabel>
              <Input
                id="favorite-food"
                name="favoriteFood"
                placeholder="Favorite Food"
                ref={register({ required: true })}
              />
              {errors.favoriteFood && errors.favoriteFood.type === 'required' && (
                <FormErrorMessage>Oops!</FormErrorMessage>
              )}
            </FormControl>
            <Button marginTop=".5rem" alignSelf="flex-end" type="submit">
              Submit Changes
            </Button>
          </Flex>
        </form>
      </Box>
    </PageContentsBox>
  )
}

export default EditStudent
