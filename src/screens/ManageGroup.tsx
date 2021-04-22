import React from 'react'
import FooterWithButtons from 'components/UI/FooterWithButtons'
import { useParams } from 'react-router-dom'
import { useFirestore } from 'reactfire'

type ManageGroupParams = {
  studentGroupId: string
}

const ManageGroup: React.FC = () => {
  const params: ManageGroupParams = useParams()
  const studentGroupId = params.studentGroupId

  //   const teacherRef = useFirestore().collection('teachers')

  return <p>{studentGroupId}</p>
}

export default ManageGroup
