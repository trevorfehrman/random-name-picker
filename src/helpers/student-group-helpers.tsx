import { IStudent, IStudentInStudentGroup, IStudentFact } from 'interfacesAndTypes'

const resetStudentFacts: (selectedStudent: IStudentInStudentGroup, studentDocuments: IStudent[]) => IStudentFact[] = (
  selectedStudent: IStudentInStudentGroup,
  studentDocuments: IStudent[],
) => {
  const studentFactsReset = studentDocuments.filter(student => {
    return student.docId === selectedStudent.studentId
  })[0].studentFacts
  return Object.values(studentFactsReset).filter(studentFact => studentFact.value !== '')
}

export const selectStudentFactAndRepopulateArrayIfLast: (
  selectedStudent: IStudentInStudentGroup,
  studentDocuments: IStudent[],
) => { studentFacts: IStudentFact[]; selectedFact: IStudentFact } = (
  selectedStudent: IStudentInStudentGroup,
  studentDocuments: IStudent[],
) => {
  let studentFacts = [...selectedStudent.studentInfo.studentFacts]
  const randomIndex = Math.floor(Math.random() * studentFacts.length)
  const selectedFact = studentFacts.splice(randomIndex, 1)[0]
  if (studentFacts.length === 0) {
    studentFacts = resetStudentFacts(selectedStudent, studentDocuments)
  }
  return { studentFacts, selectedFact }
}
