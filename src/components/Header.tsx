import { List, ListItem } from '@chakra-ui/react'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

const ListItemStyled = styled(ListItem)`
  color: #ffffff;
  margin-left: 1rem;
`

const Header: React.FC = () => {
  const activeStyle = {
    borderBottom: '1px solid white',
    color: 'white',
    fontSize: '1.1rem',
  }

  return (
    <List display="flex" justifyContent="flex-end" width="100%" backgroundColor="blue.500" padding="1rem">
      <ListItemStyled>
        <NavLink to="/" exact activeStyle={activeStyle}>
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
