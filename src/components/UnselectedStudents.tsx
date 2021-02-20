import * as React from 'react'
import { Heading } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes/interfacesAndTypes'
import StudentInGroup from 'components/StudentInGroup'
import styled from '@emotion/styled'

const StudentBox = styled.div`
  margin: auto;
  width: 90%;
`

type UnselectedStudentsProps = {
  unselected: IStudentInStudentGroup[]
}

const UnselectedStudents: React.FC<UnselectedStudentsProps> = ({ unselected }) => {
  return (
    <>
      <Heading as="h2" margin="15px 0 0 5%" fontSize="1.2rem" alignSelf="flex-start">
        Unselected Students:
      </Heading>
      <StudentBox>
        {unselected?.map(doc => {
          return (
            <StudentInGroup key={doc.studentId} studentName={doc.studentName} studentInStudentGroupId={doc.docId} />
          )
        })}
      </StudentBox>
    </>
  )
}

export default UnselectedStudents
