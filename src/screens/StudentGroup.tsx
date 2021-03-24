import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore, useUser, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import { Button, Flex, useDisclosure, Icon } from '@chakra-ui/react'
import { IStudentGroup, IStudent, IStudentInStudentGroup, GroupParams } from 'interfacesAndTypes'
import FullScreenDisplay from 'components/FullScreenDisplay'
import AddExistingStudentsModal from 'components/AddExisitingStudentsModal'
import { PageContentsBox } from 'styles'
import HeadingBoxWithBackButton from 'components/HeadingBoxWithBackButton'
import EditableStudentGroupName from 'components/EditableStudentGroupName'
import NameDisplay from 'components/NameDisplay'
import StudentList from 'components/StudentList'
import { BiUserPlus } from 'react-icons/bi'
import {
  addSelectedStudentFactAndRefillStudentFactsIfEmpty,
  resetSelectedStatusOnStudents,
  updateStudentFactsOnFirebase,
} from 'helpers/student-group-helpers'

const StudentGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [noStudentSelected, setNoStudentSelected] = React.useState(true)
  const [unselected, setUnselected] = React.useState<IStudentInStudentGroup[]>([])
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

  const updateBatch = useFirestore().batch()

  const selectStudentAndStudentFactHandler = async () => {
    if (unselected.length === 0) {
      return
    }
    const selectedStudent = unselected[0]
    const { selectedStudentWithStudentFact, updatedStudentFacts } = addSelectedStudentFactAndRefillStudentFactsIfEmpty(
      selectedStudent,
      studentDocuments,
    )
    try {
      await updateStudentFactsOnFirebase(studentsInStudentGroupsRef, selectedStudent, updatedStudentFacts)

      if (unselected.length <= 1) {
        await resetSelectedStatusOnStudents(
          updateBatch,
          studentsInThisStudentGroupDocuments,
          studentsInThisStudentGroupRef,
        )
      } else {
        await studentsInStudentGroupsRef.doc(selectedStudent.docId).update({
          selected: true,
        })
      }
      await studentGroupRef.update({ selectedStudent: selectedStudentWithStudentFact })
      setNoStudentSelected(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <PageContentsBox>
      <HeadingBoxWithBackButton backHandler={backHandler}>
        <Flex justify="flex-end" alignItems="flex-start">
          <EditableStudentGroupName studentGroupDocument={studentGroupDocument} studentGroupRef={studentGroupRef} />
        </Flex>
      </HeadingBoxWithBackButton>

      <NameDisplay
        selectedStudent={studentGroupDocument?.selectedStudent}
        setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
        selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
        noStudentSelected={noStudentSelected}
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
        selectedStudentId={studentGroupDocument?.selectedStudent?.studentId}
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
        selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
      >
        <NameDisplay
          selectedStudent={studentGroupDocument?.selectedStudent}
          isFullScreen
          setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
          selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
          noStudentSelected={noStudentSelected}
        />
      </FullScreenDisplay>
    </PageContentsBox>
  )
}

export default StudentGroup
