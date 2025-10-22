// src/shared/UI/StarBox.tsx
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StarBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  border: "1px solid rgba(255, 232, 31, 0.4)",
  background: "rgba(255, 255, 255, 0.05)",
  boxShadow: "0 0 20px rgba(255, 232, 31, 0.1)",
  transition: "box-shadow 0.3s, transform 0.3s",
  "&:hover": {
    boxShadow: "0 0 25px rgba(255, 232, 31, 0.3)",
    transform: "translateY(-2px)",
  },
}));
