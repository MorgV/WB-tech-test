// src/components/UI/PageContainer.tsx
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
}));
