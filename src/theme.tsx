import { extendTheme } from '@chakra-ui/react'
const theme = extendTheme({
  components: {
    Modal: {
      sizes: {
        full: {
          h: '100%',
        },
      },
    },
    Editable: {
      sizes: {
        xl: {
          h: '56px',
          fontSize: '2rem',
          px: '32px',
        },
      },
    },
  },
})
export default theme
