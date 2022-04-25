import * as React from 'react'
import { Flex, List, ListItem, Heading, Box, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { NavLink, useHistory } from 'react-router-dom'
import { useAuth, useUser } from 'reactfire'
import { useSharedProfiles } from 'helpers/firestoreHooks'

const listItemStyles = {
  _hover: {
    color: 'var(--grey-very-light)',
  },
}

export const HeaderForDesktop: React.FC = () => {
  const history = useHistory()

  const user = useUser()

  console.log(user?.data)

  const auth = useAuth()

  const { sharedProfiles } = useSharedProfiles()

  const sharedProfileAmount = sharedProfiles?.length

  const handleSignOut = async () => {
    try {
      await auth.signOut()

      // TODO: Change this!!This is a temporary fix for the signin problem
      history.push('.')
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box w="100%" zIndex="10">
      <Flex
        w="100%"
        padding="1rem 2rem"
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
        <Flex alignItems="center">
          <List display="flex" fontSize="1.7rem" alignItems="center">
            <ListItem {...listItemStyles}>
              <NavLink to="/" exact activeClassName="underline" className="">
                Groups
              </NavLink>
            </ListItem>
            <ListItem {...listItemStyles} marginX="3rem" position="relative">
              {sharedProfileAmount > 0 ? (
                <Flex
                  justify="center"
                  align="center"
                  w="1.6rem"
                  h="1.6rem"
                  position="absolute"
                  right="-1.3rem"
                  top="-.4rem"
                  fontSize="1rem"
                  bg="var(--alert-color)"
                  borderRadius="50%"
                  fontWeight="bold"
                >
                  {sharedProfileAmount}
                </Flex>
              ) : null}
              <NavLink to="/manage-students" activeClassName="underline">
                Students
              </NavLink>
            </ListItem>
            <ListItem display="flex" align="center" {...listItemStyles} cursor="pointer">
              <Menu>
                <MenuButton>
                  <Image w="50px" borderRadius="50%" src={user?.data.photoURL || ''} />
                </MenuButton>
                <MenuList bg="var(--white)">
                  <MenuItem color="var(--grey-dark)" onClick={handleSignOut}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </ListItem>
          </List>
        </Flex>
      </Flex>
    </Box>
  )
}
