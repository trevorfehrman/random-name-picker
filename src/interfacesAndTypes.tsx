export interface IStudentGroup {
  docId: string
  studentGroupName: string
  students: IStudent[]
}

export interface IStudent {
  studentName: string
  studentId: string
  docId: string
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
  studentName: string
  studentGroupId: string
  studentGroupName: string
  selected: boolean
  order: number
}

export type NameDisplayProps = {
  selectedStudent: IStudentInStudentGroup | null
  isFullScreen?: boolean
  setFullScreenDisplayIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectHandler: () => void
}
