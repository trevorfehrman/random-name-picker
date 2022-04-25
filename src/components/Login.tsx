import * as React from 'react'
import { useFirestore } from 'reactfire'
import firebase from 'firebase'
import { Button } from '@chakra-ui/button'

const createTeacherCode = (length: number) => {
  const charArray = []
  let classroomCode = ''
  for (let i = 48; i <= 57; i++) {
    charArray.push(String.fromCharCode(i))
  }
  for (let i = 65; i <= 90; i++) {
    charArray.push(String.fromCharCode(i))
  }
  for (let i = 1; i <= length; i++) {
    classroomCode += charArray[Math.floor(Math.random() * charArray.length)]
  }
  return classroomCode
}

const Login: React.FC = () => {
  console.log('login page')

  const auth = firebase.auth()

  const google = new firebase.auth.GoogleAuthProvider()

  const teacherCollectionRef = useFirestore().collection('teachers')

  function handleSignIn() {
    auth
      .signInWithPopup(google)
      .then(result => {
        if (!result.user) {
          return
        }
        console.log('user', result.user)
        const { displayName, email, uid, photoURL } = result.user
        console.log(result)
        return teacherCollectionRef.doc(uid).set({
          displayName,
          email,
          photoURL,
          teacherCode: createTeacherCode(6),
          uid,
        })
      })
      .then(result => {
        console.log('ooooh', result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // const uiConfig = {
  //   signInFlow: 'popup',
  //   signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
  //   callbacks: {
  //     // Returning false avoids redirects after sign-in.
  //     // signInSuccess: (result: any) => {
  //     //   console.log('this ran')
  //     // },
  //     signInSuccessWithAuthResult: (result: any) => {
  //       const { displayName, email, uid, photoURL } = result.data
  //       console.log('on login')
  //       teacherCollectionRef
  //         .doc(uid)
  //         .set({
  //           displayName,
  //           email,
  //           photoURL,
  //           teacherCode: createTeacherCode(6),
  //           uid,
  //         })
  //         .then(result => {
  //           console.log(result)
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         })
  //       return false
  //     },
  //   },
  // }

  // return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />

  return <Button onClick={handleSignIn}>SignIn</Button>
}

export { Login }
