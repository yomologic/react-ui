"use client";

import React, { useId, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { useForm, ValidationFunction } from "./form";
import { useFormControl } from "./form-control";

export interface TextareaProps extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "rows"
> {
    /** Field name - required when used inside Form */
    name?: string;
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    /** Custom validation function that returns error message or undefined if valid */
    validate?: ValidationFunction;
    /** Callback when validation error changes */
    onValidationError?: (error: string | undefined) => void;
    /** Custom error messages for built-in validations */
    errorMessages?: {
        required?: string;
        minLength?: string;
        maxLength?: string;
    };
    /** Number of visible text rows */
    rows?: number;
    /** Allow vertical resizing */
    resize?: "none" | "vertical" | "horizontal" | "both";
    /** Auto-resize to fit content */
    autoResize?: boolean;
    /** Show character count */
    showCharacterCount?: boolean;
    /** Maximum height when auto-resizing (in pixels) */
    maxHeight?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            name,
            label,
            error,
            helperText,
            fullWidth = false,
            id,
            onChange,
            onBlur,
            value: externalValue,
            validate,
            onValidationError,
            errorMessages,
            rows = 3,
            resize = "vertical",
            autoResize = false,
            showCharacterCount = false,
            maxHeight = 500,
            ...props
        },
        ref
    ) => {
        const autoId = useId();
        const form = useForm(); // New Form context
        const formControl = useFormControl(); // Old FormControl context (backwards compat)
        const internalRef = useRef<HTMLTextAreaElement>(null);
        const [validationError, setValidationError] = useState<
            string | undefined
        >();

        // Generate stable ID only once
        const stableId = useRef<string | undefined>(undefined);
        if (!stableId.current) {
            stableId.current =
                id || formControl?.fieldId || `textarea-${autoId}`;
        }

        // Priority: Form context > FormControl context > props
        const textareaId = stableId.current;
        const isDisabled = props.disabled || formControl?.isDisabled;
        const isRequired = props.required || formControl?.isRequired;

        // For error: check Form context first, then FormControl, then prop, then internal validation
        let textareaError: string | undefined;
        let textareaValue: React.TextareaHTMLAttributes<HTMLTextAreaElement>["value"];

        if (form && name) {
            // Using new Form context
            textareaError = form.shouldShowError(name)
                ? form.getFieldError(name)
                : undefined;
            // Use empty string as default to keep textarea controlled, but form will only have value when user types
            textareaValue =
                form.values[name] !== undefined
                    ? form.values[name]
                    : (externalValue ?? "");
        } else if (formControl) {
            // Using old FormControl context (backwards compat)
            textareaError = formControl.error || error || validationError;
            textareaValue = formControl.value ?? externalValue;
        } else {
            // Standalone usage
            textareaError = error || validationError;
            textareaValue = externalValue;
        }

        // Character count
        const currentLength =
            typeof textareaValue === "string" ? textareaValue.length : 0;
        const maxLengthValue = props.maxLength;

        // Built-in validation
        const runBuiltInValidation = (value: string): string | undefined => {
            // Required validation
            if (isRequired && !value) {
                return errorMessages?.required || "This field is required";
            }

            if (value) {
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

        // Auto-resize functionality
        const adjustHeight = () => {
            const textarea = internalRef.current;
            if (textarea && autoResize) {
                // Reset height to auto to get the correct scrollHeight
                textarea.style.height = "auto";
                // Set new height based on scrollHeight
                const newHeight = Math.min(textarea.scrollHeight, maxHeight);
                textarea.style.height = `${newHeight}px`;
            }
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
                const textareaElement = internalRef.current;
                if (textareaElement) {
                    formControl.registerControl(textareaElement as any);
                    return () =>
                        formControl.unregisterControl(textareaElement as any);
                }
            }
        }, [form, formControl, name]);

        // Adjust height on value change (for auto-resize)
        useEffect(() => {
            if (autoResize) {
                adjustHeight();
            }
        }, [textareaValue, autoResize]);

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

            // Auto-resize if enabled
            if (autoResize) {
                adjustHeight();
            }

            // Call external onChange
            onChange?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
            if (form && name) {
                // Mark as touched in Form
                form.setFieldTouched(name, true);
                // Validate on blur with current textarea value
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
        const shouldRenderError = textareaError && !formControl;

        // Resize classes
        const resizeClasses = {
            none: "resize-none",
            vertical: "resize-y",
            horizontal: "resize-x",
            both: "resize",
        };

        return (
            <div
                className={cn("flex flex-col", fullWidth && "w-full")}
                style={{ marginBottom: "var(--form-control-spacing)" }}
            >
                <div className="flex items-center justify-between mb-1">
                    {shouldRenderLabel && (
                        <label
                            htmlFor={textareaId}
                            className="block text-small font-semibold text-(--color-muted-foreground)"
                        >
                            {label}
                            {isRequired && <span className="ml-1">*</span>}
                        </label>
                    )}
                    {showCharacterCount && maxLengthValue && (
                        <span className="text-small text-(--color-muted-foreground)">
                            {currentLength}/{maxLengthValue}
                        </span>
                    )}
                </div>

                <div className="relative">
                    <textarea
                        ref={(node) => {
                            // Handle both refs
                            if (typeof ref === "function") {
                                ref(node);
                            } else if (ref) {
                                ref.current = node;
                            }
                            (internalRef as any).current = node;
                        }}
                        id={textareaId}
                        name={name}
                        value={textareaValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isDisabled}
                        required={isRequired}
                        rows={autoResize ? undefined : rows}
                        aria-invalid={!!textareaError}
                        aria-describedby={
                            textareaError
                                ? `${textareaId}-error`
                                : helperText
                                  ? `${textareaId}-helper`
                                  : undefined
                        }
                        className={cn(
                            "w-full px-3 py-2 border rounded-md transition-colors",
                            "text-(--color-muted-foreground) placeholder-gray-400",
                            "focus:outline-none",
                            "disabled:bg-(--color-muted) disabled:cursor-not-allowed disabled:text-(--color-muted-foreground)",
                            textareaError
                                ? "border-error focus:ring-2 focus:ring-error focus:border-error active:border-error"
                                : "border-(--color-border) focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary) active:border-(--color-primary)",
                            resizeClasses[resize],
                            autoResize && "overflow-hidden",
                            !autoResize && "overflow-auto",
                            className
                        )}
                        style={
                            autoResize
                                ? {
                                      minHeight: `${rows * 1.5}em`,
                                      maxHeight: `${maxHeight}px`,
                                  }
                                : undefined
                        }
                        {...props}
                    />
                </div>

                <div className="h-5 mt-1.5">
                    {shouldRenderError && textareaError && (
                        <p
                            className="text-small text-error"
                            id={`${textareaId}-error`}
                            role="alert"
                        >
                            {textareaError}
                        </p>
                    )}

                    {helperText && !textareaError && !formControl && (
                        <p
                            className="text-small text-(--color-muted-foreground)"
                            id={`${textareaId}-helper`}
                        >
                            {helperText}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
