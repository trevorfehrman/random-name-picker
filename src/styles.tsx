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
  padding-left: 1rem;
  border: 1px solid var(--grey-dark);
  border-radius: 5px;
  width: 100%;
  margin-top: 0.5rem;
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
  width: 100%;
  max-width: 30rem;
  padding: 0;
  color: var(--grey-dark);
`

export const PageContentsBox = styled.div`
  color: var(--grey-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding: 1.3rem;
  position: relative;
`

export const NameDisplayBox = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid var(--grey-dark);
  padding: 1.5rem;
  min-height: 32rem;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  margin: 1.5rem 0;
  overflow-x: auto;
  @media (max-width: 500px) {
    min-height: 19rem;
  }
  &:hover {
    cursor: pointer;
  }
`
