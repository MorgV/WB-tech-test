import { createTheme } from "@mui/material/styles";

export const starWarsTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ffe81f" }, // Star Wars yellow
    secondary: { main: "#ffffff" },
    background: { default: "#000000", paper: "#111111" },
    text: { primary: "#ffe81f", secondary: "#aaaaaa" },
  },
  typography: {
    fontFamily: '"Star Jedi", "Arial", sans-serif',
    h1: { fontSize: "3rem", color: "#ffe81f" },
    h2: { fontSize: "2.5rem", color: "#ffe81f" },
    h3: { fontSize: "2rem", color: "#ffe81f" },
    body1: { color: "#ffe81f" },
    body2: { color: "#aaaaaa" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid #ffe81f",
          "&:hover": {
            boxShadow: "0 0 8px #ffe81f",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#ffe81f",
          borderBottom: "1px solid #333",
        },
      },
    },
  },
});
