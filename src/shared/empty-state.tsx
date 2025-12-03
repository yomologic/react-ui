import React from "react";
import { cn } from "../lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
    ({ className, icon, title, description, action, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col items-center justify-center text-center py-12 px-4",
                    className
                )}
                {...props}
            >
                {icon && (
                    <div className="mb-4 text-(--color-placeholder)">
                        {icon}
                    </div>
                )}

                <h3 className="text-h4 font-semibold text-(--color-foreground) mb-2">
                    {title}
                </h3>

                {description && (
                    <p className="text-small text-(--color-muted-foreground) mb-6 max-w-sm">
                        {description}
                    </p>
                )}

                {action && <div>{action}</div>}
            </div>
        );
    }
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
