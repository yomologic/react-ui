import React from "react";
import { cn } from "../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant = "default",
            size = "md",
            leftIcon,
            rightIcon,
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
            xs: "text-[0.625rem] px-1.5 py-0.5 gap-1",
            sm: "text-xs px-2 py-0.5 gap-1",
            md: "text-sm px-2.5 py-1 gap-1.5",
            lg: "text-base px-3 py-1.5 gap-2",
            xl: "text-lg px-3.5 py-2 gap-2",
        };

        const iconSizes = {
            xs: "w-2.5 h-2.5",
            sm: "w-3 h-3",
            md: "w-3.5 h-3.5",
            lg: "w-4 h-4",
            xl: "w-5 h-5",
        };

        return (
            <span
                ref={ref}
                style={variantStyles[variant]}
                className={cn(baseStyles, sizes[size], className)}
                {...props}
            >
                {leftIcon && (
                    <span
                        className={cn(
                            "inline-flex items-center justify-center",
                            iconSizes[size]
                        )}
                    >
                        {leftIcon}
                    </span>
                )}
                {children}
                {rightIcon && (
                    <span
                        className={cn(
                            "inline-flex items-center justify-center",
                            iconSizes[size]
                        )}
                    >
                        {rightIcon}
                    </span>
                )}
            </span>
        );
    }
);

Badge.displayName = "Badge";

export { Badge };
