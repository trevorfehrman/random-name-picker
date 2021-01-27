import * as React from 'react'

type StudentProps = {
  studentName: string
}

const Student: React.FC<StudentProps> = ({ studentName }) => {
  return <p>{studentName}</p>
}

export default Student
