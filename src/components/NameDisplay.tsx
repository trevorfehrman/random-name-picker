import * as React from 'react'
import { NameDisplayProps } from 'interfacesAndTypes'
import NameDisplayFullScreen from 'components/NameDisplayFullScreen'
import NameDisplayRegular from 'components/NameDisplayRegular'

const NameDisplay: React.FC<NameDisplayProps> = ({
  selectedStudent,
  isFullScreen,
  setFullScreenDisplayIsOpen,
  selectStudentAndStudentFactHandler,
  noStudentSelected,
}) => {
  return (
    <>
      {isFullScreen ? (
        <NameDisplayFullScreen selectedStudent={selectedStudent} noStudentSelected={noStudentSelected} />
      ) : (
        <NameDisplayRegular
          selectedStudent={selectedStudent}
          setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
          selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
          noStudentSelected={noStudentSelected}
        />
      )}
    </>
  )
}

export default NameDisplay
