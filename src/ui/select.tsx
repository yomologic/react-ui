"use client";

import { ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";
import { useForm, ValidationFunction } from "./form";

export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface SelectProps {
    /**
     * Field name - required when used inside Form
     */
    name?: string;
    /**
     * Label text displayed above the select
     */
    label?: string;
    /**
     * Placeholder text when no option is selected
     */
    placeholder?: string;
    /**
     * Array of options for the select
     */
    options?: SelectOption[];
    /**
     * Current selected value
     */
    value?: string | number;
    /**
     * Callback when selection changes
     */
    onChange?: (value: string | number) => void;
    /**
     * Custom content to render in the select menu (overrides options)
     */
    children?: ReactNode;
    /**
     * Disable the select
     */
    disabled?: boolean;
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
     * Custom validation function that returns error message or undefined if valid
     */
    validate?: ValidationFunction;
    /**
     * Callback when validation error changes
     */
    onValidationError?: (error: string | undefined) => void;
    /**
     * Custom error message for required validation
     */
    errorMessage?: string;
}

export function Select({
    name,
    label,
    placeholder = "Select an option",
    options = [],
    value: externalValue,
    onChange,
    children,
    disabled = false,
    error,
    helperText,
    required = false,
    size = "md",
    className = "",
    validate: _validate,
    onValidationError: _onValidationError,
    errorMessage: _errorMessage,
}: SelectProps) {
    const form = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [_validationError, _setValidationError] = useState<
        string | undefined
    >();

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
        displayError = error || validationError;
    }

    // Register with Form
    useEffect(() => {
        if (form && name) {
            const validator: ValidationFunction = async (val: any) => {
                if (
                    required &&
                    (val === undefined || val === null || val === "")
                ) {
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
    }, [form, name, required, validate, errorMessage]);

    // Get the display text for the selected value
    const getSelectedLabel = () => {
        if (!value) return placeholder;
        const selected = options.find((opt) => opt.value === value);
        return selected ? selected.label : placeholder;
    };

    const sizeStyles = {
        xs: `[padding-left:var(--dropdown-padding-xs-x)] [padding-right:var(--dropdown-padding-xs-x)] [padding-top:var(--dropdown-padding-xs-y)] [padding-bottom:var(--dropdown-padding-xs-y)] [font-size:var(--dropdown-font-size-xs)]`,
        sm: `[padding-left:var(--dropdown-padding-sm-x)] [padding-right:var(--dropdown-padding-sm-x)] [padding-top:var(--dropdown-padding-sm-y)] [padding-bottom:var(--dropdown-padding-sm-y)] [font-size:var(--dropdown-font-size-sm)]`,
        md: `[padding-left:var(--dropdown-padding-md-x)] [padding-right:var(--dropdown-padding-md-x)] [padding-top:var(--dropdown-padding-md-y)] [padding-bottom:var(--dropdown-padding-md-y)] [font-size:var(--dropdown-font-size-md)]`,
        lg: `[padding-left:var(--dropdown-padding-lg-x)] [padding-right:var(--dropdown-padding-lg-x)] [padding-top:var(--dropdown-padding-lg-y)] [padding-bottom:var(--dropdown-padding-lg-y)] [font-size:var(--dropdown-font-size-lg)]`,
        xl: `[padding-left:var(--dropdown-padding-xl-x)] [padding-right:var(--dropdown-padding-xl-x)] [padding-top:var(--dropdown-padding-xl-y)] [padding-bottom:var(--dropdown-padding-xl-y)] [font-size:var(--dropdown-font-size-xl)]`,
    };

    const iconSizeStyles = {
        xs: `[width:var(--dropdown-icon-size-xs)] [height:var(--dropdown-icon-size-xs)]`,
        sm: `[width:var(--dropdown-icon-size-sm)] [height:var(--dropdown-icon-size-sm)]`,
        md: `[width:var(--dropdown-icon-size-md)] [height:var(--dropdown-icon-size-md)]`,
        lg: `[width:var(--dropdown-icon-size-lg)] [height:var(--dropdown-icon-size-lg)]`,
        xl: `[width:var(--dropdown-icon-size-xl)] [height:var(--dropdown-icon-size-xl)]`,
    };

    const optionSizeStyles = {
        xs: `[padding-left:var(--dropdown-option-padding-xs-x)] [padding-right:var(--dropdown-option-padding-xs-x)] [padding-top:var(--dropdown-option-padding-xs-y)] [padding-bottom:var(--dropdown-option-padding-xs-y)] [font-size:var(--dropdown-option-font-size-xs)]`,
        sm: `[padding-left:var(--dropdown-option-padding-sm-x)] [padding-right:var(--dropdown-option-padding-sm-x)] [padding-top:var(--dropdown-option-padding-sm-y)] [padding-bottom:var(--dropdown-option-padding-sm-y)] [font-size:var(--dropdown-option-font-size-sm)]`,
        md: `[padding-left:var(--dropdown-option-padding-md-x)] [padding-right:var(--dropdown-option-padding-md-x)] [padding-top:var(--dropdown-option-padding-md-y)] [padding-bottom:var(--dropdown-option-padding-md-y)] [font-size:var(--dropdown-option-font-size-md)]`,
        lg: `[padding-left:var(--dropdown-option-padding-lg-x)] [padding-right:var(--dropdown-option-padding-lg-x)] [padding-top:var(--dropdown-option-padding-lg-y)] [padding-bottom:var(--dropdown-option-padding-lg-y)] [font-size:var(--dropdown-option-font-size-lg)]`,
        xl: `[padding-left:var(--dropdown-option-padding-xl-x)] [padding-right:var(--dropdown-option-padding-xl-x)] [padding-top:var(--dropdown-option-padding-xl-y)] [padding-bottom:var(--dropdown-option-padding-xl-y)] [font-size:var(--dropdown-option-font-size-xl)]`,
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string | number) => {
        if (form && name) {
            // Update Form context
            form.setFieldValue(name, optionValue);
            form.setFieldTouched(name, true);
            // Validate on change for select (immediate feedback with new value)
            form.validateField(name, optionValue);
        } else {
            // Standalone mode
            onChange?.(optionValue);
        }
        setIsOpen(false);
    };

    const handleClear = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (form && name) {
            // Update Form context
            form.setFieldValue(name, undefined);
            form.setFieldTouched(name, true);
            // Validate with empty value (await to ensure it runs after state update)
            await form.validateField(name, undefined);
        } else {
            // Standalone mode
            onChange?.(undefined as any);
        }
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
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
                    {required && <span className="ml-1">*</span>}
                </label>
            )}

            {/* Dropdown Container */}
            <div ref={dropdownRef} className="relative">
                {/* Trigger Button */}
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    className={`
            w-full ${
                sizeStyles[size]
            } text-left bg-(--color-background) border rounded-(--dropdown-radius)
            flex items-center justify-between
            transition-all duration-200
            ${
                displayError
                    ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-(--color-border) focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] focus:border-(--color-primary)"
            }
            ${
                disabled
                    ? "bg-(--color-muted) cursor-not-allowed opacity-60"
                    : "hover:border-(--color-border)"
            }
            ${!value ? "text-(--color-placeholder)" : "text-(--color-foreground)"}
          `}
                >
                    <span className="truncate">{getSelectedLabel()}</span>
                    <div className="flex items-center gap-1 ml-2">
                        {value && (
                            <div
                                onClick={handleClear}
                                className="p-0.5 hover:bg-(--color-muted) rounded transition-colors cursor-pointer"
                                role="button"
                                aria-label="Clear selection"
                                tabIndex={-1}
                            >
                                <X
                                    className={`${iconSizeStyles[size]} text-(--color-muted-foreground)`}
                                />
                            </div>
                        )}
                        <ChevronDown
                            className={`${
                                iconSizeStyles[size]
                            } text-(--color-placeholder) transition-transform duration-200 shrink-0 ${
                                isOpen ? "transform rotate-180" : ""
                            }`}
                        />
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isOpen && !disabled && (
                    <div
                        className="absolute z-(--z-index-dropdown) w-full mt-1 bg-(--color-background) border border-(--color-border) rounded-lg shadow-lg max-h-60 overflow-auto"
                        role="listbox"
                    >
                        {children ? (
                            // Custom content
                            <div onClick={() => setIsOpen(false)}>
                                {children}
                            </div>
                        ) : (
                            // Standard options
                            <ul>
                                {/* Placeholder option - allows users to clear selection */}
                                <li key="__placeholder__">
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className={`
                        w-full ${optionSizeStyles[size]} text-left
                        transition-colors duration-150
                        ${
                            !value || value === ""
                                ? "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-(--color-primary) font-medium"
                                : "text-(--color-muted-foreground) hover:bg-(--color-muted)"
                        }
                      `}
                                        role="option"
                                        aria-selected={!value || value === ""}
                                    >
                                        {placeholder}
                                    </button>
                                </li>
                                {options.map((option) => (
                                    <li key={option.value}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                !option.disabled &&
                                                handleSelect(option.value)
                                            }
                                            disabled={option.disabled}
                                            className={`
                        w-full ${optionSizeStyles[size]} text-left
                        transition-colors duration-150
                        ${
                            option.value === value
                                ? "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-(--color-primary) font-medium"
                                : "text-(--color-foreground) hover:bg-(--color-muted)"
                        }
                        ${
                            option.disabled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }
                      `}
                                            role="option"
                                            aria-selected={
                                                option.value === value
                                            }
                                        >
                                            {option.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* Helper Text or Error */}
            <div className="h-5 mt-1.5">
                {(helperText || displayError) && (
                    <p
                        className={`text-caption ${displayError ? "text-red-600" : "text-(--color-muted-foreground)"}`}
                    >
                        {displayError || helperText}
                    </p>
                )}
            </div>
        </div>
    );
}
