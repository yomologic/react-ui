import { useId } from "react";
import { cn } from "../lib/utils";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  className,
  id,
  size = "md",
}: CheckboxProps) {
  // Auto-generate ID if not provided to ensure label clicking works
  const autoId = useId();
  const checkboxId = id || `checkbox-${autoId}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const sizeStyles = {
    xs: `[width:var(--checkbox-size-xs)] [height:var(--checkbox-size-xs)]`,
    sm: `[width:var(--checkbox-size-sm)] [height:var(--checkbox-size-sm)]`,
    md: `[width:var(--checkbox-size-md)] [height:var(--checkbox-size-md)]`,
    lg: `[width:var(--checkbox-size-lg)] [height:var(--checkbox-size-lg)]`,
    xl: `[width:var(--checkbox-size-xl)] [height:var(--checkbox-size-xl)]`,
  };

  const labelSizeStyles = {
    xs: `[font-size:var(--checkbox-label-font-size-xs)]`,
    sm: `[font-size:var(--checkbox-label-font-size-sm)]`,
    md: `[font-size:var(--checkbox-label-font-size-md)]`,
    lg: `[font-size:var(--checkbox-label-font-size-lg)]`,
    xl: `[font-size:var(--checkbox-label-font-size-xl)]`,
  };

  const labelSpacingStyles = {
    xs: `[margin-left:var(--checkbox-label-spacing-xs)]`,
    sm: `[margin-left:var(--checkbox-label-spacing-sm)]`,
    md: `[margin-left:var(--checkbox-label-spacing-md)]`,
    lg: `[margin-left:var(--checkbox-label-spacing-lg)]`,
    xl: `[margin-left:var(--checkbox-label-spacing-xl)]`,
  };

  return (
    <div className={cn("flex items-center", className)}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          sizeStyles[size],
          "rounded-(--checkbox-radius) border-gray-400 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50"
        )}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            labelSpacingStyles[size],
            labelSizeStyles[size],
            "font-medium text-gray-600",
            disabled && "cursor-not-allowed opacity-50",
            !disabled && "cursor-pointer"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}

interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  label?: string;
  name: string;
  options: CheckboxOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
  orientation?: "vertical" | "horizontal";
  required?: boolean;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function CheckboxGroup({
  label,
  name,
  options,
  value = [],
  onChange,
  className,
  orientation = "vertical",
  required = false,
  disabled = false,
  size = "md",
}: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (onChange) {
      if (checked) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((v) => v !== optionValue));
      }
    }
  };

  const sizeStyles = {
    xs: `[width:var(--checkbox-size-xs)] [height:var(--checkbox-size-xs)]`,
    sm: `[width:var(--checkbox-size-sm)] [height:var(--checkbox-size-sm)]`,
    md: `[width:var(--checkbox-size-md)] [height:var(--checkbox-size-md)]`,
    lg: `[width:var(--checkbox-size-lg)] [height:var(--checkbox-size-lg)]`,
    xl: `[width:var(--checkbox-size-xl)] [height:var(--checkbox-size-xl)]`,
  };

  const labelSizeStyles = {
    xs: `[font-size:var(--checkbox-label-font-size-xs)]`,
    sm: `[font-size:var(--checkbox-label-font-size-sm)]`,
    md: `[font-size:var(--checkbox-label-font-size-md)]`,
    lg: `[font-size:var(--checkbox-label-font-size-lg)]`,
    xl: `[font-size:var(--checkbox-label-font-size-xl)]`,
  };

  const labelSpacingStyles = {
    xs: `[margin-left:var(--checkbox-label-spacing-xs)]`,
    sm: `[margin-left:var(--checkbox-label-spacing-sm)]`,
    md: `[margin-left:var(--checkbox-label-spacing-md)]`,
    lg: `[margin-left:var(--checkbox-label-spacing-lg)]`,
    xl: `[margin-left:var(--checkbox-label-spacing-xl)]`,
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={cn(
          "space-y-2",
          orientation === "horizontal" && "flex flex-wrap gap-4 space-y-0"
        )}
      >
        {options.map((option) => {
          const isDisabled = disabled || option.disabled;
          return (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value.includes(option.value)}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                disabled={isDisabled}
                className={cn(
                  sizeStyles[size],
                  "rounded-(--checkbox-radius) border-gray-400 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  isDisabled && "cursor-not-allowed opacity-50"
                )}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className={cn(
                  labelSpacingStyles[size],
                  labelSizeStyles[size],
                  "font-medium text-gray-600",
                  isDisabled && "cursor-not-allowed opacity-50",
                  !isDisabled && "cursor-pointer"
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
