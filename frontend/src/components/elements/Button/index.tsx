import { forwardRef } from "react";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { NextLinkComposed } from "components/elements/Link";

interface ButtonProps extends LoadingButtonProps {
  /**
   * Whether button should have automatic fluid responsive sizing
   */
  fluidSize?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ fluidSize = true, href, ...others }, ref) => {
    return (
      <LoadingButton
        component={href ? NextLinkComposed : "button"}
        to={href}
        sx={
          !fluidSize
            ? { fontSize: STATIC_SIZES[others.size || "medium"], ...others.sx }
            : { ...others.sx }
        }
        data-testid="Button"
        ref={ref}
        {...others}
      />
    );
  }
);
Button.displayName = "Button";

const STATIC_SIZES = {
  small: "0.875rem",
  medium: "1rem",
  large: "1.125rem",
};

export default Button;
