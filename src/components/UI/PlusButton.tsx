import React from 'react'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

type PlusButtonProps = {
  onOpen: () => void
  thereAreNoDocuments: boolean
}

const PlusButton: React.FC<PlusButtonProps> = ({ onOpen, thereAreNoDocuments }) => {
  const [shouldBounce, setShouldBounce] = React.useState(false)

  React.useEffect(() => {
    if (thereAreNoDocuments) {
      setShouldBounce(true)
    }
  }, [thereAreNoDocuments])

  const openHandler = () => {
    setShouldBounce(false)
    onOpen()
  }

  return (
    <Button
      onClick={openHandler}
      alignSelf="flex-end"
      marginBottom=".5rem"
      position="fixed"
      right="1.5rem"
      bottom="1.5rem"
      width="4.4rem"
      height="4.4rem"
      borderRadius="50%"
      backgroundColor="var(--main-color-medium)"
      className={shouldBounce ? 'bounce' : ''}
    >
      <AddIcon color="white" fontSize="1.5rem" />
    </Button>
  )
}

export default PlusButton
