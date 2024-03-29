import * as React from 'react'
import { FormLabel, Input } from '@chakra-ui/react'
import { FormControlStyled } from 'components/FormControlStyled'

type StudentFactInputProps = {
  // the type described in the error for register was so long it wasn't even all displayed
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  register: any
  studentFactInput: string
}

const StudentFactInput: React.FC<StudentFactInputProps> = ({ register, studentFactInput }) => {
  // const camelCaseStudentFactInput = camelCase(studentFactInput)

  return (
    <>
      <FormControlStyled>
        <FormLabel color="var(--main-color-medium)" htmlFor={studentFactInput}>
          {studentFactInput}
        </FormLabel>
        <Input id={studentFactInput} name={studentFactInput} placeholder={studentFactInput} ref={register} />
      </FormControlStyled>
    </>
  )
}

export default StudentFactInput
