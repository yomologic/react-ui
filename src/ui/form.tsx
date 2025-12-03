"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    FormEvent,
    ReactNode,
} from "react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface FormState {
    values: Record<string, any>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    isSubmitting: boolean;
    isSubmitted: boolean;
}

export interface FormContextValue extends FormState {
    registerField: (name: string, validate?: ValidationFunction) => void;
    unregisterField: (name: string) => void;
    setFieldValue: (name: string, value: any) => void;
    setFieldTouched: (name: string, touched: boolean) => void;
    validateField: (name: string, value?: any) => Promise<void>;
    getFieldError: (name: string) => string | undefined;
    shouldShowError: (name: string) => boolean;
}

export type ValidationFunction = (
    value: any
) => string | undefined | Promise<string | undefined>;

interface FormProps {
    children: ReactNode;
    onSubmit: (values: Record<string, any>) => void | Promise<void>;
    className?: string;
    spacing?: "none" | "dense" | "normal";
}

// ============================================================================
// CONTEXT
// ============================================================================

const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("Form components must be used within a Form component");
    }
    return context;
}

// Hook for form controls to use (optional - only if within Form)
export function useForm() {
    return useContext(FormContext);
}

// ============================================================================
// FORM COMPONENT
// ============================================================================

export function Form({
    children,
    onSubmit,
    className,
    spacing = "normal",
}: FormProps) {
    const spacingValues = {
        none: "0",
        dense: "0.5rem",
        normal: "1rem",
    };
    const [state, setState] = useState<FormState>({
        values: {},
        errors: {},
        touched: {},
        isSubmitting: false,
        isSubmitted: false,
    });

    // Store validation functions for each field
    const [validators] = useState<Map<string, ValidationFunction>>(new Map());

    const registerField = useCallback(
        (name: string, validate?: ValidationFunction) => {
            if (validate) {
                validators.set(name, validate);
            }
            // Don't initialize values here - let them be undefined until user interacts
            // This way we don't submit empty strings for untouched fields
        },
        [validators]
    );

    const unregisterField = useCallback(
        (name: string) => {
            validators.delete(name);
            // Don't update state here - it causes infinite loops
            // The field values will be cleaned up naturally on form reset/submit
        },
        [validators]
    );

    const setFieldValue = useCallback((name: string, value: any) => {
        setState((prev) => {
            // Clear error for this field when value changes
            const newErrors = { ...prev.errors };
            delete newErrors[name];

            return {
                ...prev,
                values: { ...prev.values, [name]: value },
                errors: newErrors,
            };
        });
    }, []);

    const setFieldTouched = useCallback((name: string, touched: boolean) => {
        setState((prev) => ({
            ...prev,
            touched: { ...prev.touched, [name]: touched },
        }));
    }, []);

    const getFieldError = useCallback(
        (name: string) => {
            return state.errors[name];
        },
        [state.errors]
    );

    const shouldShowError = useCallback(
        (name: string) => {
            // Show error if form is submitted OR if field is touched
            return (
                (state.isSubmitted || state.touched[name]) &&
                !!state.errors[name]
            );
        },
        [state.isSubmitted, state.touched, state.errors]
    );

    const validateFieldInternal = async (
        name: string,
        value: any
    ): Promise<string | undefined> => {
        const validator = validators.get(name);
        if (!validator) return undefined;

        try {
            const error = await validator(value);
            return error;
        } catch {
            return "Validation error";
        }
    };

    const validateField = useCallback(
        async (name: string, providedValue?: any) => {
            // Use provided value if explicitly passed (including undefined), otherwise get from state
            const value =
                arguments.length > 1 ? providedValue : state.values[name];
            const error = await validateFieldInternal(name, value);

            setState((prev) => {
                const newErrors = { ...prev.errors };
                if (error) {
                    newErrors[name] = error;
                } else {
                    delete newErrors[name];
                }
                return { ...prev, errors: newErrors };
            });
        },
        [state.values, validators]
    );

    const validateAllFields = async (): Promise<boolean> => {
        const errors: Record<string, string> = {};
        const validationPromises: Promise<void>[] = [];

        validators.forEach((_validator, name) => {
            const value = state.values[name];
            validationPromises.push(
                validateFieldInternal(name, value).then((error) => {
                    if (error) {
                        errors[name] = error;
                    }
                })
            );
        });

        await Promise.all(validationPromises);

        setState((prev) => ({
            ...prev,
            errors,
        }));

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setState((prev) => ({
            ...prev,
            isSubmitting: true,
            isSubmitted: true,
        }));

        const isValid = await validateAllFields();

        if (isValid) {
            try {
                await onSubmit(state.values);
            } catch (error) {
                console.error("Form submission error:", error);
            }
        }

        setState((prev) => ({
            ...prev,
            isSubmitting: false,
        }));
    };

    const contextValue: FormContextValue = {
        ...state,
        registerField,
        unregisterField,
        setFieldValue,
        setFieldTouched,
        validateField,
        getFieldError,
        shouldShowError,
    };

    return (
        <FormContext.Provider value={contextValue}>
            <form
                onSubmit={handleSubmit}
                className={className}
                noValidate
                style={{
                    ["--form-control-spacing" as any]: spacingValues[spacing],
                }}
            >
                {children}
            </form>
        </FormContext.Provider>
    );
}
