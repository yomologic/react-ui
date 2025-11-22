import React from "react";
import { cn } from "../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center font-medium rounded-full";

    const variantStyles = {
      default: {
        backgroundColor: "#e5e7eb",
        color: "#374151",
      },
      info: {
        backgroundColor: "var(--color-info-muted)",
        color: "var(--color-info-muted-foreground)",
      },
      success: {
        backgroundColor: "var(--color-success-muted)",
        color: "var(--color-success-muted-foreground)",
      },
      warning: {
        backgroundColor: "var(--color-warning-muted)",
        color: "var(--color-warning-muted-foreground)",
      },
      error: {
        backgroundColor: "var(--color-error-muted)",
        color: "var(--color-error-muted-foreground)",
      },
    };

    const sizes = {
      xs: "text-[0.625rem] px-1.5 py-0.5",
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-1",
      lg: "text-base px-3 py-1.5",
      xl: "text-lg px-3.5 py-2",
    };

    const dotStyles = {
      default: { backgroundColor: "var(--color-muted-foreground)" },
      info: { backgroundColor: "var(--color-info-border)" },
      success: { backgroundColor: "var(--color-success-border)" },
      warning: { backgroundColor: "var(--color-warning-border)" },
      error: { backgroundColor: "var(--color-error-border)" },
    };

    return (
      <span
        ref={ref}
        style={variantStyles[variant]}
        className={cn(baseStyles, sizes[size], className)}
        {...props}
      >
        {dot && (
          <span
            style={dotStyles[variant]}
            className="w-2 h-2 rounded-full mr-1.5"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
