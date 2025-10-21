// src/components/UI/StarAvatar.tsx
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";

export const StarAvatar = styled(Avatar)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: `0 0 8px ${theme.palette.primary.main}`,
}));
