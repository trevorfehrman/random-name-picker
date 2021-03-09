import * as React from 'react'
import { Heading, Flex, Button, Box, Icon } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import StudentInGroup from 'components/StudentInGroup'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { AnimateSharedLayout, motion } from 'framer-motion'

type StudentListProps = {
  studentsInThisStudentGroup: IStudentInStudentGroup[]
  studentGroupId: string
}

const StudentList: React.FC<StudentListProps> = ({ studentGroupId, studentsInThisStudentGroup }) => {
  const [isShowingAll, setIsShowingAll] = React.useState(false)

  return (
    <Box width="100%" textAlign="center">
      <Button w="10rem" marginBottom=".5rem" onClick={() => setIsShowingAll(!isShowingAll)}>
        <Flex justify="space-between" w="100%">
          {isShowingAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {isShowingAll ? <span>Show Some</span> : <span>Show All</span>}
          {isShowingAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Flex>
      </Button>
      <Box width="100%" maxHeight={isShowingAll ? '' : '16.21rem'} overflow="hidden" position="relative">
        <AnimateSharedLayout>
          {studentsInThisStudentGroup?.map(doc => {
            console.log(studentsInThisStudentGroup)
            return (
              <StudentInGroup
                key={doc.studentId}
                studentName={doc.studentName}
                studentInStudentGroupId={doc.docId}
                selected={doc.selected}
              />
            )
          })}
        </AnimateSharedLayout>

        {!isShowingAll && (
          <Box
            backgroundImage="linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
            w="100%"
            height="8.5rem"
            z-index={3}
            position="absolute"
            bottom={0}
          ></Box>
        )}
        {isShowingAll ? (
          <ChevronUpIcon
            position="absolute"
            bottom={0}
            fontSize="3rem"
            marginLeft="auto"
            marginRight="auto"
            left={0}
            right={0}
            textAlign="center"
            onClick={() => setIsShowingAll(!isShowingAll)}
            _hover={{
              cursor: 'pointer',
            }}
          />
        ) : (
          <ChevronDownIcon
            position="absolute"
            bottom={0}
            fontSize="3rem"
            marginLeft="auto"
            marginRight="auto"
            left={0}
            right={0}
            textAlign="center"
            onClick={() => setIsShowingAll(!isShowingAll)}
            _hover={{
              cursor: 'pointer',
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export default StudentList
