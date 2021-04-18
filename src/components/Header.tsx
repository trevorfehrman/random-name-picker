import { List, ListItem } from '@chakra-ui/react'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const TabStyled = styled(Tab)`
  width: 100%;
  height: 100%;
  color: var(--main-color-medium);
  border-bottom: 2px solid var(--grey-medium);
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 400;
`

const Header: React.FC = () => {
  const selectedStyles = {
    borderBottom: '3px solid var(--main-color-medium)',
    borderBottomColor: 'var(--main-color-medium)',
  }
  return (
    <>
      <Tabs color="var(--main-color-medium)" variant="unstyled">
        <TabList>
          <NavLink to="/" exact style={{ width: '50%', height: '4rem' }}>
            <TabStyled _selected={selectedStyles}>Groups</TabStyled>
          </NavLink>

          <NavLink to="/manage-students" style={{ width: '50%', height: '4rem' }}>
            <TabStyled _selected={selectedStyles} borderLeft="1px solid var(--grey-medium)">
              Students
            </TabStyled>
          </NavLink>
        </TabList>
      </Tabs>
    </>
  )
}

export default Header
