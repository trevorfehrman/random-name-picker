import * as React from 'react'
import { NameDisplayProps } from 'interfacesAndTypes'
import NameDisplayFullScreen from 'components/NameDisplayFullScreen'
import NameDisplayRegular from 'components/NameDisplayRegular'

const NameDisplay: React.FC<NameDisplayProps> = ({ selectedStudent, isFullScreen }) => {
  return (
    <>
      {isFullScreen ? (
        <NameDisplayFullScreen selectedStudent={selectedStudent} />
      ) : (
        <NameDisplayRegular selectedStudent={selectedStudent} />
      )}
    </>
  )
}

export default NameDisplay
