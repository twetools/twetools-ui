import React from "react";
import { IconCurrencyDollar as FinancialIcon } from "@tabler/icons-react";
import InputField from "@/components/form-elements/input/InputField";

interface CurrencyFieldProps {
  // Input-specific props
  id?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  success?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean; // Auto-focus on mount
  decimalPlaces?: number; // Number of decimal places allowed (default: 2)
  // FormField props (inherited from InputField)
  label?: string;
  error?: boolean | string;
  required?: boolean;
  hasValue?: boolean;
  hasBeenTouched?: boolean;
  className?: string;
  hint?: string;
}

const CurrencyField: React.FC<CurrencyFieldProps> = ({
  // Input props
  id = "currency",
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  success = false,
  readOnly = false,
  autoFocus = false,
  decimalPlaces = 2,
  // FormField props
  label = "Amount",
  error = false,
  required = false,
  hasValue,
  hasBeenTouched,
  className = "",
  hint,
}) => {
  // Generate placeholder based on decimal places
  const defaultPlaceholder = decimalPlaces === 4 ? "0.0000" : "0.00";
  const finalPlaceholder = placeholder ?? defaultPlaceholder;

  // Handle currency formatting
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow only numbers and decimal point, with flexible decimal places during typing
    // This allows: "", "1", "1.", "1.2", "1.23", etc.
    const currencyRegex = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);

    // More permissive check - allow intermediate states like "1." while typing
    const isValidInput =
      inputValue === "" ||
      /^\d+$/.test(inputValue) || // Just digits
      /^\d*\.$/.test(inputValue) || // Digits with trailing decimal
      currencyRegex.test(inputValue); // Complete valid format

    if (isValidInput) {
      if (onChange) {
        onChange(e);
      }
    }
  };

  // Handle blur to format to specified decimal places
  const handleCurrencyBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !isNaN(parseFloat(value))) {
      // Format to specified decimal places
      const formatted = parseFloat(value).toFixed(decimalPlaces);
      // Create a new event with formatted value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: formatted,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      if (onChange) {
        onChange(syntheticEvent);
      }
    }

    if (onBlur) {
      onBlur(e);
    }
  };
  return (
    <InputField
      id={id}
      type="text"
      value={value}
      onChange={handleCurrencyChange}
      onBlur={handleCurrencyBlur}
      placeholder={finalPlaceholder}
      leftIcon={<FinancialIcon />}
      disabled={disabled}
      error={error}
      success={success}
      readOnly={readOnly}
      autoFocus={autoFocus}
      fieldName="Currency"
      label={label}
      required={required}
      hasValue={hasValue}
      hasBeenTouched={hasBeenTouched}
      className={className}
      hint={hint}
    />
  );
};

export default CurrencyField;
