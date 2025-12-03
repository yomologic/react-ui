"use client";

import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { useForm, ValidationFunction } from "./form";

export interface SwitchProps {
    /**
     * Whether the switch is checked
     */
    checked?: boolean;
    /**
     * Callback when the switch state changes
     */
    onChange?: (checked: boolean) => void;
    /**
     * Whether the switch is disabled
     */
    disabled?: boolean;
    /**
     * Label text for the switch
     */
    label?: string;
    /**
     * Position of the label relative to the switch
     */
    labelPlacement?: "start" | "end" | "top" | "bottom";
    /**
     * Size of the switch
     */
    size?: "sm" | "md" | "lg";
    /**
     * Color variant of the switch when checked
     */
    color?: "primary" | "success" | "info" | "warning" | "error";
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Name attribute for the input
     */
    name?: string;
    /**
     * Required field indicator
     */
    required?: boolean;
    /**
     * Custom validation function
     */
    validate?: ValidationFunction;
    /**
     * Custom error message for required validation
     */
    errorMessage?: string;
}

export function Switch({
    checked: controlledChecked,
    onChange,
    disabled = false,
    label,
    labelPlacement = "end",
    size = "md",
    color = "primary",
    className = "",
    name,
    required = false,
    validate,
    errorMessage,
}: SwitchProps) {
    const form = useForm();
    const [internalChecked, setInternalChecked] = useState(false);

    // Determine checked state from Form context or props
    let checked: boolean;
    if (form && name) {
        checked = form.values[name] ?? controlledChecked ?? false;
    } else {
        const isControlled = controlledChecked !== undefined;
        checked = isControlled ? controlledChecked : internalChecked;
    }

    // Register with Form
    useEffect(() => {
        if (form && name) {
            const validator: ValidationFunction = async (val: boolean) => {
                if (required && !val) {
                    return errorMessage || "This field is required";
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

    const handleChange = () => {
        if (disabled) return;

        const newChecked = !checked;

        if (form && name) {
            // Update Form context
            form.setFieldValue(name, newChecked);
            form.setFieldTouched(name, true);
            // Validate on change for switch (immediate feedback with new value)
            form.validateField(name, newChecked);
        } else {
            // Standalone mode
            const isControlled = controlledChecked !== undefined;
            if (!isControlled) {
                setInternalChecked(newChecked);
            }
            onChange?.(newChecked);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleChange();
        }
    };

    // Size styles
    const sizeStyles = {
        sm: {
            track: "w-8 h-5",
            thumb: "w-3 h-3",
            translate: checked ? "translate-x-3.5" : "translate-x-0.5",
        },
        md: {
            track: "w-11 h-6",
            thumb: "w-4 h-4",
            translate: checked ? "translate-x-5" : "translate-x-1",
        },
        lg: {
            track: "w-14 h-7",
            thumb: "w-5 h-5",
            translate: checked ? "translate-x-7" : "translate-x-1",
        },
    };

    // Color styles when checked
    const colorStyles = {
        primary: "bg-[var(--color-primary)]",
        success: "bg-[var(--color-success)]",
        info: "bg-[var(--color-info)]",
        warning: "bg-[var(--color-warning)]",
        error: "bg-[var(--color-error)]",
    };

    // Container flex direction based on label placement
    const containerStyles = {
        start: "flex-row-reverse justify-end",
        end: "flex-row",
        top: "flex-col-reverse items-center",
        bottom: "flex-col items-center",
    };

    const gapStyles = {
        start: "gap-2",
        end: "gap-2",
        top: "gap-2",
        bottom: "gap-2",
    };

    const switchElement = (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label || "Toggle switch"}
            disabled={disabled}
            onClick={handleChange}
            onKeyDown={handleKeyDown}
            className={cn(
                "relative inline-flex shrink-0 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
                sizeStyles[size].track,
                checked ? colorStyles[color] : "bg-gray-300 dark:bg-gray-600",
                disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:opacity-90",
                checked && !disabled && "focus:ring-blue-500"
            )}
        >
            <span
                className={cn(
                    "inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out",
                    sizeStyles[size].thumb,
                    sizeStyles[size].translate,
                    "my-auto"
                )}
            />
        </button>
    );

    const content = !label ? (
        <>
            {switchElement}
            {name && (
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={() => {}}
                    className="sr-only"
                    required={required}
                />
            )}
        </>
    ) : (
        <label
            className={cn(
                "flex items-center cursor-pointer",
                containerStyles[labelPlacement],
                gapStyles[labelPlacement],
                disabled && "cursor-not-allowed opacity-50"
            )}
        >
            {switchElement}
            <span
                className={cn(
                    "text-sm font-semibold select-none",
                    disabled && "text-gray-400"
                )}
                style={
                    !disabled
                        ? { color: "var(--color-muted-foreground)" }
                        : undefined
                }
            >
                {label}
                {required && <span className="ml-1">*</span>}
            </span>
            {name && (
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={() => {}}
                    className="sr-only"
                    required={required}
                />
            )}
        </label>
    );

    return (
        <div
            className={className}
            style={{
                marginBottom: "var(--form-control-spacing)",
            }}
        >
            {content}
        </div>
    );
}
