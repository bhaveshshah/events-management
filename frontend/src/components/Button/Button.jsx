import { PropTypes } from "prop-types";
import "./Button.css";

export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "danger",
  "ghost",
  "transparent",
];

export const BUTTON_SIZES = ["small", "medium", "large"];

export const Button = ({
  variant = "secondary",
  size = "medium",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(BUTTON_VARIANTS),
  size: PropTypes.oneOf(BUTTON_SIZES),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
