import * as React from 'react'
import { ISharedStudentProfile } from 'interfacesAndTypes'
import { Flex, Heading, Button } from '@chakra-ui/react'
import { useHistory } from 'react-router'
import { BodyBox } from 'styles'
import { useSharedProfiles, useStudents } from 'helpers/firestoreHooks'
import { ProfilePreview } from 'components/ProfilePreview'

export const ReviewNewProfiles: React.FC = () => {
  const history = useHistory()

  const [existingProfiles, setExistingProfiles] = React.useState<ISharedStudentProfile[]>([])
  const [newProfiles, setNewProfiles] = React.useState<ISharedStudentProfile[]>([])

  const { studentDocuments } = useStudents()

  const { sharedProfiles } = useSharedProfiles()

  const handleReviewNewProfile = (profileId: string) => {
    console.log(profileId)
    history.push(`/review-new-profile/${profileId}`)
  }

  const handleReviewExistingProfile = (profileId: string) => {
    console.log(profileId)
    history.push(`/review-profile-changes/${profileId}`)
  }

  React.useEffect(() => {
    if (sharedProfiles?.length === 0) {
      history.push('/manage-students')
    }
  })

  React.useEffect(() => {
    const calculatedExistingProfiles: ISharedStudentProfile[] = []

    const calculatedNewProfiles: ISharedStudentProfile[] = []

    sharedProfiles?.forEach(sharedProfile => {
      if (studentDocuments.some(studentDocument => studentDocument.profileId === sharedProfile.docId)) {
        calculatedExistingProfiles.push(sharedProfile)
      } else {
        calculatedNewProfiles.push(sharedProfile)
      }
    })
    setExistingProfiles(calculatedExistingProfiles)
    setNewProfiles(calculatedNewProfiles)
  }, [studentDocuments, sharedProfiles])

  return (
    <BodyBox>
      <Flex direction="column" w="100%" marginY="3rem">
        <Heading as="h2" alignSelf="flex-start">
          New Profiles
        </Heading>
        {newProfiles?.length > 0 ? (
          <Flex direction="column">
            <Flex w="100%" justify="flex-end" marginBottom="1rem">
              <Button>Select Multiple</Button>
            </Flex>

            {newProfiles.map(sharedProfile => {
              return (
                <ProfilePreview
                  key={sharedProfile.docId}
                  sharedProfile={sharedProfile}
                  handleReviewProfile={handleReviewNewProfile}
                >
                  <Flex direction="column">
                    <Button marginBottom="1rem">Add Student</Button>
                  </Flex>
                </ProfilePreview>
              )
            })}
          </Flex>
        ) : (
          <Heading as="h3">No new profiles to review</Heading>
        )}

        <Heading alignSelf="flex-start" marginTop="6rem">
          Updated Profiles
        </Heading>
        <Flex w="100%" justify="flex-end" marginBottom="1rem">
          <Button>Select Multiple</Button>
        </Flex>
        {existingProfiles.map(existingProfile => {
          return (
            <ProfilePreview
              key={existingProfile.docId}
              sharedProfile={existingProfile}
              handleReviewProfile={handleReviewExistingProfile}
            >
              <Button>Accept Changes</Button>
            </ProfilePreview>
          )
        })}
      </Flex>
    </BodyBox>
  )
}
