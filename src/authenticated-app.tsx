import * as React from 'react'
import 'firebase/firestore'

import { Switch, Route } from 'react-router-dom'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { useForm } from 'react-hook-form'

import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'

type FormData = {
  name: string
}

const AuthenticatedApp: React.FC = () => {
  const user = useUser()

  const testCollectionRef = useFirestore().collection('test')
  const testCollectionDocuments = useFirestoreCollectionData(testCollectionRef, { idField: 'docId' })
  console.log({ testCollectionDocuments, user })

  const { handleSubmit, errors, register, formState } = useForm<FormData>()

  function onSubmit(values: FormData) {
    console.log(values)
  }

  function validateName(value: string) {
    console.log(value)
    if (value === 'Steve') {
      return 'Fuck you, Steve'
    } else {
      return true
    }
  }

  return (
    <Switch>
      <Route path="/">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input name="name" placeholder="name" ref={register({ validate: validateName })} />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>
          <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Route>
    </Switch>
  )
}

export { AuthenticatedApp }
