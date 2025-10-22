// src/theme/starWarsTheme.ts
import { createTheme } from "@mui/material/styles";

export const starWarsTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ffe81f" },
    secondary: { main: "#ffffff" },
    error: { main: "#ff5555" }, // добавлено
    warning: { main: "#ffaa00" }, // если понадобится
    background: { default: "#000000", paper: "#111111" },
    text: { primary: "#ffe81f", secondary: "#aaaaaa" },
  },
  typography: {
    fontFamily: '"Star Jedi", "Arial", sans-serif',

    h1: { fontSize: "3rem", color: "#ffe81f", textShadow: "0 0 10px #ffe81f" },
    h2: {
      fontSize: "2.5rem",
      color: "#ffe81f",
      textShadow: "0 0 10px #ffe81f",
    },
    h4: {
      color: "#ffe81f",
      textShadow: "0 0 10px #ffe81f",
    },
    body1: { color: "#ffffff" },
    body2: { color: "#aaaaaa", fontSize: "1rem" },

    // ⭐ кастомные варианты
    jediTitle: {
      fontSize: "2rem",
      color: "#ffe81f",
      textShadow: "0 0 12px #ffe81f",
      fontFamily: '"Star Jedi", sans-serif',
      letterSpacing: 2,
    },
    sithWarning: {
      fontSize: "1.6rem",
      color: "#ff1f1f",
      textShadow: "0 0 10px #ff1f1f",
      fontFamily: '"Star Jedi", sans-serif',
      textTransform: "uppercase",
    },
    lightText: {
      fontSize: "1rem",
      color: "#ffffff",
      textShadow: "0 0 4px rgba(255,255,255,0.6)",
    },
  },
});
