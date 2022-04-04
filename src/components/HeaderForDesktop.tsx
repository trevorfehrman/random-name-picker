import * as React from 'react'
import { Flex, List, ListItem, Heading, Box } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const listItemStyles = {
  _hover: {
    color: 'var(--main-color-very-light)',
  },
}

export const HeaderForDesktop: React.FC<{ sharedProfileAmount: number }> = ({ sharedProfileAmount }) => {
  return (
    <Box w="100%" zIndex="10">
      <Flex
        w="100%"
        padding="1rem 3rem"
        fontSize="2rem"
        color="var(--white)"
        justify="space-between"
        align="center"
        bg="var(--main-color-medium)"
        h="4.5rem"
        display={['none', 'none', 'flex']}
      >
        <Heading as="h1">
          <NavLink to="/">Picker</NavLink>
        </Heading>
        <Flex>
          <List display="flex">
            <ListItem {...listItemStyles}>
              <NavLink to="/">Groups</NavLink>
            </ListItem>
            <ListItem {...listItemStyles} marginLeft="3rem">
              {sharedProfileAmount > 0 ? (
                <Flex
                  justify="center"
                  align="center"
                  w="1.7rem"
                  h="1.7rem"
                  position="absolute"
                  right="1.6rem"
                  top=".6rem"
                  fontSize="1rem"
                  bg="var(--alert-color)"
                  borderRadius="50%"
                  fontWeight="bold"
                >
                  {sharedProfileAmount}
                </Flex>
              ) : null}
              <NavLink to="/manage-students">Students</NavLink>
            </ListItem>
          </List>
        </Flex>
      </Flex>
    </Box>
  )
}
