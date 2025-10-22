import "@mui/material/styles";
import "@mui/material/Typography";
declare module "@mui/material/styles" {
  interface TypographyVariants {
    jediTitle: React.CSSProperties;
    sithWarning: React.CSSProperties;
    lightText: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    jediTitle?: React.CSSProperties;
    sithWarning?: React.CSSProperties;
    lightText?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    jediTitle: true;
    sithWarning: true;
    lightText: true;
  }
}
