import * as React from 'react'
import { useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { useParams, useHistory } from 'react-router-dom'
import { StudentParams, IStudent } from 'interfacesAndTypes'
import HeaderWithBackButton from 'components/HeadingBoxWithBackButton'
import { PageContentsBox } from 'styles'
import { Box, Heading, FormControl, FormErrorMessage, FormLabel, Input, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const EditStudent: React.FC = () => {
  const params: StudentParams = useParams()
  const history = useHistory()
  const studentId = params.studentId

  const { handleSubmit, register, reset, errors } = useForm()

  const { data: user } = useUser()
  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const studentRef = teacherRef.collection('students').doc(studentId)

  const studentDocument = useFirestoreDocData<IStudent>(studentRef).data

  // const studentsInStudentGroupsRef = teacherRef
  //   .collection('studentsInStudentGroups')
  //   .where('studentId', '==', studentId)

  const backHandler = () => {
    history.push('/manage-students')
  }

  React.useEffect(() => {
    reset({
      name: studentDocument?.studentName,
      // profilePic: '',  studentDocument.profilePic
      // favoriteFood: '',  studentDocument.favoriteFood
    })
  }, [reset, studentDocument])

  const submitHandler = (values: string[]) => {
    console.log(values)
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
        <form onSubmit={handleSubmit(submitHandler)}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" name="name" placeholder="Name" ref={register({ minLength: 5, required: true })} />
            {errors.name && errors.name.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
            {errors.name && errors.name.type === 'minLength' && <FormErrorMessage>Need more!</FormErrorMessage>}
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
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </PageContentsBox>
  )
}

export default EditStudent
