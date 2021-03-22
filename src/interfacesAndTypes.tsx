export interface IStudentGroup {
  docId: string
  studentGroupName: string
  selectedStudent: IStudentInStudentGroup
}

export interface IStudent {
  studentName: string
  studentId: string
  docId: string
  profilePic?: string
  favoriteFood?: string
}

export interface INewStudentValues {
  studentName: string
  profilePic: string
  favoriteFood: string
}

export interface IStudentToAdd {
  studentId: string
  studentName: string
  profilePic?: string
  favoriteFood?: string
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

interface IStudentInfo {
  studentName: string
  profilePic: string
  favoriteFood: string
}

export type NameDisplayProps = {
  selectedStudent: IStudentInStudentGroup | null
  isFullScreen?: boolean
  setFullScreenDisplayIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectHandler: () => void
}
