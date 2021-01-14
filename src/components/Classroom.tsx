import * as React from 'react'

type ClassroomProps = {
  classroomName?: string
}

const openClassroomHandler = () => {
  console.log('hello')
}

const Classroom: React.FC<ClassroomProps> = ({ classroomName }) => {
  return <div onClick={openClassroomHandler}>{classroomName}</div>
}

export default Classroom
