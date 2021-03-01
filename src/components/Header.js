import { List, ListItem } from '@chakra-ui/react'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

const ListItemStyled = styled(ListItem)`
color: #2A4365;
margin-left: 1rem; 
:hover { color: #2B6CB0 }}
`

const Header = () => {
  const activeStyle = { color: '#2B6CB0', fontSize: '1.1rem' }

  return (
    <List display="flex" justifyContent="flex-end" width="100%">
      <ListItemStyled>
        <NavLink to="/" exact activeStyle={activeStyle}>
          Student Groups
        </NavLink>
      </ListItemStyled>
      <ListItemStyled>
        <NavLink to="/manage-students" activeStyle={activeStyle}>
          Manage Students
        </NavLink>
      </ListItemStyled>
    </List>
  )
}

export default Header
