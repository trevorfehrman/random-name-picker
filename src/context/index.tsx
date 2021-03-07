import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'
import theme from 'theme'

import { BrowserRouter as Router } from 'react-router-dom'

const firebaseConfig = {
  apiKey: 'AIzaSyB4VVwKvIOGa6n_6TBgp4mMW8I1xd4NEU4',
  authDomain: 'random-name-picker-ee478.firebaseapp.com',
  projectId: 'random-name-picker-ee478',
  storageBucket: 'random-name-picker-ee478.appspot.com',
  messagingSenderId: '862331274849',
  appId: '1:862331274849:web:a62cbad7f22eb6a4ca4c20',
  measurementId: 'G-MSVM1GZCYB',
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
