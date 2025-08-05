import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00695c',
    },
    secondary: {
      main: '#fbc02d',
    },
    background: {
      default: '#000000',
      paper: '#1d2025',
    },
    warning: {
      main: '#d500f9',
    },
    info: {
      main: '#3949ab',
    },
    success: {
      main: '#004d40',
    },
    divider: '#76ff03',
  },
};

export function theme(): ThemeOptions {
  return createTheme(themeOptions);
}
