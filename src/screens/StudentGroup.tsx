import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore, useUser, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import { Button, Flex, useDisclosure, Icon } from '@chakra-ui/react'
import { IStudentGroup, IStudent, IStudentInStudentGroup, ISelectedStudent, GroupParams } from 'interfacesAndTypes'
import FullScreenDisplay from 'components/FullScreenDisplay'
import AddExistingStudentsModal from 'components/AddExisitingStudentsModal'
import { PageContentsBox } from 'styles'
import HeadingBoxWithBackButton from 'components/HeadingBoxWithBackButton'
import EditableStudentGroupName from 'components/EditableStudentGroupName'
import NameDisplay from 'components/NameDisplay'
import StudentList from 'components/StudentList'
import { BiUserPlus } from 'react-icons/bi'

const StudentGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [unselected, setUnselected] = React.useState<IStudentInStudentGroup[]>([])
  const [selectedStudent, setSelectedStudent] = React.useState<ISelectedStudent | null>(null)
  const [fullScreenDisplayIsOpen, setFullScreenDisplayIsOpen] = React.useState(false)

  const history = useHistory()
  const params: GroupParams = useParams()
  const studentGroupId = params.groupId

  const { data: user } = useUser()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)

  const studentGroupRef = teacherRef.collection('studentGroups').doc(studentGroupId)
  const studentGroupDocument = useFirestoreDocData<IStudentGroup & { docId: string }>(studentGroupRef, {
    idField: 'docId',
  }).data

  const studentsInStudentGroupsRef = teacherRef.collection('studentsInStudentGroups')

  const studentsInThisStudentGroupRef = studentsInStudentGroupsRef.where('studentGroupId', '==', studentGroupId)
  const studentsInThisStudentGroupDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    studentsInThisStudentGroupRef,
    { idField: 'docId' },
  ).data

  const unselectedStudentsRef = studentsInStudentGroupsRef
    .where('studentGroupId', '==', studentGroupId)
    .where('selected', '==', false)

  const unselectedStudentsDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    unselectedStudentsRef,
    { idField: 'docId' },
  ).data

  const studentsRef = teacherRef.collection('students')
  const studentDocuments = useFirestoreCollectionData<IStudent & { docId: string }>(studentsRef, { idField: 'docId' })
    .data

  React.useEffect(() => {
    unselectedStudentsDocuments && setUnselected(unselectedStudentsDocuments.sort((a, b) => a.order - b.order))
  }, [unselectedStudentsDocuments])

  const backHandler = () => {
    history.push('/')
  }

  const selectHandler = () => {
    const selectedStudent = unselected[0]
    console.log(selectedStudent)
    let studentFacts = [...selectedStudent.studentInfo.studentFacts]
    console.log(studentFacts)
    const randomIndex = Math.floor(Math.random() * studentFacts.length)
    const selectedFact = studentFacts.splice(randomIndex, 1)[0]
    console.log(selectedFact)
    if (studentFacts.length === 0) {
      const studentFactsReset = studentDocuments.filter(student => {
        return student.docId === selectedStudent.studentId
      })[0].studentFacts
      studentFacts = Object.values(studentFactsReset).filter(studentFact => studentFact.value !== '')
    }
    const preparedSelectedStudent = {
      ...selectedStudent,
      studentInfo: {
        studentName: selectedStudent.studentInfo.studentName,
        profilePic: selectedStudent.studentInfo.profilePic,
        selectedFact,
      },
    }
    studentsInStudentGroupsRef
      .doc(selectedStudent.docId)
      .update({
        studentInfo: {
          ...selectedStudent.studentInfo,
          studentFacts,
        },
      })
      .catch(err => console.log(err))
    setSelectedStudent(preparedSelectedStudent)
    if (unselected.length <= 1) {
      resetSelectedStatus()
    } else {
      studentsInStudentGroupsRef
        .doc(selectedStudent.docId)
        .update({
          selected: true,
        })
        .catch(err => console.log(err))
    }
  }

  const updateBatch = useFirestore().batch()

  const resetSelectedStatus = () => {
    const orderArray: number[] = []
    for (let i = 0; i <= studentsInThisStudentGroupDocuments.length; i++) {
      orderArray[i] = i
    }
    studentsInThisStudentGroupRef
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const randomOrderValue = orderArray.splice(Math.floor(Math.random() * orderArray.length), 1)
          updateBatch.update(doc.ref, { selected: false, order: randomOrderValue[0] })
        })
        return updateBatch.commit().catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  return (
    <PageContentsBox>
      <HeadingBoxWithBackButton backHandler={backHandler}>
        <Flex justify="flex-end" alignItems="flex-start">
          <EditableStudentGroupName studentGroupDocument={studentGroupDocument} studentGroupRef={studentGroupRef} />
        </Flex>
      </HeadingBoxWithBackButton>

      <NameDisplay
        selectedStudent={selectedStudent}
        setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
        selectHandler={selectHandler}
      />

      <Button alignSelf="flex-end" marginBottom=".3rem" onClick={onOpen}>
        <Icon as={BiUserPlus} marginRight=".5rem" fontSize="2rem" />
        Add Students
      </Button>

      <StudentList
        studentsInThisStudentGroup={studentsInThisStudentGroupDocuments
          ?.sort((a, b) => {
            return a.order - b.order
          })
          .sort((a, b) => {
            return +a.selected - +b.selected
          })}
        studentGroupId={studentGroupId}
      />

      <AddExistingStudentsModal
        onClose={onClose}
        isOpen={isOpen}
        studentDocuments={studentDocuments}
        studentsInThisStudentGroupDocuments={studentsInThisStudentGroupDocuments}
        studentsInStudentGroupsRef={studentsInStudentGroupsRef}
        studentGroupDocument={studentGroupDocument}
        studentsRef={studentsRef}
      />

      <FullScreenDisplay
        modalHeadingText="FullScreenMode"
        onClose={() => setFullScreenDisplayIsOpen(false)}
        isOpen={fullScreenDisplayIsOpen}
        selectHandler={selectHandler}
      >
        <NameDisplay
          selectedStudent={selectedStudent}
          isFullScreen
          setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
          selectHandler={selectHandler}
        />
      </FullScreenDisplay>
    </PageContentsBox>
  )
}

export default StudentGroup
