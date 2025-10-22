// src/App.tsx
import { ThemeProvider } from "@mui/material/styles";

import { CssBaseline } from "@mui/material";
import { starWarsTheme } from "../shared/theme/starWarsTheme";
import { AppRouter } from "./router";

const App = () => {
  return (
    <ThemeProvider theme={starWarsTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
