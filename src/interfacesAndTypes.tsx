export interface IStudentGroup {
  docId: string
  studentGroupName: string
  students: IStudent[]
}

export interface IStudent {
  studentName: string
  studentId: string
  docId: string
  profilePic?: string
  studentFacts: IStudentFacts
}

export interface INewStudentValues {
  studentName: string
  profilePic: string
  [key: string]: string
}

export interface IStudentToAdd {
  studentId: string
  studentName: string
  profilePic?: string
  studentFacts: IStudentFacts
}

export interface IStudentFacts {
  [key: string]: IStudentFact
}

interface IStudentFact {
  value: string
  title: string
}

export interface GroupParams {
  groupId: string
}

export interface StudentParams {
  studentId: string
}

export interface IStudentInStudentGroup {
  docId: string
  studentId: string
  studentInfo: IStudentInfo
  studentGroupId: string
  studentGroupName: string
  selected: boolean
  order: number
}

export interface ISelectedStudent {
  docId: string
  studentId: string
  studentInfo: ISelectedStudentInfo
  studentGroupId: string
  studentGroupName: string
  selected: boolean
  order: number
}

interface ISelectedStudentInfo {
  studentName: string
  profilePic: string
  selectedFact: IStudentFact
}

interface IStudentInfo {
  studentName: string
  profilePic: string
  studentFacts: IStudentFact[]
}

export type NameDisplayProps = {
  selectedStudent: ISelectedStudent | null
  isFullScreen?: boolean
  setFullScreenDisplayIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectHandler: () => void
}
