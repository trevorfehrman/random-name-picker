import * as React from 'react'
import { Flex, Heading, Image, Box, IconButton, Icon } from '@chakra-ui/react'
import { BiExpand, BiCollapse } from 'react-icons/bi'
import { ISelectedStudent } from 'interfacesAndTypes'
import styled from '@emotion/styled/macro'

type StudentProfileProps = {
  selectedStudent: ISelectedStudent
  fullScreenDisplayIsOpen: boolean
  setFullScreenDisplayIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FullScreenOption = styled(Box)`
  display: flex;
  width: 100%;
  height: 3rem;
  position: absolute;
  border-radius: 0 0 5px 5px;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 500;
  justify-content: flex-end;
  align-items: center;
`

const StudentProfile: React.FC<StudentProfileProps> = ({
  selectedStudent,
  setFullScreenDisplayIsOpen,
  fullScreenDisplayIsOpen,
}) => {
  const ImageBox = styled(Box)`
    width: 85vw;
    height: 85vw;
    max-width: 26rem;
    max-height: 26rem;
    overflow: hidden;
    position: relative;

    border-radius: 5px;
    ${FullScreenOption} {
      z-index: -5;
      opacity: 0;
      transition: opacity 0.4s;
    }
    &:hover {
      ${FullScreenOption} {
        z-index: ${fullScreenDisplayIsOpen ? -5 : 500};
        opacity: ${fullScreenDisplayIsOpen ? 0 : 1};
      }
    }
  `

  const expandHandler = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    fullScreenDisplayIsOpen ? setFullScreenDisplayIsOpen(false) : setFullScreenDisplayIsOpen(true)
  }

  return (
    <Flex
      height="100%"
      direction="column"
      justify="flex-start"
      alignItems="center"
      w="100%"
      margin="auto"
      maxWidth="26rem"
      maxHeight="34rem"
    >
      <Heading as="h2" letterSpacing=".1em" fontSize="1.4rem" textAlign="center" alignSelf="flex-end">
        {selectedStudent?.studentInfo.studentName}
      </Heading>
      <ImageBox>
        <Image boxSize="100%" borderRadius="5px" src={selectedStudent?.studentInfo.profilePic} objectFit="cover" />
        <FullScreenOption>
          <IconButton
            icon={
              fullScreenDisplayIsOpen ? (
                <Icon color="white" fontSize="1.4rem" as={BiCollapse} />
              ) : (
                <Icon color="white" fontSize="1.4rem" as={BiExpand} />
              )
            }
            backgroundColor="transparent"
            aria-label="expand"
            onClick={expandHandler}
            size="sm"
            border="1px solid white"
            marginRight=".5rem"
            _hover={{ backgroundColor: 'var(--grey-dark)' }}
          />
        </FullScreenOption>
      </ImageBox>
      <Flex
        direction="column"
        // w={{ base: '16rem', md: '26rem', lg: '33rem' }}
        justify="flex-start"
        padding="0"
        alignSelf="flex-start"
        alignItems="flex-start"
        minHeight="5.5rem"
      >
        {selectedStudent?.studentInfo?.selectedFact && (
          <Flex direction="column" justify="flex-start" alignItems="flex-start" lineHeight="28px">
            <Heading as="h2" fontSize="1.1rem" color="var(--main-color-medium)" width="100%">
              {selectedStudent.studentInfo.selectedFact.title}
            </Heading>

            <Heading as="h2" fontSize="1.5rem" letterSpacing=".05em">
              {selectedStudent.studentInfo.selectedFact.value}
            </Heading>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default StudentProfile
