import * as React from 'react'
import { Flex, Image, Heading } from '@chakra-ui/react'
import { ISharedStudentProfile } from 'interfacesAndTypes'

export const ProfilePreview: React.FC<{
  sharedProfile: ISharedStudentProfile
  handleReviewProfile: (profileId: string) => void
}> = ({ sharedProfile, handleReviewProfile, children }) => {
  return (
    <Flex
      key={sharedProfile.docId}
      onClick={() => handleReviewProfile(sharedProfile.docId)}
      border="1px solid var(--grey-medium)"
      w="100%"
      padding="1rem"
      borderRadius="5px"
      cursor="pointer"
      align="center"
      justify="space-between"
    >
      <Flex align="center">
        <Image src={sharedProfile.profilePic} w="70px" h="70px" borderRadius="50%" marginRight="1rem" />
        <Heading as="h3" fontSize="1.3rem">
          {sharedProfile.studentName}
        </Heading>
      </Flex>
      {children}
    </Flex>
  )
}
