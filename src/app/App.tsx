// src/App.tsx
import { ThemeProvider } from "@mui/material/styles";

import { AppRouter } from "./app/router/";
import { starWarsTheme } from "./shared/theme/starWarsTheme";
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <ThemeProvider theme={starWarsTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
