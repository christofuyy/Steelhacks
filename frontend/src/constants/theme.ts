import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    display: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    display?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display: true;
  }
}

const theme = createTheme({
  typography: {
    display: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 2,
    },
    button: {
      textTransform: "none",
    },
    overline: {
      fontSize: "1.125rem",
      fontWeight: 700,
      lineHeight: 1,
    },
    fontFamily: 'Lato, "sans-serif"',
  },
});

export default theme;
