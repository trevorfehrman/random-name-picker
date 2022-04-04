import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'
import theme from 'theme'

import { BrowserRouter as Router } from 'react-router-dom'

const firebaseConfig = {
  apiKey: 'AIzaSyAnxiAndOT2JgrBFheVuvZGqa7yXSBhC6c',
  authDomain: 'picker-8c90f.firebaseapp.com',
  projectId: 'picker-8c90f',
  storageBucket: 'picker-8c90f.appspot.com',
  messagingSenderId: '794267331427',
  appId: '1:794267331427:web:67a7fa473f6040649e0156',
  measurementId: 'G-79LPC7HWSJ',
}

const AppProviders: React.FC = ({ children }) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SuspenseWithPerf fallback={<div>Loading...</div>} traceId={'loading-app-status'}>
        <ChakraProvider resetCSS theme={theme}>
          <Router>{children}</Router>
        </ChakraProvider>
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  )
}

export { AppProviders }
