import { FormControl } from '@chakra-ui/react'
import * as React from 'react'
import { ComponentWithAs, FormControlProps } from '@chakra-ui/react'

export const FormControlStyled: ComponentWithAs<'div', FormControlProps> = props => {
  return <FormControl marginBottom="1.5rem" {...props} />
}
