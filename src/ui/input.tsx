"use client";

import React from "react";
import { applyFormat, FormatType } from "../lib/formatting";
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
    /** Format type for auto-formatting input value (phone, credit-card, date, etc.) */
    format?: FormatType | ((value: string) => string);
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
        date?: string;
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
            format,
            errorMessages,
            ...props
        },
        ref
    ) => {
        // Internal state for standalone usage
        const [internalValue, setInternalValue] = React.useState<string>("");

        // Create date validation wrapper if format is 'date'
        const dateValidate = React.useCallback(
            async (value: string): Promise<string | undefined> => {
                // Run custom validation first if provided
                if (validate) {
                    const customError = await validate(value);
                    if (customError) return customError;
                }

                // If format is date and value is complete, validate it
                if (format === "date" && value && value.length === 8) {
                    const { isValidDate } =
                        await import("../constants/validation");
                    // Format the raw digits to MM/DD/YYYY for validation
                    const formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
                    if (!isValidDate(formatted)) {
                        return (
                            errorMessages?.date || "Please enter a valid date"
                        );
                    }
                }

                return undefined;
            },
            [validate, format, errorMessages]
        );

        // Use the custom hook to handle all form field logic
        const {
            fieldId,
            value: hookValue,
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
            validate: format === "date" ? dateValidate : validate,
            onValidationError,
            errorMessages,
            idPrefix: "input",
        });

        // Use hookValue if available (Form context), otherwise use internal state
        const inputValue = hookValue !== undefined ? hookValue : internalValue;

        // Track cursor position for formatting
        const [cursorPosition, setCursorPosition] = React.useState<
            number | null
        >(null);

        // Wrap hook handlers to call external handlers
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target;
            const newValue = input.value;
            const cursorPos = input.selectionStart || 0;

            if (format && typeof format === "string") {
                // Get only digits/valid characters from the new value
                const cleaned = newValue.replace(/\D/g, "");

                // Format the cleaned value
                const formatted = applyFormat(cleaned, format);

                // Store cleaned value (in Form if available, otherwise internal state)
                if (hookValue !== undefined) {
                    hookHandleChange(cleaned);
                } else {
                    setInternalValue(cleaned);
                }

                // Calculate new cursor position
                // Count how many formatting chars are before cursor in formatted string
                let formattedPos = 0;
                let digitCount = 0;
                const targetDigits = cleaned.slice(
                    0,
                    Math.min(cleaned.length, cursorPos)
                );

                for (
                    let i = 0;
                    i < formatted.length && digitCount < targetDigits.length;
                    i++
                ) {
                    if (/\d/.test(formatted[i])) {
                        digitCount++;
                    }
                    formattedPos = i + 1;
                }

                setCursorPosition(formattedPos);
            } else {
                if (hookValue !== undefined) {
                    hookHandleChange(newValue);
                } else {
                    setInternalValue(newValue);
                }
            }

            onChange?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value;
            // If formatting is enabled, blur should get the cleaned value
            const blurValue =
                format && typeof format === "string"
                    ? value.replace(/\D/g, "")
                    : value;
            hookHandleBlur(blurValue);
            onBlur?.(e);
        };

        // Format the display value if format prop is provided
        const displayValue = React.useMemo(() => {
            if (format && inputValue) {
                if (typeof format === "function") {
                    return format(inputValue);
                }
                // Input value should already be cleaned digits if format is set
                return applyFormat(inputValue, format);
            }
            return inputValue;
        }, [format, inputValue]);

        // Restore cursor position after formatting
        React.useEffect(() => {
            if (cursorPosition !== null && internalRef.current) {
                internalRef.current.setSelectionRange(
                    cursorPosition,
                    cursorPosition
                );
                setCursorPosition(null);
            }
        }, [cursorPosition, displayValue]);

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
                        value={displayValue}
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
                            "text-(--color-foreground) placeholder-gray-400",
                            "focus:outline-none",
                            "disabled:bg-(--color-muted) disabled:cursor-not-allowed disabled:text-(--color-muted-foreground)",
                            inputError
                                ? "border-(--color-error) focus:ring-2 focus:ring-(--color-error) focus:border-(--color-error) active:border-(--color-error)"
                                : "border-(--color-border) focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary) active:border-(--color-primary)",
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
                            className="text-small text-(--color-error)"
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
