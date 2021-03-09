import * as React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import StudentInGroup from 'components/StudentInGroup'
import { AnimateSharedLayout } from 'framer-motion'

type StudentListProps = {
  studentsInThisStudentGroup: IStudentInStudentGroup[]
  studentGroupId: string
}

const StudentList: React.FC<StudentListProps> = ({ studentsInThisStudentGroup }) => {
  const [isShowingAll, setIsShowingAll] = React.useState(false)

  return (
    <Box width="100%" textAlign="center" position="relative" marginBottom="1.5rem">
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
      </Box>
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
      <Box
        position="absolute"
        fontWeight="500"
        backgroundColor="transparent"
        left={0}
        right={0}
        textAlign="center"
        w="10rem"
        z-index={4}
        onClick={() => setIsShowingAll(!isShowingAll)}
        _hover={{ cursor: 'pointer' }}
        margin={isShowingAll ? '.5rem auto 1rem auto' : '-0.7rem auto 1rem auto'}
      >
        <Flex justify="space-between" w="100%">
          {isShowingAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {isShowingAll ? <span>Hide Most</span> : <span>Show All</span>}
          {isShowingAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Flex>
      </Box>
    </Box>
  )
}

export default StudentList
