import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            w-full px-4 py-2 text-left bg-white border rounded-lg
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
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${
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
              <div onClick={() => setIsOpen(false)}>{children}</div>
            ) : (
              // Standard options
              <ul>
                {options.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() =>
                        !option.disabled && handleSelect(option.value)
                      }
                      disabled={option.disabled}
                      className={`
                        w-full px-4 py-2 text-left text-sm
                        transition-colors duration-150
                        ${
                          option.value === value
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-900 hover:bg-gray-100"
                        }
                        ${
                          option.disabled ? "opacity-50 cursor-not-allowed" : ""
                        }
                      `}
                      role="option"
                      aria-selected={option.value === value}
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
