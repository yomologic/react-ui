import { cn } from "../lib/utils";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  className,
  id,
}: CheckboxProps) {
  // Auto-generate ID if not provided to ensure label clicking works
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
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
          "h-4 w-4 rounded border-gray-400 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50"
        )}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            "ml-2 text-sm font-medium text-gray-600",
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
                  "h-4 w-4 rounded border-gray-400 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  isDisabled && "cursor-not-allowed opacity-50"
                )}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className={cn(
                  "ml-2 text-sm font-medium text-gray-600",
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
