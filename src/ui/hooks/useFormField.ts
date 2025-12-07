import { useEffect, useId, useRef, useState } from "react";
import { useForm, ValidationFunction } from "../form";
import { useFormControl } from "../form-control";

/**
 * Configuration options for useFormField hook
 */
export interface UseFormFieldOptions {
    /** Field name - required when used inside Form */
    name?: string;
    /** Field type (for input-specific validations like email, url, number) */
    type?: string;
    /** External controlled value */
    value?: any;
    /** External error message */
    error?: string;
    /** Custom ID for the field */
    id?: string;
    /** Whether field is required */
    required?: boolean;
    /** Whether field is disabled */
    disabled?: boolean;
    /** Minimum length validation */
    minLength?: number;
    /** Maximum length validation */
    maxLength?: number;
    /** Minimum value (for numbers) */
    min?: number | string;
    /** Maximum value (for numbers) */
    max?: number | string;
    /** Pattern validation (RegExp or string) */
    pattern?: RegExp | string;
    /** Custom validation function */
    validate?: ValidationFunction;
    /** Callback when validation error changes */
    onValidationError?: (error: string | undefined) => void;
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
    /** Prefix for auto-generated IDs (e.g., 'input', 'textarea') */
    idPrefix?: string;
}

/**
 * Return type from useFormField hook
 */
export interface UseFormFieldResult {
    /** Stable field ID for htmlFor/aria attributes */
    fieldId: string;
    /** Current field value (respects priority: Form > FormControl > props) */
    value: any;
    /** Current error message (if any) */
    error: string | undefined;
    /** Whether the field is disabled */
    isDisabled: boolean;
    /** Whether the field is required */
    isRequired: boolean;
    /** Whether to show the label (not in FormControl) */
    shouldRenderLabel: boolean;
    /** Whether to show the error (not in FormControl) */
    shouldRenderError: boolean;
    /** onChange handler that integrates with all contexts */
    handleChange: (value: string) => void;
    /** onBlur handler that marks field as touched and validates */
    handleBlur: (value: string) => void;
    /** Internal ref for the field element */
    internalRef: React.RefObject<any>;
}

/**
 * Custom hook that encapsulates all form field logic:
 * - Context integration (Form and FormControl)
 * - Validation (built-in and custom)
 * - State management
 * - Event handling
 * - Registration lifecycle
 *
 * This eliminates code duplication across Input, Textarea, Select, etc.
 */
