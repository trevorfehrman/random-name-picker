import { IStudent, IStudentInStudentGroup, IStudentFact, ISelectedStudent } from 'interfacesAndTypes'

const resetStudentFacts: (selectedStudent: IStudentInStudentGroup, studentDocuments: IStudent[]) => IStudentFact[] = (
  selectedStudent: IStudentInStudentGroup,
  studentDocuments: IStudent[],
) => {
  const studentFactsReset = studentDocuments.filter(student => {
    return student.docId === selectedStudent.studentId
  })[0].studentFacts
  return Object.values(studentFactsReset).filter(studentFact => studentFact.value !== '')
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

const updateSelectedStudentObject: (
  selectedStudent: IStudentInStudentGroup,
  selectedFact: IStudentFact,
) => ISelectedStudent = (selectedStudent, selectedFact) => {
  const selectedStudentWithStudentFact = {
    ...selectedStudent,
    studentInfo: {
      ...selectedStudent.studentInfo,
      selectedFact: selectedFact === undefined ? null : selectedFact,
    },
  }
  return selectedStudentWithStudentFact
}
