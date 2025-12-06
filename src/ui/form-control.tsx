"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useId,
    useRef,
    ReactNode,
    cloneElement,
    isValidElement,
    Children,
} from "react";
import { cn } from "../lib/utils";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface FormControlState {
    /** Whether the field has been modified from its initial value */
    isDirty: boolean;
    /** Whether the field has been interacted with (focused) */
    isTouched: boolean;
    /** Whether the field value passes validation */
    isValid: boolean;
    /** Whether the field is required */
    isRequired: boolean;
    /** Whether the field is disabled */
    isDisabled: boolean;
    /** Whether the field is currently being validated */
    isValidating: boolean;
    /** Error message if validation fails */
    error?: string;
    /** Current field value */
    value: any;
}

export interface FormControlContextValue extends FormControlState {
    /** Unique ID for the field */
    fieldId: string;
    /** Name attribute for the field */
    name?: string;
    /** Register a control (input, select, etc.) with the form control */
    registerControl: (control: HTMLElement) => void;
    /** Unregister a control */
    unregisterControl: (control: HTMLElement) => void;
    /** Update the field value */
    setValue: (value: any) => void;
    /** Mark the field as touched */
    setTouched: (touched: boolean) => void;
    /** Set validation error */
    setError: (error?: string) => void;
    /** Trigger validation */
    validate: () => Promise<boolean>;
}

/** Props to inject into child component when using asChild or render props */
export interface FormFieldProps {
    id: string;
    name?: string;
    value: any;
    onChange: (e: any) => void;
    onBlur: () => void;
    disabled?: boolean;
    required?: boolean;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
}

export interface ValidationRule {
    /** Validation function that returns true if valid, false or error message if invalid */
    validate: (
        value: any,
        formData?: any
    ) => boolean | string | Promise<boolean | string>;
    /** Error message to display when validation fails */
    message?: string;
}

export interface FormControlProps {
    /** The name attribute for the form field */
    name?: string;
    /** The default value for the field */
    defaultValue?: any;
    /** Controlled value */
    value?: any;
    /** Callback when value changes */
    onChange?: (value: any) => void;
    /** Callback when field is blurred */
    onBlur?: () => void;
    /** Whether the field is required (shows asterisk in label) */
    required?: boolean;
    /** Whether the field is disabled */
    disabled?: boolean;
    /** Error message to display */
    error?: string;
    /** Helper text to display below the field */
    helperText?: string;
    /** Validation rules */
    validate?:
        | ValidationRule
        | ValidationRule[]
        | ((value: any) => boolean | string | Promise<boolean | string>);
    /** Whether to validate on change */
    validateOnChange?: boolean;
    /** Whether to validate on blur */
    validateOnBlur?: boolean;
    /** Label for the field */
    label?: string;
    /** Additional CSS classes */
    className?: string;
    /**
     * Child components - can be:
     * 1. Component that uses useFormControl() hook
     * 2. Render function: (fieldProps) => ReactNode
     * 3. Single child element when using asChild
     */
    children:
        | ReactNode
        | ((props: FormFieldProps & FormControlState) => ReactNode);
    /**
     * When true, merges props into the child element instead of wrapping
     * Similar to Radix UI's asChild pattern
     */
    asChild?: boolean;
}

// ============================================================================
// CONTEXT
// ============================================================================

const FormControlContext = createContext<FormControlContextValue | null>(null);

export function useFormControlContext() {
    const context = useContext(FormControlContext);
    if (!context) {
        throw new Error(
            "useFormControlContext must be used within a FormControl"
        );
    }
    return context;
}

// Optional hook that returns null if not within FormControl (for flexible usage)
export function useFormControl() {
    return useContext(FormControlContext);
}

/**
 * Hook for creating custom form fields with full FormControl integration
 * Returns field props and state for easy integration
 *
 * @example
 * function CustomInput() {
 *   const { fieldProps, state } = useFormField();
 *   return (
 *     <input
 *       {...fieldProps}
 *       className={state.error ? 'border-red-500' : 'border-(--color-border)'}
 *     />
 *   );
 * }
 */
export function useFormField() {
    const formControl = useFormControl();

    if (!formControl) {
        throw new Error("useFormField must be used within a FormControl");
    }

    const fieldProps: FormFieldProps = {
        id: formControl.fieldId,
        name: formControl.name,
        value: formControl.value,
        onChange: (e: any) => {
            const newValue = e?.target?.value ?? e;
            formControl.setValue(newValue);
        },
        onBlur: () => {
            formControl.setTouched(true);
        },
        disabled: formControl.isDisabled,
        required: formControl.isRequired,
        "aria-invalid": !!formControl.error,
        "aria-describedby": formControl.error
            ? `${formControl.fieldId}-message`
            : undefined,
    };

    const state: FormControlState = {
        isDirty: formControl.isDirty,
        isTouched: formControl.isTouched,
        isValid: formControl.isValid,
        isRequired: formControl.isRequired,
        isDisabled: formControl.isDisabled,
        isValidating: formControl.isValidating,
        error: formControl.error,
        value: formControl.value,
    };

    return {
        fieldProps,
        state,
        /**
         * Helper to spread all field props at once
         * @example <input {...register()} />
         */
        register: () => fieldProps,
        /**
         * Direct access to form control methods
         */
        setValue: formControl.setValue,
        setTouched: formControl.setTouched,
        setError: formControl.setError,
        validate: formControl.validate,
    };
}

