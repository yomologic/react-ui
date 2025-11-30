import { useId } from "react";
import { cn } from "../lib/utils";

interface CheckboxProps {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    id?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Checkbox({
    label,
    checked = false,
    onChange,
    disabled = false,
    className,
    id,
    size = "sm",
}: CheckboxProps) {
    // Auto-generate ID if not provided to ensure label clicking works
    const autoId = useId();
    const checkboxId = id || `checkbox-${autoId}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.checked);
        }
    };

    const containerGapStyles = {
        xs: "gap-2",
        sm: "gap-2",
        md: "gap-2",
        lg: "gap-2",
        xl: "gap-2",
    };

    return (
        <div
            className={cn(
                "flex items-center",
                containerGapStyles[size],
                className
            )}
        >
            <div className="relative group/checkbox flex items-center shrink-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div
                        className="rounded-full scale-0 group-hover/checkbox:scale-100 group-active/checkbox:scale-100 transition-transform duration-200 ease-out"
                        style={{
                            width:
                                size === "xs"
                                    ? "1.75rem"
                                    : size === "sm"
                                      ? "2rem"
                                      : size === "lg"
                                        ? "2.5rem"
                                        : size === "xl"
                                          ? "3rem"
                                          : "2.25rem",
                            height:
                                size === "xs"
                                    ? "1.75rem"
                                    : size === "sm"
                                      ? "2rem"
                                      : size === "lg"
                                        ? "2.5rem"
                                        : size === "xl"
                                          ? "3rem"
                                          : "2.25rem",
                            backgroundColor: "var(--checkbox-hover-bg)",
                        }}
                    />
                </div>
                <input
                    type="checkbox"
                    id={checkboxId}
                    checked={checked}
                    onChange={handleChange}
                    disabled={disabled}
                    className={cn(
                        "rounded-(--checkbox-radius) focus:outline-none transition-all relative z-10",
                        disabled && "cursor-not-allowed"
                    )}
                    style={{
                        width:
                            size === "xs"
                                ? "var(--checkbox-size-xs)"
                                : size === "sm"
                                  ? "var(--checkbox-size-sm)"
                                  : size === "lg"
                                    ? "var(--checkbox-size-lg)"
                                    : size === "xl"
                                      ? "var(--checkbox-size-xl)"
                                      : "var(--checkbox-size-md)",
                        height:
                            size === "xs"
                                ? "var(--checkbox-size-xs)"
                                : size === "sm"
                                  ? "var(--checkbox-size-sm)"
                                  : size === "lg"
                                    ? "var(--checkbox-size-lg)"
                                    : size === "xl"
                                      ? "var(--checkbox-size-xl)"
                                      : "var(--checkbox-size-md)",
                        borderColor: "var(--checkbox-border-color)",
                        color: "var(--checkbox-checked-color)",
                        opacity: disabled
                            ? "var(--checkbox-disabled-opacity)"
                            : undefined,
                    }}
                />
            </div>
            {label && (
                <label
                    htmlFor={checkboxId}
                    className={cn(
                        "font-medium",
                        disabled && "cursor-not-allowed",
                        !disabled && "cursor-pointer"
                    )}
                    style={{
                        fontSize:
                            size === "xs"
                                ? "var(--checkbox-label-font-size-xs)"
                                : size === "sm"
                                  ? "var(--checkbox-label-font-size-sm)"
                                  : size === "lg"
                                    ? "var(--checkbox-label-font-size-lg)"
                                    : size === "xl"
                                      ? "var(--checkbox-label-font-size-xl)"
                                      : "var(--checkbox-label-font-size-md)",
                        color: "var(--checkbox-label-color)",
                        opacity: disabled
                            ? "var(--checkbox-disabled-opacity)"
                            : undefined,
                    }}
                >
                    {label}
                </label>
            )}
        </div>
    );
}

interface CheckboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface CheckboxGroupProps {
    label?: string;
    name: string;
    options: CheckboxOption[];
    value?: string[];
    onChange?: (value: string[]) => void;
    className?: string;
    orientation?: "vertical" | "horizontal";
    required?: boolean;
    disabled?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function CheckboxGroup({
    label,
    name,
    options,
    value = [],
    onChange,
    className,
    orientation = "vertical",
    required = false,
    disabled = false,
    size = "sm",
}: CheckboxGroupProps) {
    const handleChange = (optionValue: string, checked: boolean) => {
        if (onChange) {
            if (checked) {
                onChange([...value, optionValue]);
            } else {
                onChange(value.filter((v) => v !== optionValue));
            }
        }
    };

    const containerGapStyles = {
        xs: "gap-2",
        sm: "gap-2",
        md: "gap-2",
        lg: "gap-2",
        xl: "gap-2",
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
                    orientation === "horizontal"
                        ? "flex flex-wrap items-center gap-4"
                        : "space-y-2"
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
                            <div className="relative group/checkbox flex items-center shrink-0">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <div
                                        className="rounded-full scale-0 group-hover/checkbox:scale-100 group-active/checkbox:scale-100 transition-transform duration-200 ease-out"
                                        style={{
                                            width:
                                                size === "xs"
                                                    ? "1.75rem"
                                                    : size === "sm"
                                                      ? "2rem"
                                                      : size === "lg"
                                                        ? "2.5rem"
                                                        : size === "xl"
                                                          ? "3rem"
                                                          : "2.25rem",
                                            height:
                                                size === "xs"
                                                    ? "1.75rem"
                                                    : size === "sm"
                                                      ? "2rem"
                                                      : size === "lg"
                                                        ? "2.5rem"
                                                        : size === "xl"
                                                          ? "3rem"
                                                          : "2.25rem",
                                            backgroundColor:
                                                "var(--checkbox-hover-bg)",
                                        }}
                                    />
                                </div>
                                <input
                                    type="checkbox"
                                    id={`${name}-${option.value}`}
                                    name={name}
                                    value={option.value}
                                    checked={value.includes(option.value)}
                                    onChange={(e) =>
                                        handleChange(
                                            option.value,
                                            e.target.checked
                                        )
                                    }
                                    disabled={isDisabled}
                                    className={cn(
                                        "rounded-(--checkbox-radius) focus:outline-none transition-all relative z-10",
                                        isDisabled && "cursor-not-allowed"
                                    )}
                                    style={{
                                        width:
                                            size === "xs"
                                                ? "var(--checkbox-size-xs)"
                                                : size === "sm"
                                                  ? "var(--checkbox-size-sm)"
                                                  : size === "lg"
                                                    ? "var(--checkbox-size-lg)"
                                                    : size === "xl"
                                                      ? "var(--checkbox-size-xl)"
                                                      : "var(--checkbox-size-md)",
                                        height:
                                            size === "xs"
                                                ? "var(--checkbox-size-xs)"
                                                : size === "sm"
                                                  ? "var(--checkbox-size-sm)"
                                                  : size === "lg"
                                                    ? "var(--checkbox-size-lg)"
                                                    : size === "xl"
                                                      ? "var(--checkbox-size-xl)"
                                                      : "var(--checkbox-size-md)",
                                        borderColor:
                                            "var(--checkbox-border-color)",
                                        color: "var(--checkbox-checked-color)",
                                        opacity: isDisabled
                                            ? "var(--checkbox-disabled-opacity)"
                                            : undefined,
                                    }}
                                />
                            </div>
                            <label
                                htmlFor={`${name}-${option.value}`}
                                className={cn(
                                    "font-medium",
                                    isDisabled && "cursor-not-allowed",
                                    !isDisabled && "cursor-pointer"
                                )}
                                style={{
                                    fontSize:
                                        size === "xs"
                                            ? "var(--checkbox-label-font-size-xs)"
                                            : size === "sm"
                                              ? "var(--checkbox-label-font-size-sm)"
                                              : size === "lg"
                                                ? "var(--checkbox-label-font-size-lg)"
                                                : size === "xl"
                                                  ? "var(--checkbox-label-font-size-xl)"
                                                  : "var(--checkbox-label-font-size-md)",
                                    color: "var(--checkbox-label-color)",
                                    opacity: isDisabled
                                        ? "var(--checkbox-disabled-opacity)"
                                        : undefined,
                                }}
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
