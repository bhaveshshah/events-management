import { PropTypes } from "prop-types";
import "./Button.css";

const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "danger",
  "ghost",
  "transparent",
];

const BUTTON_SIZES = ["small", "medium", "large"];

const variantStyles = {
  primary:
    "bg-linear-to-bl from-violet-400 to-fuchsia-400 text-white font-semibold",
  secondary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const baseStyles =
  "rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

export const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`btn ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}${className ? ` ${className}` : ""}`}
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
