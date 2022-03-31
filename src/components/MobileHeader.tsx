import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Tabs, TabList, Tab } from '@chakra-ui/react'
import { useLocation } from 'react-router'

const tabStyles = {
  width: '100%',
  height: '100%',
  color: 'var(--main-color-medium)',
  fontSize: '1.1rem',
  fontWeight: '400',
}

const MobileHeader: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <Tabs color="var(--main-color-medium)" variant="unstyled" display={['', '', 'none']}>
        <TabList>
          <NavLink to="/" exact style={{ width: '50%', height: '4rem' }}>
            <Tab
              borderBottom={
                location.pathname === '/' ? '2px solid var(--main-color-medium)' : '2px solid var(--grey-medium)'
              }
              {...tabStyles}
            >
              Groups
            </Tab>
          </NavLink>

          <NavLink to="/manage-students" style={{ width: '50%', height: '4rem' }}>
            <Tab
              borderLeft="1px solid var(--grey-medium)"
              borderBottom={
                location.pathname === '/manage-students'
                  ? '2px solid var(--main-color-medium)'
                  : '2px solid var(--grey-medium)'
              }
              {...tabStyles}
            >
              Students
            </Tab>
          </NavLink>
        </TabList>
      </Tabs>
    </>
  )
}

export default MobileHeader
