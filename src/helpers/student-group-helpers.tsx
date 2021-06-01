import { IStudent, IStudentInStudentGroup, IStudentFact, ISelectedStudent } from 'interfacesAndTypes'
import firebase from 'firebase'

export const updateStudentFactsOnFirebase: (
  studentsInThisStudentGroupRef: firebase.firestore.CollectionReference,
  selectedStudent: IStudentInStudentGroup,
  updatedStudentFacts: IStudentFact[],
) => void = async (studentsInStudentGroupsRef, selectedStudent, updatedStudentFacts) => {
  try {
    await studentsInStudentGroupsRef.doc(selectedStudent.docId).update({
      studentInfo: {
        ...selectedStudent.studentInfo,
        studentFacts: updatedStudentFacts,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export const resetSelectedStatusOnStudents = (
  updateBatch: firebase.firestore.WriteBatch,
  studentsInThisStudentGroupDocuments: IStudentInStudentGroup[],
  studentsInThisStudentGroupRef: firebase.firestore.Query<firebase.firestore.DocumentData>,
): void => {
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

export const addSelectedStudentFactAndRefillStudentFactsIfEmpty: (
  selectedStudent: IStudentInStudentGroup,
  studentDocuments: IStudent[],
) => { updatedStudentFacts: IStudentFact[]; selectedStudentWithStudentFact: ISelectedStudent } = (
  selectedStudent: IStudentInStudentGroup,
  studentDocuments: IStudent[],
) => {
  let updatedStudentFacts = [...selectedStudent.studentInfo.studentFacts]
  const randomIndex = Math.floor(Math.random() * updatedStudentFacts.length)
  const selectedFact = updatedStudentFacts.splice(randomIndex, 1)[0]
  if (updatedStudentFacts.length === 0) {
    updatedStudentFacts = resetStudentFacts(selectedStudent, studentDocuments)
  }
  const selectedStudentWithStudentFact = updateSelectedStudentObject(selectedStudent, selectedFact)
  return { updatedStudentFacts, selectedStudentWithStudentFact }
}

const resetStudentFacts: (selectedStudent: IStudentInStudentGroup, studentDocuments: IStudent[]) => IStudentFact[] = (
  selectedStudent: IStudentInStudentGroup,
  studentDocuments: IStudent[],
) => {
  const studentFactsReset = studentDocuments.filter(student => {
    return student.docId === selectedStudent.studentId
  })[0].studentFacts
  const updatedStudentFactsReset: IStudentFact[] = []
  Object.keys(studentFactsReset).forEach(key => {
    if (studentFactsReset[key] !== '') {
      updatedStudentFactsReset.push({
        title: key,
        value: studentFactsReset[key],
      })
    }
  })
  return updatedStudentFactsReset
}

const updateSelectedStudentObject = (
  selectedStudent: IStudentInStudentGroup,
  selectedFact: IStudentFact,
): ISelectedStudent => {
  const selectedStudentWithStudentFact: ISelectedStudent = {
    ...selectedStudent,
    studentInfo: {
      ...selectedStudent.studentInfo,
      selectedFact: selectedFact === undefined ? null : selectedFact,
    },
  }
  return selectedStudentWithStudentFact
}
