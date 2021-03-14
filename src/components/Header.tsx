import { List, ListItem } from '@chakra-ui/react'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

const ListItemStyled = styled(ListItem)`
color: #2A4365;
margin-left: 1rem; 
:hover { color: #2B6CB0 }}
`

const Header: React.FC = () => {
  const activeStyle = {
    borderBottom: '1px solid #2B6CB0',
    color: '#2B6CB0',
    fontSize: '1.1rem',
  }

  return (
    <List display="flex" justifyContent="flex-end" width="100%">
      <ListItemStyled>
        <NavLink to="/" exact activeStyle={activeStyle} color="#63B3ED">
          Groups
        </NavLink>
      </ListItemStyled>
      <ListItemStyled>
        <NavLink to="/manage-students" activeStyle={activeStyle}>
          Students
        </NavLink>
      </ListItemStyled>
    </List>
  )
}

export default Header
