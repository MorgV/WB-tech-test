// src/components/UI/StarTableCell.tsx
import { styled } from "@mui/material/styles";
import { TableCell } from "@mui/material";

export const StarTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderBottom: "1px solid #333",
  transition: "0.3s all",
  "&:hover": {
    textShadow: `0 0 5px ${theme.palette.primary.main}`,
  },
}));
