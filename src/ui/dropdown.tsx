"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";

export interface DropdownOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface DropdownProps {
    /**
     * Label text displayed above the dropdown
     */
    label?: string;
    /**
     * Placeholder text when no option is selected
     */
    placeholder?: string;
    /**
     * Array of options for the dropdown
     */
    options?: DropdownOption[];
    /**
     * Current selected value
     */
    value?: string | number;
    /**
     * Callback when selection changes
     */
    onChange?: (value: string | number) => void;
    /**
     * Custom content to render in the dropdown menu (overrides options)
     */
    children?: ReactNode;
    /**
     * Disable the dropdown
     */
    disabled?: boolean;
    /**
     * Error message to display
     */
    error?: string;
    /**
     * Helper text to display below the dropdown
     */
    helperText?: string;
    /**
     * Mark the field as required
     */
    required?: boolean;
    /**
     * Size of the dropdown
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Additional CSS classes
     */
    className?: string;
}

export function Dropdown({
    label,
    placeholder = "Select an option",
    options = [],
    value,
    onChange,
    children,
    disabled = false,
    error,
    helperText,
    required = false,
    size = "md",
    className = "",
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        onChange?.(optionValue);
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
        <div className={`w-full ${className}`}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
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
            } text-left bg-white border rounded-(--dropdown-radius)
            flex items-center justify-between
            transition-all duration-200
            ${
                error
                    ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            }
            ${
                disabled
                    ? "bg-gray-100 cursor-not-allowed opacity-60"
                    : "hover:border-gray-400"
            }
            ${!value ? "text-gray-400" : "text-gray-900"}
          `}
                >
                    <span className="truncate">{getSelectedLabel()}</span>
                    <ChevronDown
                        className={`${
                            iconSizeStyles[size]
                        } text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${
                            isOpen ? "transform rotate-180" : ""
                        }`}
                    />
                </button>

                {/* Dropdown Menu */}
                {isOpen && !disabled && (
                    <div
                        className="absolute z-50 w-full mt-1 bg-white border border-gray-400 rounded-lg shadow-lg max-h-60 overflow-auto"
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
                                ? "bg-blue-50 text-blue-700 font-medium"
                                : "text-gray-900 hover:bg-gray-100"
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
            {(helperText || error) && (
                <p
                    className={`mt-1 text-xs ${error ? "text-red-600" : "text-gray-500"}`}
                >
                    {error || helperText}
                </p>
            )}
        </div>
    );
}
