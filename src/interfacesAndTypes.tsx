export interface IStudentGroup {
  docId: string
  studentGroupName: string
  selectedStudent: ISelectedStudent
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

export interface ISelectedStudentInfo {
  studentName: string
  profilePic: string
  selectedFact: IStudentFact | null
}

export interface IStudentFact {
  value: string
  title: string
}

export interface IStudent {
  studentName: string
  profileId: string
  docId: string
  profilePic: string
  studentFacts: IStudentFacts
}

export interface IStudentFacts {
  [key: string]: string
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

export interface IStudentInfo {
  studentName: string
  profilePic: string
  studentFacts: IStudentFact[]
}
export interface IFileUpload {
  studentName: string
  profilePic: FileList
}

export type INewStudentValues = IStudentFacts & IFileUpload

export interface IStudentToAdd {
  studentId: string
  studentName: string
  profilePic?: string
  studentFacts: IStudentFacts
}

export interface GroupParams {
  groupId: string
}

export interface StudentParams {
  studentId: string
}

export type NameDisplayProps = {
  selectedStudent: ISelectedStudent | null
  isFullScreen?: boolean
  fullScreenDisplayIsOpen: boolean
  setFullScreenDisplayIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectStudentAndStudentFactHandler: () => void
  noStudentSelected: boolean
}

export interface ISharedStudentProfile extends IStudent {
  teacherCode: string
}
