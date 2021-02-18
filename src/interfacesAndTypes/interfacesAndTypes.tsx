export interface IStudentGroup {
  studentGroupName: string
  students: IStudentInGroup[]
}

export interface IStudentInGroup {
  studentName: string
  studentId: string
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
}
