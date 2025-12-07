"use client";

import React from "react";
import { cn } from "../lib/utils";
import { ValidationFunction } from "./form";
import { useFormField } from "./hooks/useFormField";

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
        // Use the custom hook to handle all form field logic
        const {
            fieldId,
            value: inputValue,
            error: inputError,
            isDisabled,
            isRequired,
            shouldRenderLabel,
            shouldRenderError,
            handleChange: hookHandleChange,
            handleBlur: hookHandleBlur,
            internalRef,
        } = useFormField({
            name,
            type,
            value: externalValue,
            error,
            id,
            required: props.required,
            disabled: props.disabled,
            minLength: props.minLength,
            maxLength: props.maxLength,
            min: props.min,
            max: props.max,
            pattern,
            validate,
            onValidationError,
            errorMessages,
            idPrefix: "input",
        });

        // Wrap hook handlers to call external handlers
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            hookHandleChange(e.target.value);
            onChange?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            hookHandleBlur(e.target.value);
            onBlur?.(e);
        };

        return (
            <div
                className={cn("flex flex-col", fullWidth && "w-full")}
                style={{ marginBottom: "var(--form-control-spacing)" }}
            >
                {shouldRenderLabel && label && (
                    <label
                        htmlFor={fieldId}
                        className="block text-small font-semibold text-(--color-muted-foreground) mb-1"
                    >
                        {label}
                        {isRequired && <span className="ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-(--color-placeholder)">
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
                        id={fieldId}
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
                                ? `${fieldId}-error`
                                : helperText
                                  ? `${fieldId}-helper`
                                  : undefined
                        }
                        className={cn(
                            "w-full px-3 py-2 border rounded-md transition-colors",
                            "text-(--color-muted-foreground) placeholder-gray-400",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            "disabled:bg-(--color-muted) disabled:cursor-not-allowed disabled:text-(--color-muted-foreground)",
                            inputError
                                ? "border-error focus:ring-error"
                                : "border-(--color-border)",
                            leftIcon && "pl-10",
                            rightIcon && "pr-10",
                            className
                        )}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-(--color-placeholder)">
                            {rightIcon}
                        </div>
                    )}
                </div>

                <div className="h-5 mt-1.5">
                    {shouldRenderError && inputError && (
                        <p
                            className="text-small text-error"
                            id={`${fieldId}-error`}
                            role="alert"
                        >
                            {inputError}
                        </p>
                    )}

                    {helperText && !inputError && shouldRenderLabel && (
                        <p
                            className="text-small text-(--color-muted-foreground)"
                            id={`${fieldId}-helper`}
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