export function useFormField(options: UseFormFieldOptions): UseFormFieldResult {
    const {
        name,
        type = "text",
        value: externalValue,
        error: externalError,
        id,
        required = false,
        disabled = false,
        minLength,
        maxLength,
        min,
        max,
        pattern,
        validate,
        onValidationError,
        errorMessages,
        idPrefix = "field",
    } = options;

    const autoId = useId();
    const form = useForm();
    const formControl = useFormControl();
    const internalRef = useRef<any>(null);
    const [validationError, setValidationError] = useState<
        string | undefined
    >();

    // Generate stable ID only once
    const stableId = useRef<string | undefined>(undefined);
    if (!stableId.current) {
        stableId.current =
            id || formControl?.fieldId || `${idPrefix}-${autoId}`;
    }
    const fieldId = stableId.current;

    // Priority: Form context > FormControl context > props
    const isDisabled = disabled || formControl?.isDisabled || false;
    const isRequired = required || formControl?.isRequired || false;

    // Determine value and error based on context priority
    let fieldValue: any;
    let fieldError: string | undefined;

    if (form && name) {
        // Using Form context
        fieldError = form.shouldShowError(name)
            ? form.getFieldError(name)
            : undefined;
        fieldValue =
            form.values[name] !== undefined
                ? form.values[name]
                : (externalValue ?? "");
    } else if (formControl) {
        // Using FormControl context (backwards compat)
        fieldError = formControl.error || externalError || validationError;
        fieldValue = formControl.value ?? externalValue;
    } else {
        // Standalone usage
        fieldError = externalError || validationError;
        fieldValue = externalValue;
    }

    /**
     * Built-in validation logic supporting:
     * - required
     * - minLength/maxLength
     * - min/max (for numbers)
     * - pattern (regex)
     * - email format
     * - URL format
     */
    const runBuiltInValidation = (value: string): string | undefined => {
        // Required validation
        if (isRequired && !value) {
            return errorMessages?.required || "This field is required";
        }

        if (value) {
            // Email validation (for type="email")
            if (type === "email" && !value.includes("@")) {
                return (
                    errorMessages?.email || "Please enter a valid email address"
                );
            }

            // URL validation (for type="url")
            if (type === "url") {
                try {
                    new URL(value);
                } catch {
                    return errorMessages?.url || "Please enter a valid URL";
                }
            }

            // Number range validation (for type="number")
            if (type === "number") {
                const numValue = parseFloat(value);
                if (min !== undefined && numValue < Number(min)) {
                    return errorMessages?.min || `Minimum value is ${min}`;
                }
                if (max !== undefined && numValue > Number(max)) {
                    return errorMessages?.max || `Maximum value is ${max}`;
                }
            }

            // String length validations
            if (minLength !== undefined && value.length < minLength) {
                return (
                    errorMessages?.minLength ||
                    `Minimum length is ${minLength} characters`
                );
            }

            if (maxLength !== undefined && value.length > maxLength) {
                return (
                    errorMessages?.maxLength ||
                    `Maximum length is ${maxLength} characters`
                );
            }

            // Pattern validation
            if (pattern) {
                const regex =
                    typeof pattern === "string" ? new RegExp(pattern) : pattern;
                if (!regex.test(value)) {
                    return errorMessages?.pattern || "Invalid format";
                }
            }
        }

        return undefined;
    };

    /**
     * Run validation (built-in + custom)
     */
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

    /**
     * Register field with Form or FormControl on mount
     */
    useEffect(() => {
        if (form && name) {
            // Create validator function for Form registration
            const validator: ValidationFunction = async (value: string) => {
                // Built-in validation
                if (isRequired && !value) {
                    return errorMessages?.required || "This field is required";
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
                                errorMessages?.url || "Please enter a valid URL"
                            );
                        }
                    }

                    if (type === "number") {
                        const numValue = parseFloat(value);
                        if (min !== undefined && numValue < Number(min)) {
                            return (
                                errorMessages?.min || `Minimum value is ${min}`
                            );
                        }
                        if (max !== undefined && numValue > Number(max)) {
                            return (
                                errorMessages?.max || `Maximum value is ${max}`
                            );
                        }
                    }

                    if (minLength !== undefined && value.length < minLength) {
                        return (
                            errorMessages?.minLength ||
                            `Minimum length is ${minLength} characters`
                        );
                    }

                    if (maxLength !== undefined && value.length > maxLength) {
                        return (
                            errorMessages?.maxLength ||
                            `Maximum length is ${maxLength} characters`
                        );
                    }

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

                // Custom validation
                if (validate) {
                    return await validate(value);
                }

                return undefined;
            };

            // Register with Form
            form.registerField(name, validator);
            return () => form.unregisterField(name);
        } else if (formControl) {
            // Register with FormControl (backwards compat)
            const element = internalRef.current;
            if (element) {
                formControl.registerControl(element);
                return () => formControl.unregisterControl(element);
            }
        }
    }, [
        form,
        formControl,
        name,
        isRequired,
        type,
        min,
        max,
        minLength,
        maxLength,
        pattern,
        validate,
        errorMessages,
    ]);

    /**
     * Handle change event
     * Updates Form/FormControl/standalone state
     */
    const handleChange = (value: string) => {
        if (form && name) {
            // Update Form context
            form.setFieldValue(name, value);
        } else if (formControl) {
            // Update FormControl (backwards compat)
            formControl.setValue(value);
        } else {
            // Standalone - run validation
            runValidation(value);
        }
    };

    /**
     * Handle blur event
     * Marks field as touched and triggers validation
     */
    const handleBlur = (value: string) => {
        if (form && name) {
            // Mark as touched in Form
            form.setFieldTouched(name, true);
            // Validate on blur
            form.validateField(name, value);
        } else if (formControl) {
            // Mark as touched in FormControl (backwards compat)
            formControl.setTouched(true);
        } else {
            // Standalone - run validation if value exists
            if (value) {
                runValidation(value);
            }
        }
    };

    // Determine if we should render label/error
    // If used within FormControl, don't render (FormControl handles it)
    // If used within Form, render everything (Form doesn't wrap controls)
    const shouldRenderLabel = !formControl;
    const shouldRenderError = !!fieldError && !formControl;

    return {
        fieldId,
        value: fieldValue,
        error: fieldError,
        isDisabled,
        isRequired,
        shouldRenderLabel,
        shouldRenderError,
        handleChange,
        handleBlur,
        internalRef,
    };
}
