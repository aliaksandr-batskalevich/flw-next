import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export const customColors = {
  primary: '#577e2e', // Зеленый
  primaryLight: '#729636',
  primaryDark: '#388e3c',
  text: '#333',
  border: '#bdbdbd',
};

export default theme;
