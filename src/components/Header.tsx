import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { Tabs, TabList, Tab } from '@chakra-ui/react'
import { useLocation } from 'react-router'

const TabStyled = styled(Tab)`
  width: 100%;
  height: 100%;
  color: var(--main-color-medium);
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 400;
`

const Header: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <Tabs color="var(--main-color-medium)" variant="unstyled">
        <TabList>
          <NavLink to="/" exact style={{ width: '50%', height: '4rem' }}>
            <TabStyled
              borderBottom={
                location.pathname === '/' ? '2px solid var(--main-color-medium)' : '2px solid var(--grey-medium)'
              }
            >
              Groups
            </TabStyled>
          </NavLink>

          <NavLink to="/manage-students" style={{ width: '50%', height: '4rem' }}>
            <TabStyled
              borderLeft="1px solid var(--grey-medium)"
              borderBottom={
                location.pathname === '/manage-students'
                  ? '2px solid var(--main-color-medium)'
                  : '2px solid var(--grey-medium)'
              }
            >
              Students
            </TabStyled>
          </NavLink>
        </TabList>
      </Tabs>
    </>
  )
}

export default Header
