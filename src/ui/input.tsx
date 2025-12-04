"use client";

import React, { useId, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { useForm, ValidationFunction } from "./form";
import { useFormControl } from "./form-control";

export interface InputProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "pattern"
> {
    /** Field name - required when used inside Form */
    name?: string;
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    /** Custom validation function that returns error message or undefined if valid */
    validate?: ValidationFunction;
    /** Callback when validation error changes */
    onValidationError?: (error: string | undefined) => void;
    /** Regex pattern for validation (string or RegExp) */
    pattern?: RegExp | string;
    /** Custom error messages for built-in validations */
    errorMessages?: {
        required?: string;
        minLength?: string;
        maxLength?: string;
        min?: string;
        max?: string;
        pattern?: string;
        email?: string;
        url?: string;
    };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = "text",
            name,
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            fullWidth = false,
            id,
            onChange,
            onBlur,
            value: externalValue,
            validate,
            onValidationError,
            pattern,
            errorMessages,
            ...props
        },
        ref
    ) => {
        const autoId = useId();
        const form = useForm(); // New Form context
        const formControl = useFormControl(); // Old FormControl context (backwards compat)
        const internalRef = useRef<HTMLInputElement>(null);
        const [validationError, setValidationError] = useState<
            string | undefined
        >();

        // Generate stable ID only once
        const stableId = useRef<string>();
        if (!stableId.current) {
            stableId.current = id || formControl?.fieldId || `input-${autoId}`;
        }

        // Priority: Form context > FormControl context > props
        const inputId = stableId.current;
        const isDisabled = props.disabled || formControl?.isDisabled;
        const isRequired = props.required || formControl?.isRequired;

        // For error: check Form context first, then FormControl, then prop, then internal validation
        let inputError: string | undefined;
        let inputValue: React.InputHTMLAttributes<HTMLInputElement>["value"];

        if (form && name) {
            // Using new Form context
            inputError = form.shouldShowError(name)
                ? form.getFieldError(name)
                : undefined;
            // Use empty string as default to keep input controlled, but form will only have value when user types
            inputValue =
                form.values[name] !== undefined
                    ? form.values[name]
                    : (externalValue ?? "");
        } else if (formControl) {
            // Using old FormControl context (backwards compat)
            inputError = formControl.error || error || validationError;
            inputValue = formControl.value ?? externalValue;
        } else {
            // Standalone usage
            inputError = error || validationError;
            inputValue = externalValue;
        }

        // Built-in validation
        const runBuiltInValidation = (value: string): string | undefined => {
            // Required validation
            if (isRequired && !value) {
                return errorMessages?.required || "This field is required";
            }

            // Type-specific validation
            if (value) {
                // Email validation
                if (type === "email" && !value.includes("@")) {
                    return (
                        errorMessages?.email ||
                        "Please enter a valid email address"
                    );
                }

                // URL validation
                if (type === "url") {
                    try {
                        new URL(value);
                    } catch {
                        return errorMessages?.url || "Please enter a valid URL";
                    }
                }

                // Number validation
                if (type === "number") {
                    const numValue = parseFloat(value);
                    if (
                        props.min !== undefined &&
                        numValue < Number(props.min)
                    ) {
                        return (
                            errorMessages?.min ||
                            `Minimum value is ${props.min}`
                        );
                    }
                    if (
                        props.max !== undefined &&
                        numValue > Number(props.max)
                    ) {
                        return (
                            errorMessages?.max ||
                            `Maximum value is ${props.max}`
                        );
                    }
                }

                // MinLength validation
                if (
                    props.minLength !== undefined &&
                    value.length < props.minLength
                ) {
                    return (
                        errorMessages?.minLength ||
                        `Minimum length is ${props.minLength} characters`
                    );
                }

                // MaxLength validation
                if (
                    props.maxLength !== undefined &&
                    value.length > props.maxLength
                ) {
                    return (
                        errorMessages?.maxLength ||
                        `Maximum length is ${props.maxLength} characters`
                    );
                }

                // Pattern validation
                if (pattern) {
                    const regex =
                        typeof pattern === "string"
                            ? new RegExp(pattern)
                            : pattern;
                    if (!regex.test(value)) {
                        return errorMessages?.pattern || "Invalid format";
                    }
                }
            }

            return undefined;
        };

        // Run validation (built-in + custom)
        const runValidation = async (value: string) => {
            // Run built-in validation first
            const builtInError = runBuiltInValidation(value);
            if (builtInError) {
                setValidationError(builtInError);
                onValidationError?.(builtInError);
                return;
            }

            // Run custom validation if provided
            if (validate) {
                const customError = await validate(value);
                setValidationError(customError);
                onValidationError?.(customError);
                return;
            }

            // No errors
            setValidationError(undefined);
            onValidationError?.(undefined);
        };

        // Register with Form or FormControl on mount
        useEffect(() => {
            if (form && name) {
                // Register with new Form
                const validator: ValidationFunction = async (value: string) => {
                    // Built-in validation
                    if (isRequired && !value) {
                        return (
                            errorMessages?.required || "This field is required"
                        );
                    }

                    if (value) {
                        // Type-specific validation
                        if (type === "email" && !value.includes("@")) {
                            return (
                                errorMessages?.email ||
                                "Please enter a valid email address"
                            );
                        }

                        if (type === "url") {
                            try {
                                new URL(value);
                            } catch {
                                return (
                                    errorMessages?.url ||
                                    "Please enter a valid URL"
                                );
                            }
                        }

                        if (type === "number") {
                            const numValue = parseFloat(value);
                            if (
                                props.min !== undefined &&
                                numValue < Number(props.min)
                            ) {
                                return (
                                    errorMessages?.min ||
                                    `Minimum value is ${props.min}`
                                );
                            }
                            if (
                                props.max !== undefined &&
                                numValue > Number(props.max)
                            ) {
                                return (
                                    errorMessages?.max ||
                                    `Maximum value is ${props.max}`
                                );
                            }
                        }

                        if (
                            props.minLength !== undefined &&
                            value.length < props.minLength
                        ) {
                            return (
                                errorMessages?.minLength ||
                                `Minimum length is ${props.minLength} characters`
                            );
                        }

                        if (
                            props.maxLength !== undefined &&
                            value.length > props.maxLength
                        ) {
                            return (
                                errorMessages?.maxLength ||
                                `Maximum length is ${props.maxLength} characters`
                            );
                        }

                        if (pattern) {
                            const regex =
                                typeof pattern === "string"
                                    ? new RegExp(pattern)
                                    : pattern;
                            if (!regex.test(value)) {
                                return (
                                    errorMessages?.pattern || "Invalid format"
                                );
                            }
                        }
                    }

                    // Custom validation
                    if (validate) {
                        return await validate(value);
                    }

                    return undefined;
                };

                form.registerField(name, validator);
                return () => form.unregisterField(name);
            } else if (formControl) {
                // Register with old FormControl (backwards compat)
                const inputElement = internalRef.current;
                if (inputElement) {
                    formControl.registerControl(inputElement);
                    return () => formControl.unregisterControl(inputElement);
                }
            }
        }, [form, formControl, name]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;

            if (form && name) {
                // Update Form context
                form.setFieldValue(name, newValue);
            } else if (formControl) {
                // Update FormControl (backwards compat)
                formControl.setValue(newValue);
            } else {
                // Standalone - run validation
                runValidation(newValue);
            }

            // Call external onChange
            onChange?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            if (form && name) {
                // Mark as touched in Form
                form.setFieldTouched(name, true);
                // Validate on blur with current input value
                form.validateField(name, e.target.value);
            } else if (formControl) {
                // Mark as touched in FormControl (backwards compat)
                formControl.setTouched(true);
            } else {
                // Standalone - run validation
                if (e.target.value) {
                    runValidation(e.target.value);
                }
            }

            // Call external onBlur
            onBlur?.(e);
        };

        // If used within FormControl, don't render label/error (FormControl handles it)
        // If used within Form, render everything (Form doesn't wrap controls)
        const shouldRenderLabel = label && !formControl;
        const shouldRenderError = inputError && !formControl;

        return (
            <div
                className={cn("flex flex-col", fullWidth && "w-full")}
                style={{ marginBottom: "var(--form-control-spacing)" }}
                suppressHydrationWarning
            >
                {shouldRenderLabel && (
                    <label
                        htmlFor={inputId}
                        className="block text-small font-semibold text-(--color-muted-foreground) mb-1"
                        suppressHydrationWarning
                    >
                        {label}
                        {isRequired && <span className="ml-1">*</span>}
                    </label>
                )}

                <div
                    className="relative *:data-lastpass-icon-root:hidden"
                    suppressHydrationWarning
                >
                    {leftIcon && (
                        <div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-(--color-placeholder)"
                            suppressHydrationWarning
                        >
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={(node) => {
                            // Handle both refs
                            if (typeof ref === "function") {
                                ref(node);
                            } else if (ref) {
                                ref.current = node;
                            }
                            (internalRef as any).current = node;
                        }}
                        type={type}
                        id={inputId}
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isDisabled}
                        required={isRequired}
                        pattern={
                            pattern instanceof RegExp ? pattern.source : pattern
                        }
                        aria-invalid={!!inputError}
                        aria-describedby={
                            inputError
                                ? `${inputId}-error`
                                : helperText
                                  ? `${inputId}-helper`
                                  : undefined
                        }
                        suppressHydrationWarning
                        className={cn(
                            "w-full px-3 py-2 border rounded-md transition-colors",
                            "text-(--color-muted-foreground) placeholder-gray-400",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            "disabled:bg-(--color-muted) disabled:cursor-not-allowed disabled:text-(--color-muted-foreground)",
                            inputError
                                ? "border-red-500 focus:ring-red-500"
                                : "border-(--color-border)",
                            leftIcon && "pl-10",
                            rightIcon && "pr-10",
                            className
                        )}
                        {...props}
                    />

                    {rightIcon && (
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-(--color-placeholder)"
                            suppressHydrationWarning
                        >
                            {rightIcon}
                        </div>
                    )}
                </div>

                <div className="h-5 mt-1.5" suppressHydrationWarning>
                    {shouldRenderError && inputError && (
                        <p
                            className="text-caption text-red-600"
                            id={`${inputId}-error`}
                            role="alert"
                            suppressHydrationWarning
                        >
                            {inputError}
                        </p>
                    )}

                    {helperText && !inputError && !formControl && (
                        <p
                            className="text-caption text-(--color-muted-foreground)"
                            id={`${inputId}-helper`}
                            suppressHydrationWarning
                        >
                            {helperText}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
