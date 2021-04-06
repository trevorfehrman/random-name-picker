import * as React from 'react'
import { FormLabel, Input } from '@chakra-ui/react'
import { FormControlWithMargin } from 'styles'
import { camelCase } from 'lodash'

type StudentFactInputProps = {
  // the type described in the error for register was so long it wasn't even all displayed
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  register: any
  studentFactInput: string
}

const StudentFactInput: React.FC<StudentFactInputProps> = ({ register, studentFactInput }) => {
  const camelCaseStudentFactInput = camelCase(studentFactInput)

  return (
    <>
      <FormControlWithMargin>
        <FormLabel htmlFor={camelCaseStudentFactInput}>{studentFactInput}</FormLabel>
        <Input
          id={camelCaseStudentFactInput}
          name={camelCaseStudentFactInput}
          placeholder={studentFactInput}
          ref={register}
        />
      </FormControlWithMargin>
    </>
  )
}

export default StudentFactInput
