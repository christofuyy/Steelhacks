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
  palette: {
    primary: {
      light: "#639df1",
      main: "#5292F0",
      dark: "#347fed",
    },
  },
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
      fontWeight: 700,
    },
    overline: {
      fontSize: "1.125rem",
      fontWeight: 700,
      lineHeight: 1,
    },
    fontFamily: 'Lato, "sans-serif"',
  },
});

theme.components = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      outlined: { padding: "0.3125em 0.9375em" },
      contained: { padding: "0.375em 1em" },
      text: { padding: "0.375em 0.5em" },
      sizeSmall: { fontSize: "clamp(0.8125rem,2vw,0.875rem)" },
      sizeMedium: { fontSize: "clamp(0.875rem,2vw,1rem)" },
      sizeLarge: { fontSize: "clamp(1rem,2vw,1.125rem)" },
      startIcon: {
        fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
      },
      endIcon: {
        fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
      },
    },
  },
};

export default theme;
