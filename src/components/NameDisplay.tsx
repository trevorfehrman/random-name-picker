import * as React from 'react'
import { NameDisplayProps } from 'interfacesAndTypes'
import NameDisplayFullScreen from 'components/NameDisplayFullScreen'
import NameDisplayRegular from 'components/NameDisplayRegular'

const NameDisplay: React.FC<NameDisplayProps> = ({
  selectedStudent,
  isFullScreen,
  fullScreenDisplayIsOpen,
  setFullScreenDisplayIsOpen,
  selectStudentAndStudentFactHandler,
  noStudentSelected,
}) => {
  return (
    <>
      {isFullScreen ? (
        <NameDisplayFullScreen
          selectedStudent={selectedStudent}
          noStudentSelected={noStudentSelected}
          fullScreenDisplayIsOpen={fullScreenDisplayIsOpen}
          setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
        />
      ) : (
        <NameDisplayRegular
          selectedStudent={selectedStudent}
          fullScreenDisplayIsOpen={fullScreenDisplayIsOpen}
          setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
          selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
          noStudentSelected={noStudentSelected}
        />
      )}
    </>
  )
}

export default NameDisplay
