import * as React from 'react'
import 'firebase/firestore'

import { Switch, Route } from 'react-router-dom'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import { MyComponent } from 'components/MyComponent'

const AuthenticatedApp: React.FC = () => {
  const user = useUser()

  const testCollectionRef = useFirestore().collection('test')
  const testCollectionDocuments = useFirestoreCollectionData(testCollectionRef, { idField: 'docId' })
  console.log({ testCollectionDocuments, user })

  return (
    <Switch>
      <Route path="/">
        <MyComponent myProp="hi" />
      </Route>
    </Switch>
  )
}

export { AuthenticatedApp }
