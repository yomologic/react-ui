"use client";

import { ReactNode, SelectHTMLAttributes } from "react";
import { useForm, ValidationFunction } from "./form";

export interface NativeSelectProps extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "size" | "onChange"
> {
    /**
     * Field name - required when used inside Form
     */
    name?: string;
    /**
     * Label text displayed above the select
     */
    label?: string;
    /**
     * Current selected value
     */
    value?: string | number;
    /**
     * Callback when selection changes
     */
    onChange?: (value: string) => void;
    /**
     * Select options as children (<option> elements)
     */
    children?: ReactNode;
    /**
     * Error message to display
     */
    error?: string;
    /**
     * Helper text to display below the select
     */
    helperText?: string;
    /**
     * Mark the field as required
     */
    required?: boolean;
    /**
     * Size of the select
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Custom validation function
     */
    validate?: ValidationFunction;
    /**
     * Custom error message for required validation
     */
    errorMessage?: string;
}

export function NativeSelect({
    name,
    label,
    value: externalValue,
    onChange,
    children,
    error,
    helperText,
    required = false,
    size = "md",
    className = "",
    validate,
    errorMessage,
    disabled = false,
    ...htmlProps
}: NativeSelectProps) {
    const form = useForm();

    // Determine value and error from Form context or props
    let value: string | number | undefined;
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
        displayError = error;
    }

    // Register with Form
    if (form && name) {
        const validator: ValidationFunction = async (val: any) => {
            if (required && (val === undefined || val === null || val === "")) {
                return errorMessage || "Please select an option";
            }
            if (validate) {
                return await validate(val);
            }
            return undefined;
        };

        form.registerField(name, validator);
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;

        if (form && name) {
            form.setFieldValue(name, newValue);
            form.setFieldTouched(name, true);
            form.validateField(name, newValue);
        } else {
            onChange?.(newValue);
        }
    };

    const sizeStyles = {
        xs: "px-2 py-1.5 text-xs",
        sm: "px-2.5 py-2 text-sm",
        md: "px-3 py-2.5 text-base",
        lg: "px-4 py-3 text-lg",
        xl: "px-5 py-3.5 text-xl",
    };

    return (
        <div
            className={`w-full ${className}`}
            style={{ marginBottom: "var(--form-control-spacing)" }}
        >
            {/* Label */}
            {label && (
                <label
                    className="block text-small font-semibold mb-1"
                    style={{ color: "var(--color-muted-foreground)" }}
                >
                    {label}
                    {required && <span className="ml-1 text-error">*</span>}
                </label>
            )}

            {/* Native Select */}
            <select
                name={name}
                value={value ?? ""}
                onChange={handleChange}
                disabled={disabled}
                required={required}
                className={`
                    w-full ${sizeStyles[size]}
                    bg-(--color-background) 
                    border rounded-(--dropdown-radius)
                    transition-all duration-200
                    appearance-none
                    cursor-pointer
                    ${
                        displayError
                            ? "border-error focus:ring-2 focus:ring-error focus:border-error"
                            : "border-(--color-border) focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] focus:border-(--color-primary)"
                    }
                    ${
                        disabled
                            ? "bg-(--color-muted) cursor-not-allowed opacity-60"
                            : "hover:border-(--color-primary)"
                    }
                    ${!value ? "text-(--color-placeholder)" : "text-(--color-foreground)"}
                    pr-10
                    bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3c%2fpolyline%3E%3c%2fsvg%3E')]
                    bg-[length:1.25rem_1.25rem]
                    bg-[position:right_0.5rem_center]
                    bg-no-repeat
                `}
                {...htmlProps}
            >
                {children}
            </select>

            {/* Helper Text or Error */}
            <div className="h-5 mt-1.5">
                {(helperText || displayError) && (
                    <p
                        className={`text-small ${displayError ? "text-error" : "text-(--color-muted-foreground)"}`}
                    >
                        {displayError || helperText}
                    </p>
                )}
            </div>
        </div>
    );
}
