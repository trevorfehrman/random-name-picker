import { FormControl } from '@chakra-ui/form-control'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

// dark grey: #474747

export const FormControlWithMargin = styled(FormControl)`
  margin-bottom: 1.5rem;
`

export const StudentInGroupContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  width: 100%;
  color: var(--grey-dark);
`

export const StudentContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid var(--grey-light);
  border-radius: 3px;
  width: 100%;
  margin: 1rem 0;
  color: var(--grey-dark);
  transition: all 0.3s ease-in;
  &:hover {
    cursor: pointer;
    transform: translateY(-0.2rem);
    background-color: var(--main-color-very-light);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.6);
  }
`

export const FormBox = styled.div`
  width: 95%;
  max-width: 30rem;
  padding: 0;
  color: var(--grey-dark);
`

export const BodyBox = styled.div`
  color: var(--grey-dark);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding: 1.3rem;
  position: relative;
`

export const NameDisplayBox = styled.div`
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`
