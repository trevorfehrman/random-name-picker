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

export interface Params {
  groupId: string
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
}
