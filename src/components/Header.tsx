import { Tabs, TabList, Tab } from '@chakra-ui/react'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.FC = () => {
  const activeStyle = {
    borderTop: 'none !important',
  }

  return (
    <Tabs size="lg" isFitted variant="line" colorScheme="cyan">
      <TabList mb="1em">
        <Tab>
          <NavLink to="/" exact activeStyle={activeStyle}>
            Groups
          </NavLink>
        </Tab>
        <Tab>
          <NavLink to="/manage-students" activeStyle={activeStyle}>
            Students
          </NavLink>
        </Tab>
      </TabList>
    </Tabs>
  )
}

export default Header
