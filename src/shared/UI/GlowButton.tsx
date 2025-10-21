// src/components/UI/GlowButton.tsx
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const GlowButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  transition: "0.3s all",
  "&:hover": {
    boxShadow: `0 0 8px ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
  },
}));
