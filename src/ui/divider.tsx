import React from "react";

export interface DividerProps {
    /**
     * The variant to use
     * @default "fullWidth"
     */
    variant?: "fullWidth" | "inset" | "middle";
    /**
     * The orientation of the divider
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The alignment of the content when children are provided
     * @default "center"
     */
    textAlign?: "left" | "center" | "right";
    /**
     * If true, the divider will have flex item properties when in a flex container
     * @default false
     */
    flexItem?: boolean;
    /**
     * Thickness of the divider line in pixels
     * @default 1
     */
    thickness?: number;
    /**
     * Content to be rendered inside the divider
     */
    children?: React.ReactNode;
    /**
     * Additional CSS classes
     */
    className?: string;
}

export const Divider: React.FC<DividerProps> = ({
    variant = "fullWidth",
    orientation = "horizontal",
    textAlign = "center",
    flexItem = false,
    thickness = 1,
    children,
    className = "",
}) => {
    const isVertical = orientation === "vertical";

    // Base classes
    const baseClasses = "border-0";

    // Base styles with CSS variables
    const baseStyles: React.CSSProperties = {
        backgroundColor: "var(--color-border, #9ca3af)",
    };

    // Variant classes
    const variantClasses = {
        fullWidth: "",
        inset: isVertical ? "" : "ml-16",
        middle: isVertical ? "my-2" : "mx-4",
    };

    // Orientation classes with thickness
    const thicknessStyle = isVertical
        ? { width: `${thickness}px` }
        : { height: `${thickness}px` };

    const orientationClasses = isVertical
        ? "inline-block min-h-[1rem]"
        : "block w-full";

    // Flex item classes
    const flexClasses = flexItem && isVertical ? "self-stretch !h-auto" : "";

    // Text styles with CSS variables
    const textStyles: React.CSSProperties = {
        fontSize: "var(--text-sm, 0.875rem)",
        color: "var(--color-muted-foreground, #6b7280)",
    };

    // If there are children, render as a div with content
    if (children) {
        const leftLineClasses =
            textAlign === "left"
                ? `${baseClasses} ${orientationClasses}`
                : `flex-1 ${baseClasses} ${orientationClasses}`;
        const rightLineClasses =
            textAlign === "right"
                ? `${baseClasses} ${orientationClasses}`
                : `flex-1 ${baseClasses} ${orientationClasses}`;

        return (
            <div
                role="presentation"
                className={`flex items-center gap-3 ${variantClasses[variant]} ${className}`}
            >
                {textAlign !== "left" && (
                    <div
                        style={{ ...baseStyles, ...thicknessStyle }}
                        className={leftLineClasses}
                    />
                )}
                <div style={textStyles} className="whitespace-nowrap">
                    {children}
                </div>
                {textAlign !== "right" && (
                    <div
                        style={{ ...baseStyles, ...thicknessStyle }}
                        className={rightLineClasses}
                    />
                )}
            </div>
        );
    }

    // Render as hr for horizontal or div for vertical
    if (isVertical) {
        return (
            <div
                role="separator"
                aria-orientation="vertical"
                style={{ ...baseStyles, ...thicknessStyle }}
                className={`${baseClasses} ${orientationClasses} ${variantClasses[variant]} ${flexClasses} ${className}`}
            />
        );
    }

    return (
        <hr
            style={{ ...baseStyles, ...thicknessStyle }}
            className={`${baseClasses} ${orientationClasses} ${variantClasses[variant]} ${className}`}
        />
    );
};
