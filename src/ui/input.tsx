import React, { useId, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { useFormControl } from "./form-control";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = "text",
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
            ...props
        },
        ref
    ) => {
        const autoId = useId();
        const formControl = useFormControl();
        const internalRef = useRef<HTMLInputElement>(null);

        // Use formControl context if available, otherwise use props
        const inputId = id || formControl?.fieldId || `input-${autoId}`;
        const inputError = formControl?.error || error;
        const inputValue = formControl?.value ?? externalValue;
        const isDisabled = props.disabled || formControl?.isDisabled;
        const isRequired = props.required || formControl?.isRequired;

        // Register with FormControl on mount
        useEffect(() => {
            const inputElement = internalRef.current;
            if (inputElement && formControl) {
                formControl.registerControl(inputElement);
                return () => formControl.unregisterControl(inputElement);
            }
        }, [formControl]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;

            // Update FormControl if available
            if (formControl) {
                formControl.setValue(newValue);
            }

            // Call external onChange
            onChange?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            // Mark as touched in FormControl
            if (formControl) {
                formControl.setTouched(true);
            }

            // Call external onBlur
            onBlur?.(e);
        };

        // If used within FormControl, don't render label/error (FormControl handles it)
        const shouldRenderLabel = label && !formControl;
        const shouldRenderError =
            (inputError && !formControl) || (inputError && !formControl?.error);

        return (
            <div className={cn("flex flex-col", fullWidth && "w-full")}>
                {shouldRenderLabel && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-semibold text-gray-600 mb-1"
                    >
                        {label}
                        {isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
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
                        id={inputId}
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isDisabled}
                        required={isRequired}
                        aria-invalid={!!inputError}
                        aria-describedby={
                            inputError
                                ? `${inputId}-error`
                                : helperText
                                  ? `${inputId}-helper`
                                  : undefined
                        }
                        className={cn(
                            "w-full px-3 py-2 border rounded-md transition-colors",
                            "text-gray-700 placeholder-gray-400",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500",
                            inputError
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-400",
                            leftIcon && "pl-10",
                            rightIcon && "pr-10",
                            className
                        )}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {shouldRenderError && (
                    <p
                        className="mt-1 text-sm text-red-600"
                        id={`${inputId}-error`}
                        role="alert"
                    >
                        {inputError}
                    </p>
                )}

                {helperText && !inputError && !formControl && (
                    <p
                        className="mt-1 text-sm text-gray-500"
                        id={`${inputId}-helper`}
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
