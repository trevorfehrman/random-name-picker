import * as React from 'react'
import { useAuth } from 'reactfire'
import { StyledFirebaseAuth } from 'react-firebaseui'

const Login: React.FC = () => {
  const auth = useAuth

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
}

export { Login }
