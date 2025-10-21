// src/components/UI/StarBox.tsx
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StarBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 0 10px ${theme.palette.primary.main}`,
  transition: "0.3s all",
  "&:hover": {
    boxShadow: `0 0 15px ${theme.palette.primary.main}`,
  },
}));
