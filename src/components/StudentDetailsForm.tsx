import * as React from 'react'
import { Box, Image, Flex, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { FormControlStyled } from 'components/FormControlStyled'
import FooterWithButtons from './UI/FooterWithButtons'
import { useForm } from 'react-hook-form'
import StudentFactInput from 'components/StudentFactInput'
import { studentFactInputs } from 'student-facts'
import { IStudent, INewStudentValues } from 'interfacesAndTypes'
import { useHistory } from 'react-router-dom'

const ContentsBox = styled.div`
  color: var(--grey-dark);
  width: 100%;
  padding: 1.3rem;
  position: relative;
`

interface IStudentToBeUpdated extends IStudent {
  teacherCode?: string
}

export const StudentDetailsForm: React.FC<{
  submitHandler: (values: INewStudentValues) => void
  studentDocument: IStudentToBeUpdated
  submitText: string
}> = ({ submitHandler, studentDocument, submitText }) => {
  const { handleSubmit, register, reset, errors } = useForm()

  const history = useHistory()

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

  return (
    <ContentsBox>
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          width: '100%',
        }}
      >
        <Box width="100%" margin="0 auto 2rem auto" paddingBottom="2rem">
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
            <FormControlStyled isInvalid={errors.name} isRequired>
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
            </FormControlStyled>

            <FormControlStyled isInvalid={errors.profilePic} isRequired>
              <FormLabel color="var(--main-color-medium)" htmlFor="profile-pic">
                Profile Pic
              </FormLabel>
              <Input id="profile-pic" name="profilePic" placeholder="Profile Pic" ref={register({ required: true })} />
              {errors.profilePic && errors.profilePic.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
            </FormControlStyled>

            {studentFactInputs.map(studentFactInput => {
              return <StudentFactInput key={studentFactInput} register={register} studentFactInput={studentFactInput} />
            })}
          </Flex>
        </Box>
        <FooterWithButtons onCancel={() => history.push('/manage-students')} submitText={submitText} />
      </form>
    </ContentsBox>
  )
}
