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

  const { handleSubmit, register } = useForm()

  const { data: user } = useUser()
  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const studentRef = teacherRef.collection('students').doc(studentId)

  const studentDocument = useFirestoreDocData<IStudent>(studentRef).data

  const studentsInStudentGroupsRef = teacherRef
    .collection('studentsInStudentGroups')
    .where('studentId', '==', studentId)

  const backHandler = () => {
    history.push('/manage-students')
  }

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
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" name="name" placeholder="Name" ref={register}></Input>
            <FormLabel htmlFor="profile-pic">Profile Pic</FormLabel>
            <Input id="profile-pic" name="profilePic" placeholder="Profile Pic" ref={register}></Input>
            <FormLabel htmlFor="favorite-food">Favorite Food</FormLabel>
            <Input id="favorite-food" name="favoriteFood" placeholder="Favorite Food" ref={register}></Input>
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
      </Box>
    </PageContentsBox>
  )
}

export default EditStudent