// ============================================================================
// FORM CONTROL COMPONENT
// ============================================================================

export function FormControl({
    name,
    defaultValue,
    value: controlledValue,
    onChange,
    onBlur,
    required = false,
    disabled = false,
    error: externalError,
    helperText,
    validate: validationRules,
    validateOnChange = true,
    validateOnBlur = true,
    label,
    className,
    children,
    asChild = false,
}: FormControlProps) {
    const autoId = useId();
    // Use name as stable ID if provided, otherwise fallback to useId
    const stableFieldId = useRef<string | undefined>(undefined);
    if (!stableFieldId.current) {
        stableFieldId.current = name ? `field-${name}` : `field-${autoId}`;
    }
    const fieldId = stableFieldId.current;

    // State management
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const [initialValue] = useState(defaultValue ?? "");
    const [isTouched, setIsTouched] = useState(false);
    const [internalError, setInternalError] = useState<string | undefined>();
    const [isValidating, setIsValidating] = useState(false);
    const [registeredControls] = useState<Set<HTMLElement>>(new Set());

    const currentValue = isControlled ? controlledValue : internalValue;
    const currentError = externalError || internalError;
    const isDirty = currentValue !== initialValue;
    const isValid = !currentError;

    // ========================================================================
    // VALIDATION
    // ========================================================================

    const runValidation = useCallback(
        async (valueToValidate: any): Promise<string | undefined> => {
            if (!validationRules) return undefined;

            // Required validation
            if (required) {
                if (
                    valueToValidate === undefined ||
                    valueToValidate === null ||
                    valueToValidate === ""
                ) {
                    return "This field is required";
                }
                // For arrays (checkboxes), ensure at least one selected
                if (
                    Array.isArray(valueToValidate) &&
                    valueToValidate.length === 0
                ) {
                    return "This field is required";
                }
            }

            // Custom validation
            if (typeof validationRules === "function") {
                const result = await validationRules(valueToValidate);
                if (result === false) return "Validation failed";
                if (typeof result === "string") return result;
                return undefined;
            }

            // Validation rules array
            const rules = Array.isArray(validationRules)
                ? validationRules
                : [validationRules];
            for (const rule of rules) {
                const result = await rule.validate(valueToValidate);
                if (result === false) {
                    return rule.message || "Validation failed";
                }
                if (typeof result === "string") {
                    return result;
                }
            }

            return undefined;
        },
        [validationRules, required]
    );

    const validate = useCallback(async (): Promise<boolean> => {
        setIsValidating(true);
        const error = await runValidation(currentValue);
        setInternalError(error);
        setIsValidating(false);
        return !error;
    }, [currentValue, runValidation]);

    // ========================================================================
    // VALUE MANAGEMENT
    // ========================================================================

    const setValue = useCallback(
        (newValue: any) => {
            if (!isControlled) {
                setInternalValue(newValue);
            }
            onChange?.(newValue);

            // Validate on change if enabled
            if (validateOnChange && isTouched) {
                runValidation(newValue).then(setInternalError);
            }
        },
        [isControlled, onChange, validateOnChange, isTouched, runValidation]
    );

    const setTouchedState = useCallback(
        (touched: boolean) => {
            setIsTouched(touched);
            if (touched) {
                onBlur?.();
                // Validate on blur if enabled
                if (validateOnBlur) {
                    runValidation(currentValue).then(setInternalError);
                }
            }
        },
        [onBlur, validateOnBlur, currentValue, runValidation]
    );

    const setErrorState = useCallback((error?: string) => {
        setInternalError(error);
    }, []);

    // ========================================================================
    // CONTROL REGISTRATION
    // ========================================================================

    const registerControl = useCallback(
        (control: HTMLElement) => {
            registeredControls.add(control);
        },
        [registeredControls]
    );

    const unregisterControl = useCallback(
        (control: HTMLElement) => {
            registeredControls.delete(control);
        },
        [registeredControls]
    );

    // ========================================================================
    // CONTEXT VALUE
    // ========================================================================

    const contextValue: FormControlContextValue = {
        fieldId,
        name,
        value: currentValue,
        isDirty,
        isTouched,
        isValid,
        isRequired: required,
        isDisabled: disabled,
        isValidating,
        error: currentError,
        setValue,
        setTouched: setTouchedState,
        setError: setErrorState,
        validate,
        registerControl,
        unregisterControl,
    };

    // ========================================================================
    // RENDER HELPERS
    // ========================================================================

    // Props to inject into child when using asChild or render props
    const fieldProps: FormFieldProps = {
        id: fieldId,
        name,
        value: currentValue,
        onChange: (e: any) => {
            const newValue = e?.target?.value ?? e;
            setValue(newValue);
        },
        onBlur: () => {
            setTouchedState(true);
        },
        disabled: disabled,
        required: required,
        "aria-invalid": !!currentError,
        "aria-describedby": currentError
            ? `${fieldId}-message`
            : helperText
              ? `${fieldId}-helper`
              : undefined,
    };

    const stateProps: FormControlState = {
        isDirty,
        isTouched,
        isValid,
        isRequired: required,
        isDisabled: disabled,
        isValidating,
        error: currentError,
        value: currentValue,
    };

    // Render children based on type
    const renderChildren = () => {
        // Render function pattern
        if (typeof children === "function") {
            return children({ ...fieldProps, ...stateProps });
        }

        // asChild pattern - clone and merge props into single child
        if (asChild) {
            const child = Children.only(children);
            if (isValidElement(child)) {
                const childProps = child.props as any;
                return cloneElement(child, {
                    ...fieldProps,
                    ...childProps,
                    // Merge onChange handlers
                    onChange: (e: any) => {
                        fieldProps.onChange(e);
                        childProps.onChange?.(e);
                    },
                    onBlur: () => {
                        fieldProps.onBlur();
                        childProps.onBlur?.();
                    },
                } as any);
            }
        }

        // Default: render children with context
        return children;
    };

    // ========================================================================
    // RENDER
    // ========================================================================

    return (
        <FormControlContext.Provider value={contextValue}>
            <div
                className={cn("flex flex-col w-full", className)}
                data-disabled={disabled || undefined}
                data-error={!!currentError || undefined}
                data-dirty={isDirty || undefined}
                data-touched={isTouched || undefined}
                data-valid={isValid || undefined}
            >
                {/* Label */}
                {label && (
                    <label
                        htmlFor={fieldId}
                        className="block text-small font-semibold mb-1"
                        style={{ color: "var(--color-muted-foreground)" }}
                    >
                        {label}
                        {required && <span className="ml-1">*</span>}
                    </label>
                )}

                {/* Children (form controls) */}
                {renderChildren()}

                {/* Helper text or error message */}
                <div className="h-5 mt-1.5">
                    {(helperText || currentError) && (
                        <p
                            className={cn(
                                "text-xs",
                                currentError
                                    ? "text-red-600"
                                    : "text-(--color-muted-foreground)"
                            )}
                            id={`${fieldId}-message`}
                            role={currentError ? "alert" : undefined}
                            aria-live={currentError ? "polite" : undefined}
                        >
                            {currentError || helperText}
                        </p>
                    )}
                </div>
            </div>
        </FormControlContext.Provider>
    );
}

