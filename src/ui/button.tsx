import React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Use CSS variables for theming
    const variants = {
      primary:
        "[background-color:var(--color-primary)] text-white hover:[background-color:var(--color-primary-hover)] focus:[--tw-ring-color:var(--color-primary)]",
      secondary:
        "[background-color:var(--color-secondary)] text-white hover:[background-color:var(--color-secondary-hover)] focus:[--tw-ring-color:var(--color-secondary)]",
      outline:
        "border-2 [border-color:var(--color-primary)] [color:var(--color-primary)] hover:bg-blue-50 focus:[--tw-ring-color:var(--color-primary)]",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      danger:
        "[background-color:var(--color-error)] text-white hover:bg-red-700 focus:[--tw-ring-color:var(--color-error)]",
    };

    const sizes = {
      sm: "[font-size:var(--button-text-sm)] [padding-left:var(--button-padding-sm-x)] [padding-right:var(--button-padding-sm-x)] [padding-top:var(--button-padding-sm-y)] [padding-bottom:var(--button-padding-sm-y)] gap-1.5",
      md: "[font-size:var(--button-text-md)] [padding-left:var(--button-padding-md-x)] [padding-right:var(--button-padding-md-x)] [padding-top:var(--button-padding-md-y)] [padding-bottom:var(--button-padding-md-y)] gap-2",
      lg: "[font-size:var(--button-text-lg)] [padding-left:var(--button-padding-lg-x)] [padding-right:var(--button-padding-lg-x)] [padding-top:var(--button-padding-lg-y)] [padding-bottom:var(--button-padding-lg-y)] gap-2.5",
    };

    const radiusStyle = "[border-radius:var(--button-radius)]";
    const fontWeightStyle = "[font-weight:var(--button-font-weight)]";

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          radiusStyle,
          fontWeightStyle,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && leftIcon}
        {children}
        {!isLoading && rightIcon && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
