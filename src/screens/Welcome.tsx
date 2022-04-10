import * as React from 'react'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'

import { HeaderForWelcome } from 'components/HeaderForWelcome'

const features = [
  {
    heading: 'Selects randomly',
    text:
      'Picker selects students at random until all students have been selected.  Picker then shuffles the students and starts again.  Teachers have the option to display the next few students about to be called',
  },
  {
    heading: 'Displays fun facts',
    text:
      'When a student is selected their name, profile picture, and a fun fact about them is displayed.  Being picked is fun when you get to share something about yourself with the class.',
  },
  {
    heading: 'Tracks day to day',
    text:
      "Picker keeps track of which students have already been selected across sessions.  If some students don't get selected one day, they'll be first to get selected next time.",
  },
]

const steps = [
  {
    heading: 'Students submit profiles',
    text:
      "Students answer fun questions about their favorite movies, foods, hobbies, etc.  Once submitted, teachers review and approve students' profiles before they go live",
  },
  {
    heading: 'Teachers create groups',
    text:
      'Once student profiles have been approved, teachers can add students into different groups.  Each group keeps track of which students have been called.',
  },
]

export const Feature: React.FC<{ text: string; heading: string; elementNumber: number }> = ({
  text,
  heading,
  elementNumber,
}) => {
  return (
    <Flex
      direction="column"
      w={{ base: '100%', lg: `${90 / elementNumber}%` }}
      maxW="40rem"
      justify="space-between"
      color="var(--grey-dark)"
      marginBottom={{ base: '4rem', lg: 'none' }}
    >
      <Heading
        as="h3"
        fontSize="1.8rem"
        flex="1"
        marginBottom="2rem"
        fontWeight="semi-light"
        textTransform="uppercase"
        whiteSpace="nowrap"
      >
        {heading}
      </Heading>
      <Text flex="6" fontSize="1.2rem">
        {text}
      </Text>
    </Flex>
  )
}

const FeatureContainerWithHeading: React.FC<{ heading: string; src?: string }> = ({ children, heading, src }) => {
  return (
    <Flex
      w="100%"
      direction="column"
      as="section"
      style={{ marginBottom: '7rem' }}
      maxW={{ base: '30rem', lg: 'none' }}
    >
      {src && <Image src={src} w="100%" />}
      <Heading as="h2" fontSize="3rem" fontWeight="semi-light">
        {heading}
      </Heading>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'center', lg: 'start' }}
        justify="space-between"
        w="100%"
        marginTop="4rem"
        flexWrap="wrap"
      >
        {children}
      </Flex>{' '}
    </Flex>
  )
}

export const Welcome: React.FC = () => {
  return (
    <>
      <HeaderForWelcome />
      <Flex w="100%" maxW="90rem" align="center" direction="column" margin="0 auto" padding="2rem">
        <Flex direction="column" align="center" marginBottom="7rem" marginTop="2rem">
          <Heading as="h1" fontSize="5rem" marginBottom="1.3rem" fontWeight="light" textAlign="center">
            Welcome to Picker!
          </Heading>
          <Heading
            as="h4"
            textTransform="uppercase"
            color="var(--main-color-dark)"
            fontSize="1.6rem"
            letterSpacing=".3rem"
            textAlign="center"
          >
            The fun, free app for calling on students
          </Heading>
        </Flex>
        <FeatureContainerWithHeading heading="How does Picker work?">
          {steps.map(step => {
            return <Feature key={step.heading} heading={step.heading} text={step.text} elementNumber={steps.length} />
          })}
        </FeatureContainerWithHeading>

        <FeatureContainerWithHeading heading="What does Picker do?">
          {features.map(feature => {
            return (
              <Feature
                key={feature.heading}
                heading={feature.heading}
                text={feature.text}
                elementNumber={features.length}
              />
            )
          })}
        </FeatureContainerWithHeading>
      </Flex>
    </>
  )
}
