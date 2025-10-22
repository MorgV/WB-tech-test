import { ThemeProvider, CssBaseline } from "@mui/material";
import { starWarsTheme } from "../../shared/theme/starWarsTheme";

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ThemeProvider theme={starWarsTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
