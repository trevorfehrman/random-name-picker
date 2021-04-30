import { Button } from '@chakra-ui/react'
import React, { SetStateAction } from 'react'

type ManageButtonProps = {
  primaryText: string
  secondaryText: string
  managerIsOpen: boolean
  setManagerIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const ManageButton: React.FC<ManageButtonProps> = ({ primaryText, secondaryText, setManagerIsOpen, managerIsOpen }) => {
  return (
    <Button onClick={() => setManagerIsOpen(!managerIsOpen)} width="9rem" minHeight="2.5rem">
      {managerIsOpen ? secondaryText : primaryText}
    </Button>
  )
}

export default ManageButton
