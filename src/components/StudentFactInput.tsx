import * as React from 'react'
import { FormLabel, Input } from '@chakra-ui/react'
import { FormControlWithMargin } from 'styles'

type StudentFactInputProps = {
  // the type described in the error for register was so long it wasn't even all displayed
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  register: any
  camelCase: string
  display: string
}

const StudentFactInput: React.FC<StudentFactInputProps> = ({ register, camelCase, display }) => {
  return (
    <>
      <FormControlWithMargin>
        <FormLabel htmlFor={camelCase}>{display}</FormLabel>
        <Input id={camelCase} name={camelCase} placeholder={display} ref={register} />
      </FormControlWithMargin>
    </>
  )
}

export default StudentFactInput
