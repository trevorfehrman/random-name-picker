import { IStudentFacts, INewStudentValues } from 'interfacesAndTypes'
import { camelCase } from 'lodash'

export const studentFactInputs = [
  'Favorite Movie',
  'Favorite Food',
  'Favorite TV Show',
  'Best Vacation',
  'Cutest Pet',
  'Signature Catch Phrase',
  'Favorite Ice Cream',
]

export const createStudentFactsObject: (values: INewStudentValues) => IStudentFacts = (values: INewStudentValues) => {
  const studentFacts: IStudentFacts = {}
  // for Each element in the array create a key value pair in this format:
  //   favoriteFood: {
  //      value: "pad thai",
  //      title: "Favorite Food",
  //   }
  // and push that value into the studentFacts object
  studentFactInputs.forEach(studentFactInput => {
    const camelCaseStudentFactInput = camelCase(studentFactInput)
    studentFacts[camelCaseStudentFactInput] = {
      value: values[camelCaseStudentFactInput],
      title: studentFactInput,
    }
  })
  return studentFacts
}
