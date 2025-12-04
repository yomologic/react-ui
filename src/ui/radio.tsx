"use client";

import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { useForm, ValidationFunction } from "./form";

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
    error?: string;
    helperText?: string;
    errorMessage?: string;
    validate?: ValidationFunction;
}

export function RadioGroup({
    label,
    name,
    options,
    value: externalValue,
    onChange,
    className,
    orientation = "vertical",
    required = false,
    disabled = false,
    size = "sm",
    error,
    helperText,
    errorMessage,
    validate,
}: RadioGroupProps) {
    const form = useForm();
    const [validationError, setValidationError] = useState<
        string | undefined
    >();
    const [touched, setTouched] = useState(false);

    // Determine value source
    let value: string | undefined;
    let displayError: string | undefined;

    if (form && name) {
        // Using Form context
        value = form.values[name] ?? externalValue;
        displayError = form.shouldShowError(name)
            ? form.getFieldError(name)
            : undefined;
    } else {
        // Standalone usage
        value = externalValue;
        displayError = error || validationError;
    }

    // Register with Form
    useEffect(() => {
        if (form && name) {
            const validator: ValidationFunction = async (val: string) => {
                if (required && !val) {
                    return errorMessage || "Please select an option";
                }
                if (validate) {
                    return await validate(val);
                }
                return undefined;
            };

            form.registerField(name, validator);
            return () => form.unregisterField(name);
        }
    }, [form, name]);

    // Validate on value change if touched (standalone mode only)
    useEffect(() => {
        if (!form && touched && required && !value) {
            setValidationError(errorMessage || "Please select an option");
        } else if (!form) {
            setValidationError(undefined);
        }
    }, [value, touched, required, errorMessage, form]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (form && name) {
            // Update Form context
            form.setFieldValue(name, newValue);
            form.setFieldTouched(name, true);
            // Validate on change for radio (immediate feedback with new value)
            form.validateField(name, newValue);
        } else {
            // Standalone mode
            setTouched(true);
            onChange?.(newValue);
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
            className={className}
            style={{ marginBottom: "var(--form-control-spacing)" }}
        >
            {label && (
                <label
                    className="block text-small font-semibold mb-1"
                    style={{ color: "var(--color-muted-foreground)" }}
                >
                    {label}
                    {required && <span className="ml-1">*</span>}
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
                            <div className="relative group/radio flex items-center shrink-0">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <div
                                        className="rounded-full scale-0 group-hover/radio:scale-100 group-active/radio:scale-100 transition-transform duration-200 ease-out"
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
                                                "var(--radio-hover-bg)",
                                        }}
                                    />
                                </div>
                                <input
                                    type="radio"
                                    id={`${name}-${option.value}`}
                                    name={name}
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    className={cn(
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all relative z-10 rounded-full",
                                        isDisabled && "cursor-not-allowed"
                                    )}
                                    style={{
                                        width:
                                            size === "xs"
                                                ? "var(--radio-size-xs)"
                                                : size === "sm"
                                                  ? "var(--radio-size-sm)"
                                                  : size === "lg"
                                                    ? "var(--radio-size-lg)"
                                                    : size === "xl"
                                                      ? "var(--radio-size-xl)"
                                                      : "var(--radio-size-md)",
                                        height:
                                            size === "xs"
                                                ? "var(--radio-size-xs)"
                                                : size === "sm"
                                                  ? "var(--radio-size-sm)"
                                                  : size === "lg"
                                                    ? "var(--radio-size-lg)"
                                                    : size === "xl"
                                                      ? "var(--radio-size-xl)"
                                                      : "var(--radio-size-md)",
                                        borderColor: "var(--color-border)",
                                        backgroundColor: "var(--color-muted)",
                                        accentColor: "var(--color-primary)",
                                        opacity: isDisabled
                                            ? "var(--radio-disabled-opacity)"
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
                                            ? "var(--radio-label-font-size-xs)"
                                            : size === "sm"
                                              ? "var(--radio-label-font-size-sm)"
                                              : size === "lg"
                                                ? "var(--radio-label-font-size-lg)"
                                                : size === "xl"
                                                  ? "var(--radio-label-font-size-xl)"
                                                  : "var(--radio-label-font-size-md)",
                                    color: "var(--color-muted-foreground)",
                                    opacity: isDisabled
                                        ? "var(--radio-disabled-opacity)"
                                        : undefined,
                                }}
                            >
                                {option.label}
                            </label>
                        </div>
                    );
                })}
            </div>
            <div className="h-5 mt-1.5">
                {(displayError || helperText) && (
                    <p
                        className={`text-caption ${displayError ? "text-red-600" : "text-(--color-muted-foreground)"}`}
                        role={displayError ? "alert" : undefined}
                    >
                        {displayError || helperText}
                    </p>
                )}
            </div>
        </div>
    );
}
