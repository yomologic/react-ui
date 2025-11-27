import Image from "next/image";
import React from "react";
import { cn } from "../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "bordered" | "elevated";
    padding?: "none" | "sm" | "md" | "lg";
    hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = "default",
            padding = "md",
            hoverable = false,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = "bg-white rounded-lg";

        const variants = {
            default: "border border-gray-200",
            bordered: "border-2 border-gray-300",
            elevated: "shadow-md",
        };

        const paddings = {
            none: "",
            sm: "p-3",
            md: "p-4",
            lg: "p-6",
        };

        const hoverStyles = hoverable
            ? "hover:shadow-lg transition-shadow cursor-pointer"
            : "";

        return (
            <div
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    paddings[padding],
                    hoverStyles,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold text-gray-800", className)}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-gray-600", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
    image?: string;
    video?: string;
    component?: "img" | "video" | "div" | "next-image";
    aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9" | string;
    alt?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    priority?: boolean;
}

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
    (
        {
            className,
            image,
            video,
            component = "div",
            aspectRatio = "16/9",
            alt = "",
            style,
            fill = true,
            width,
            height,
            priority = false,
            ...props
        },
        ref
    ) => {
        const aspectRatioStyle = {
            aspectRatio,
            ...style,
        };

        if (component === "next-image" && image) {
            return (
                <div
                    ref={ref}
                    className={cn("relative w-full overflow-hidden", className)}
                    style={aspectRatioStyle}
                >
                    <Image
                        src={image}
                        alt={alt}
                        fill={fill}
                        width={!fill ? width : undefined}
                        height={!fill ? height : undefined}
                        className={cn(
                            "w-full h-full",
                            fill ? "object-contain" : ""
                        )}
                        priority={priority}
                        {...(props as any)}
                    />
                </div>
            );
        }

        if (component === "img" && image) {
            return (
                <img
                    ref={ref as React.Ref<HTMLImageElement>}
                    src={image}
                    alt={alt}
                    className={cn("w-full object-cover", className)}
                    style={aspectRatioStyle}
                    {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
                />
            );
        }

        if (component === "video" && video) {
            return (
                <video
                    ref={ref as React.Ref<HTMLVideoElement>}
                    src={video}
                    className={cn("w-full object-cover", className)}
                    style={aspectRatioStyle}
                    {...(props as React.VideoHTMLAttributes<HTMLVideoElement>)}
                />
            );
        }

        // Default: background image div
        return (
            <div
                ref={ref}
                className={cn("w-full bg-cover bg-center", className)}
                style={{
                    ...aspectRatioStyle,
                    backgroundImage: image ? `url(${image})` : undefined,
                }}
                role={image ? "img" : undefined}
                aria-label={image ? alt : undefined}
                {...props}
            />
        );
    }
);
CardMedia.displayName = "CardMedia";

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    disableSpacing?: boolean;
}

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
    ({ className, disableSpacing = false, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "flex items-center",
                !disableSpacing && "gap-2 p-4",
                className
            )}
            {...props}
        />
    )
);
CardActions.displayName = "CardActions";

export interface CardActionAreaProps
    extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
}

const CardActionArea = React.forwardRef<HTMLDivElement, CardActionAreaProps>(
    ({ className, disabled = false, children, ...props }, ref) => (
        <div
            ref={ref}
            role="button"
            tabIndex={disabled ? -1 : 0}
            className={cn(
                "cursor-pointer transition-colors",
                "hover:bg-gray-50 active:bg-gray-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                disabled &&
                    "cursor-not-allowed opacity-50 hover:bg-transparent",
                className
            )}
            aria-disabled={disabled}
            {...props}
        >
            {children}
        </div>
    )
);
CardActionArea.displayName = "CardActionArea";

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardMedia,
    CardActions,
    CardActionArea,
};
