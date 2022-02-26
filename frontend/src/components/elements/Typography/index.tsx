import { forwardRef } from "react";
import MuiTypography, {
  TypographyProps as MuiTypographyProps,
} from "@mui/material/Typography";

interface TypographyProps extends MuiTypographyProps {
  fluidSize?: boolean;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ fluidSize = true, ...others }, ref) => {
    return (
      <MuiTypography
        ref={ref}
        style={
          fluidSize && others.variant !== "inherit"
            ? {
                // @ts-ignore
                fontSize: FLUID_FONT_SIZES[others.variant],
              }
            : {}
        }
        data-testid="Typography"
        {...others}
      />
    );
  }
);
Typography.displayName = "Typography";

export const FLUID_FONT_SIZES = {
  display: "clamp(2.625rem,6vw,3.5rem)",
  h1: "clamp(2.25rem,6vw,3rem)",
  h2: "clamp(1.625rem,4.5vw,2.25rem)",
  h4: "clamp(1.125rem,3vw,1.5rem)",
  body1: "clamp(0.75rem,2vw,1rem)",
  button: "1rem",
  overline: "clamp(1rem,2.25vw,1.125rem)",
};

export default Typography;
