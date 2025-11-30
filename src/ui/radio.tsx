import { cn } from "../lib/utils";

interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface RadioGroupProps {
    label?: string;
    name: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    orientation?: "vertical" | "horizontal";
    required?: boolean;
    disabled?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function RadioGroup({
    label,
    name,
    options,
    value,
    onChange,
    className,
    orientation = "vertical",
    required = false,
    disabled = false,
    size = "md",
}: RadioGroupProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const sizeStyles = {
        xs: `[width:var(--radio-size-xs)] [height:var(--radio-size-xs)]`,
        sm: `[width:var(--radio-size-sm)] [height:var(--radio-size-sm)]`,
        md: `[width:var(--radio-size-md)] [height:var(--radio-size-md)]`,
        lg: `[width:var(--radio-size-lg)] [height:var(--radio-size-lg)]`,
        xl: `[width:var(--radio-size-xl)] [height:var(--radio-size-xl)]`,
    };

    const labelSizeStyles = {
        xs: `[font-size:var(--radio-label-font-size-xs)]`,
        sm: `[font-size:var(--radio-label-font-size-sm)]`,
        md: `[font-size:var(--radio-label-font-size-md)]`,
        lg: `[font-size:var(--radio-label-font-size-lg)]`,
        xl: `[font-size:var(--radio-label-font-size-xl)]`,
    };

    const containerGapStyles = {
        xs: "gap-1.5",
        sm: "gap-2",
        md: "gap-2",
        lg: "gap-2.5",
        xl: "gap-2.5",
    };

    return (
        <div className={className}>
            {label && (
                <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "var(--color-muted-foreground)" }}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div
                className={cn(
                    orientation === "vertical" && "space-y-2",
                    orientation === "horizontal" && "flex flex-wrap gap-4"
                )}
            >
                {options.map((option) => {
                    const isDisabled = disabled || option.disabled;
                    return (
                        <div
                            key={option.value}
                            className={cn(
                                "flex items-center",
                                containerGapStyles[size]
                            )}
                        >
                            <input
                                type="radio"
                                id={`${name}-${option.value}`}
                                name={name}
                                value={option.value}
                                checked={value === option.value}
                                onChange={handleChange}
                                disabled={isDisabled}
                                className={cn(
                                    sizeStyles[size],
                                    "border-gray-400 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                                    isDisabled &&
                                        "cursor-not-allowed opacity-50"
                                )}
                            />
                            <label
                                htmlFor={`${name}-${option.value}`}
                                className={cn(
                                    labelSizeStyles[size],
                                    "font-medium text-gray-600",
                                    isDisabled &&
                                        "cursor-not-allowed opacity-50",
                                    !isDisabled && "cursor-pointer"
                                )}
                            >
                                {option.label}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
