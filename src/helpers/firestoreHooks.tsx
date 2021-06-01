import { useFirestore, useUser, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import { IStudentGroup, IStudent, IStudentInStudentGroup } from 'interfacesAndTypes'
import firebase from 'firebase'

interface IUseStudentGroup {
  studentGroupDocument: IStudentGroup
  studentGroupRef: firebase.firestore.DocumentReference
}

interface IUseStudents {
  studentsRef: firebase.firestore.CollectionReference
  studentDocuments: IStudent[]
}

interface IUseStudentsInThisStudentGroup {
  studentsInThisStudentGroupRef: firebase.firestore.Query
  studentsInThisStudentGroupDocuments: IStudentInStudentGroup[]
}

interface IUseUnselectedStudents {
  unselectedStudentsRef: firebase.firestore.Query
  unselectedStudentsDocuments: firebase.firestore.DocumentData
}

interface IUseStudentGroups {
  studentGroupsRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  studentGroupsDocuments: IStudentGroup[]
}

export const useTeacherRef = (): firebase.firestore.DocumentReference => {
  const { data } = useUser()
  const teacherRef = useFirestore().collection('teachers').doc(data.uid)
  return teacherRef
}

export const useStudentGroups = (): IUseStudentGroups => {
  const teacherRef = useTeacherRef()
  const studentGroupsRef = teacherRef.collection('studentGroups')
  const studentGroupsDocuments = useFirestoreCollectionData<IStudentGroup & { docId: string }>(studentGroupsRef, {
    idField: 'docId',
  }).data
  return { studentGroupsRef, studentGroupsDocuments }
}

export const useStudentGroup = (studentGroupId: string): IUseStudentGroup => {
  const teacherRef = useTeacherRef()
  const studentGroupRef = teacherRef.collection('studentGroups').doc(studentGroupId)
  const studentGroupDocument = useFirestoreDocData<IStudentGroup & { docId: string }>(studentGroupRef, {
    idField: 'docId',
  }).data

  return {
    studentGroupDocument,
    studentGroupRef,
  }
}

export const useStudents = (): IUseStudents => {
  const teacherRef = useTeacherRef()
  const studentsRef = teacherRef.collection('students')
  const studentDocuments = useFirestoreCollectionData<IStudent & { docId: string }>(studentsRef, { idField: 'docId' })
    .data
  return { studentDocuments, studentsRef }
}

export const useStudentsInStudentGroups = (): firebase.firestore.CollectionReference => {
  const teacherRef = useTeacherRef()
  const studentsInStudentGroupsRef = teacherRef.collection('studentsInStudentGroups')
  return studentsInStudentGroupsRef
}

export const useStudentsInThisStudentGroup = (studentGroupId: string): IUseStudentsInThisStudentGroup => {
  const studentsInStudentGroupsRef = useStudentsInStudentGroups()
  const studentsInThisStudentGroupRef = studentsInStudentGroupsRef.where('studentGroupId', '==', studentGroupId)
  const studentsInThisStudentGroupDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    studentsInThisStudentGroupRef,
    { idField: 'docId' },
  ).data
  return { studentsInThisStudentGroupRef, studentsInThisStudentGroupDocuments }
}

export const useUnselectedStudents = (studentGroupId: string): IUseUnselectedStudents => {
  const teacherRef = useTeacherRef()
  const studentsInStudentGroupsRef = teacherRef.collection('studentsInStudentGroups')
  const unselectedStudentsRef = studentsInStudentGroupsRef
    .where('studentGroupId', '==', studentGroupId)
    .where('selected', '==', false)

  const unselectedStudentsDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    unselectedStudentsRef,
    { idField: 'docId' },
  ).data

  return { unselectedStudentsRef, unselectedStudentsDocuments }
}
