import React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:
        | "primary"
        | "secondary"
        | "outline"
        | "ghost"
        | "info"
        | "success"
        | "warning"
        | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
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
            "inline-flex items-center justify-center cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100";

        // Use inline styles with CSS variables for semantic variants
        const getVariantStyles = (variant: string) => {
            const styles: React.CSSProperties = {};

            switch (variant) {
                case "primary":
                    styles.backgroundColor = "var(--color-primary)";
                    styles.color = "var(--button-primary-text)";
                    break;
                case "secondary":
                    styles.backgroundColor = "var(--color-secondary)";
                    styles.color = "var(--button-secondary-text)";
                    break;
                case "outline":
                    styles.borderWidth = "var(--button-border-width)";
                    styles.borderColor = "var(--color-primary)";
                    styles.color = "var(--color-primary)";
                    break;
                case "ghost":
                    styles.color = "var(--color-foreground)";
                    break;
                case "info":
                    styles.backgroundColor = "var(--color-info-muted)";
                    styles.borderColor = "var(--color-info-border)";
                    styles.color = "var(--color-info-muted-foreground)";
                    break;
                case "success":
                    styles.backgroundColor = "var(--color-success-muted)";
                    styles.borderColor = "var(--color-success-border)";
                    styles.color = "var(--color-success-muted-foreground)";
                    break;
                case "warning":
                    styles.backgroundColor = "var(--color-warning-muted)";
                    styles.borderColor = "var(--color-warning-border)";
                    styles.color = "var(--color-warning-muted-foreground)";
                    break;
                case "error":
                    styles.backgroundColor = "var(--color-error-muted)";
                    styles.borderColor = "var(--color-error-border)";
                    styles.color = "var(--color-error-muted-foreground)";
                    break;
            }

            return styles;
        };

        const variants = {
            primary: "hover:brightness-90 active:brightness-75",
            secondary: "hover:brightness-90 active:brightness-75",
            outline: "border-2 bg-transparent",
            ghost: "bg-transparent",
            info: "border-2 hover:brightness-95 active:brightness-90",
            success: "border-2 hover:brightness-95 active:brightness-90",
            warning: "border-2 hover:brightness-95 active:brightness-90",
            error: "border-2 hover:brightness-95 active:brightness-90",
        };
        const sizes = {
            xs: "[font-size:var(--button-font-size-xs)] [padding-left:var(--button-padding-xs-x)] [padding-right:var(--button-padding-xs-x)] [padding-top:var(--button-padding-xs-y)] [padding-bottom:var(--button-padding-xs-y)] gap-1",
            sm: "[font-size:var(--button-font-size-sm)] [padding-left:var(--button-padding-sm-x)] [padding-right:var(--button-padding-sm-x)] [padding-top:var(--button-padding-sm-y)] [padding-bottom:var(--button-padding-sm-y)] gap-1.5",
            md: "[font-size:var(--button-font-size-md)] [padding-left:var(--button-padding-md-x)] [padding-right:var(--button-padding-md-x)] [padding-top:var(--button-padding-md-y)] [padding-bottom:var(--button-padding-md-y)] gap-2",
            lg: "[font-size:var(--button-font-size-lg)] [padding-left:var(--button-padding-lg-x)] [padding-right:var(--button-padding-lg-x)] [padding-top:var(--button-padding-lg-y)] [padding-bottom:var(--button-padding-lg-y)] gap-2.5",
            xl: "[font-size:var(--button-font-size-xl)] [padding-left:var(--button-padding-xl-x)] [padding-right:var(--button-padding-xl-x)] [padding-top:var(--button-padding-xl-y)] [padding-bottom:var(--button-padding-xl-y)] gap-3",
        };

        const radiusStyle = "[border-radius:var(--button-radius)]";
        const fontWeightStyle = "[font-weight:var(--button-font-weight)]";

        return (
            <button
                ref={ref}
                style={getVariantStyles(variant)}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    radiusStyle,
                    fontWeightStyle,
                    className
                )}
                onMouseEnter={(e) => {
                    if (variant === "ghost") {
                        e.currentTarget.style.backgroundColor =
                            "rgba(99, 102, 241, 0.08)";
                    } else if (variant === "outline") {
                        e.currentTarget.style.backgroundColor =
                            "rgba(59, 130, 246, 0.12)";
                    }
                }}
                onMouseLeave={(e) => {
                    if (variant === "ghost" || variant === "outline") {
                        e.currentTarget.style.backgroundColor = "";
                    }
                }}
                onMouseDown={(e) => {
                    if (variant === "ghost") {
                        e.currentTarget.style.backgroundColor =
                            "rgba(99, 102, 241, 0.16)";
                    } else if (variant === "outline") {
                        e.currentTarget.style.backgroundColor =
                            "rgba(59, 130, 246, 0.24)";
                    }
                }}
                onMouseUp={(e) => {
                    if (variant === "ghost") {
                        e.currentTarget.style.backgroundColor =
                            "rgba(99, 102, 241, 0.08)";
                    } else if (variant === "outline") {
                        e.currentTarget.style.backgroundColor =
                            "rgba(59, 130, 246, 0.12)";
                    }
                }}
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
