import { IStudentFacts, INewStudentValues } from 'interfacesAndTypes'

type IStudentFactInput = {
  display: string
  camelCase: string
}

export const studentFactInputs: IStudentFactInput[] = [
  {
    display: 'Favorite Movie',
    camelCase: 'favoriteMovie',
  },
  {
    display: 'Favorite Food',
    camelCase: 'favoriteFood',
  },
  {
    display: 'Favorite TV Show',
    camelCase: 'favoriteTVShow',
  },
  {
    display: 'Best Vacation',
    camelCase: 'bestVacation',
  },
  {
    display: 'Cutest Pet',
    camelCase: 'cutestPet',
  },
  {
    display: 'Signature Catch Phrase',
    camelCase: 'signatureCatchPhrase',
  },
]

export const createStudentFactsObject: (values: INewStudentValues) => IStudentFacts = (values: INewStudentValues) => {
  const studentFacts: IStudentFacts = {}
  // for Each element in the array create a key value pair in this format:
  //   favoriteFood: {
  //      value: "pad thai",
  //      title: "Favorite Food",
  //   }
  // and push that value into the studentFacts object
  studentFactInputs.forEach(studentFact => {
    studentFacts[studentFact.camelCase] = {
      value: values[studentFact.camelCase],
      title: studentFact.display,
    }
  })
  return studentFacts
}
