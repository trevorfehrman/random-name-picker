import { IStudentFacts, INewStudentValues } from 'interfacesAndTypes'

export const studentFactInputs = [
  'Favorite Movie',
  'Favorite Food',
  'Favorite TV Show',
  'Best Vacation',
  'Cutest Pet',
  'Signature Catch Phrase',
  'Favorite Ice Cream',
  'Favorite Book',
  'Favorite Character',
]

export const createStudentFactsObject: (values: INewStudentValues) => IStudentFacts = (values: INewStudentValues) => {
  const studentFacts: IStudentFacts = {}

  studentFactInputs.forEach(studentFactInput => {
    studentFacts[studentFactInput] = values[studentFactInput]
  })
  return studentFacts
}
