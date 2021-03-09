import styled from '@emotion/styled'
import { motion } from 'framer-motion'

// dark grey: #474747

export const StudentContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 1rem;
  border: 0.05rem solid #535353;
  border-radius: 5px;
  width: 100%;
  margin-top: 0.2rem;
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
  overflow: hidden;
  padding: 2rem 1.5rem;
`

export const NameDisplayBox = styled.div`
  display: flex;
  position: relative;
  min-height: 38vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #ebf8ff;
  border: 1px solid #535353;
  border-radius: 3px;
  margin: 2rem 0;
  overflow-x: auto;
`
