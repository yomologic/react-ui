import React, { useId, useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import { useForm, ValidationFunction } from "./form";

interface CheckboxProps {
    label?: string;
    name?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    id?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    required?: boolean;
    /** Custom validation function that returns error message or undefined if valid */
    validate?: ValidationFunction;
    /** Callback when validation error changes */
    onValidationError?: (error: string | undefined) => void;
    /** Custom error message for required validation */
    errorMessage?: string;
}

export function Checkbox({
    label,
    name,
    checked: externalChecked = false,
    onChange,
    disabled = false,
    className,
    id,
    size = "sm",
    required = false,
    validate,
    onValidationError,
    errorMessage,
}: CheckboxProps) {
    const form = useForm();
    const autoId = useId();
    const stableId = useRef<string>();
    if (!stableId.current) {
        stableId.current = id || `checkbox-${autoId}`;
    }
    const checkboxId = stableId.current;
    const [validationError, setValidationError] = useState<
        string | undefined
    >();

    // Determine checked state and error
    let checked: boolean;
    let displayError: string | undefined;

    if (form && name) {
        // Using Form context
        checked = form.values[name] ?? externalChecked;
        displayError = form.shouldShowError(name)
            ? form.getFieldError(name)
            : undefined;
    } else {
        // Standalone usage
        checked = externalChecked;
        displayError = validationError;
    }

    // Built-in validation
    const runBuiltInValidation = (isChecked: boolean): string | undefined => {
        if (required && !isChecked) {
            return errorMessage || "This field is required";
        }
        return undefined;
    };

    // Register with Form
    useEffect(() => {
        if (form && name) {
            const validator: ValidationFunction = async (val: boolean) => {
                if (required && !val) {
                    return errorMessage || "This field is required";
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

    // Run validation (standalone mode only)
    const runValidation = async (isChecked: boolean) => {
        // Run built-in validation first
        const builtInError = runBuiltInValidation(isChecked);
        if (builtInError) {
            setValidationError(builtInError);
            onValidationError?.(builtInError);
            return;
        }

        // Run custom validation if provided
        if (validate) {
            const customError = await validate(isChecked);
            setValidationError(customError);
            onValidationError?.(customError);
            return;
        }

        // No errors
        setValidationError(undefined);
        onValidationError?.(undefined);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;

        if (form && name) {
            // Update Form context
            form.setFieldValue(name, isChecked);
            form.setFieldTouched(name, true);
            // Validate on change for checkbox (immediate feedback with new value)
            form.validateField(name, isChecked);
        } else {
            // Standalone mode
            runValidation(isChecked);
            onChange?.(isChecked);
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
            className={cn("flex flex-col", className)}
            style={{ marginBottom: "var(--form-control-spacing)" }}
        >
            <div className={cn("flex items-center", containerGapStyles[size])}>
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
                        suppressHydrationWarning
                        className={cn(
                            "rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all relative z-10",
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
                        suppressHydrationWarning
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
                        {required && <span className="ml-1">*</span>}
                    </label>
                )}
            </div>
            <div className="h-5 mt-1.5">
                {displayError && (
                    <p className="text-caption text-red-600" role="alert">
                        {displayError}
                    </p>
                )}
            </div>
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
    error?: string;
    helperText?: string;
    validate?: ValidationFunction;
}

export function CheckboxGroup({
    label,
    name,
    options,
    value: externalValue,
    onChange: externalOnChange,
    className,
    orientation = "vertical",
    required = false,
    disabled = false,
    size = "sm",
    error: externalError,
    helperText,
    validate,
}: CheckboxGroupProps) {
    const form = useForm();

    // Integrate with Form if available
    React.useEffect(() => {
        if (form && name) {
            const validator =
                validate ||
                (required
                    ? (value: string[]) => {
                          if (!value || value.length === 0) {
                              return `${label || name} is required`;
                          }
                          return undefined;
                      }
                    : undefined);

            form.registerField(name, validator);
            return () => form.unregisterField(name);
        }
    }, [form, name, validate, required, label]);

    const value = form
        ? (form.values[name] as string[]) || []
        : externalValue || [];
    const error = form ? form.errors[name] : externalError;

    const handleChange = (optionValue: string, checked: boolean) => {
        const newValue = checked
            ? [...value, optionValue]
            : value.filter((v) => v !== optionValue);

        if (form) {
            form.setFieldValue(name, newValue);
            form.validateField(name, newValue);
        }

        if (externalOnChange) {
            externalOnChange(newValue);
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
                                        "rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all relative z-10",
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
            <div className="h-5 mt-1.5">
                {(error || helperText) && (
                    <p
                        className={`text-caption ${error ? "text-red-600" : "text-(--color-muted-foreground)"}`}
                        role={error ? "alert" : undefined}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        </div>
    );
}
