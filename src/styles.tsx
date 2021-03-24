import styled from '@emotion/styled'
import { motion } from 'framer-motion'

// dark grey: #474747

export const StudentInGroupContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  border: 1px solid #535353;
  border-radius: 5px;
  width: 100%;
  margin-top: 3px;
  color: #2a4365;
`

export const StudentContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  border: 1px solid #535353;
  border-radius: 5px;
  width: 100%;
  margin-top: 3px;
  color: #2a4365;
  transition: all 0.3s ease-in;
  &:hover {
    cursor: pointer;
    transform: translateY(-0.2rem);
    background-color: #bee3f8;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.6);
  }
`

export const FormBox = styled.div`
  width: 100%;
  max-width: 30rem;
  padding: 2rem 0;
`

export const PageContentsBox = styled.div`
  color: #535353;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: auto;
  padding: 1rem;
`

export const NameDisplayBox = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid black;
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
  } ;
`
