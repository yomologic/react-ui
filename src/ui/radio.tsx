import { cn } from "../lib/utils";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  orientation?: "vertical" | "horizontal";
  required?: boolean;
  disabled?: boolean;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  className,
  orientation = "vertical",
  required = false,
  disabled = false,
}: RadioGroupProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
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
          orientation === "vertical" && "space-y-2",
          orientation === "horizontal" && "flex flex-wrap gap-4"
        )}
      >
        {options.map((option) => {
          const isDisabled = disabled || option.disabled;
          return (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                disabled={isDisabled}
                className={cn(
                  "h-4 w-4 border-gray-400 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
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
