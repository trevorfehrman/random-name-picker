import * as React from 'react'
import { Flex, List, ListItem, Heading } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const listItemStyles = {
  _hover: {
    color: 'var(--main-color-very-light)',
  },
}

export const HeaderForDesktop: React.FC = () => {
  return (
    <Flex
      padding="1rem 3rem"
      fontSize="2rem"
      color="var(--white)"
      justify="space-between"
      align="center"
      bg="var(--main-color-medium)"
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
            <NavLink to="/manage-students">Students</NavLink>
          </ListItem>
        </List>
      </Flex>
    </Flex>
  )
}