// ============================================================================
// FORM CONTROL LABEL (for wrapping radio/checkbox)
// ============================================================================

export interface FormControlLabelProps {
    /** The control element (checkbox, radio, switch) */
    control: ReactNode;
    /** Label text */
    label: ReactNode;
    /** Whether the control is disabled */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Label placement */
    labelPlacement?: "start" | "end" | "top" | "bottom";
}

export function FormControlLabel({
    control,
    label,
    disabled = false,
    className,
    labelPlacement = "end",
}: FormControlLabelProps) {
    const formControl = useFormControl();

    const placementStyles = {
        start: "flex-row-reverse justify-end",
        end: "flex-row",
        top: "flex-col-reverse items-start",
        bottom: "flex-col items-start",
    };

    const gapStyles = {
        start: "gap-2",
        end: "gap-2",
        top: "gap-1",
        bottom: "gap-1",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center",
                placementStyles[labelPlacement],
                gapStyles[labelPlacement],
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
            data-disabled={disabled || formControl?.isDisabled || undefined}
        >
            {control}
            {label && (
                <span
                    className={cn(
                        "text-small font-medium select-none",
                        disabled || formControl?.isDisabled
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    )}
                    style={{ color: "var(--checkbox-label-color)" }}
                >
                    {label}
                </span>
            )}
        </div>
    );
}

// ============================================================================
// FORM HELPER TEXT
// ============================================================================

export interface FormHelperTextProps {
    children: ReactNode;
    error?: boolean;
    className?: string;
}

export function FormHelperText({
    children,
    error = false,
    className,
}: FormHelperTextProps) {
    const formControl = useFormControl();
    const isError = error || (formControl?.error && !formControl.isValid);

    return (
        <div className="h-5 mt-1.5">
            <p
                className={cn(
                    "text-xs",
                    isError
                        ? "text-red-600"
                        : "text-(--color-muted-foreground)",
                    className
                )}
                role={isError ? "alert" : undefined}
                aria-live={isError ? "polite" : undefined}
            >
                {children}
            </p>
        </div>
    );
}
