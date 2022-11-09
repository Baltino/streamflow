import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Color } from '@mui/material'


// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#18a3d9',
    },
    secondary: {
      main: '#19857b', // #2a3441
    },
    error: {
      main: red.A400,
    },
  },
});
export default theme;