// src/components/UI/GlowButton.tsx
import { styled } from "@mui/material/styles";
import { Button, type ButtonProps } from "@mui/material";

type GlowButtonProps = ButtonProps & {
  variantColor?: "primary" | "secondary" | "error";
};

export const GlowButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "variantColor",
})<GlowButtonProps>(({ theme, variantColor = "primary" }) => {
  // берём цвета из темы
  let mainColor: string;
  switch (variantColor) {
    case "secondary":
      mainColor = theme.palette.secondary.main;
      break;
    case "error":
      mainColor = theme.palette.error.main;
      break;
    case "primary":
    default:
      mainColor = theme.palette.primary.main;
      break;
  }

  return {
    color: mainColor,
    border: `1px solid ${mainColor}`,
    transition: "0.3s all",
    "&:hover": {
      boxShadow: `0 0 12px ${mainColor}`,
      backgroundColor: theme.palette.background.paper,
    },
  };
});
