"use client";

import { IconChevronDown as DropdownIcon, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import BaseFormControl from "@/components/form-elements/form/BaseFormControl";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  value?: string;
  defaultValue?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  // Left icon props
  leftIcon?: React.ReactNode;
  iconBorder?: boolean;
  onLeftIconClick?: () => void;
  // Convenience prop for adding items
  onAddItem?: () => void;
  // FormField props (inherited from BaseFormControl)
  label?: string;
  error?: boolean | string;
  required?: boolean;
  hasValue?: boolean;
  hasBeenTouched?: boolean;
  hint?: string;
}

// Internal component for the actual select rendering
const SelectBase: React.FC<
  Omit<
    SelectProps,
    "label" | "required" | "hasValue" | "hasBeenTouched" | "hint"
  >
> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  value,
  defaultValue = "",
  id,
  name,
  disabled = false,
  error = false,
  leftIcon,
  iconBorder = false,
  onLeftIconClick,
  onAddItem,
}) => {
  // Handle convenience prop - if onAddItem is provided, auto-setup leftIcon
  const finalLeftIcon = onAddItem ? <IconPlus className="h-4 w-4" /> : leftIcon;
  const finalOnLeftIconClick = onAddItem || onLeftIconClick;
  const finalIconBorder = onAddItem ? true : iconBorder;
  // If controlled, use value prop; otherwise, use internal state
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  // Keep internal state in sync with value prop if controlled
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (value === undefined) setSelectedValue(val); // only update state if uncontrolled
    onChange(val);
  };

  return (
    <div className="relative">
      {/* Left Icon */}
      {finalLeftIcon && (
        <div
          className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center ${
            finalOnLeftIconClick ? "cursor-pointer" : ""
          } ${
            finalIconBorder
              ? "h-6 w-6 rounded border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
              : ""
          }`}
          onClick={finalOnLeftIconClick}
        >
          <span className="text-gray-500 dark:text-gray-400">
            {finalLeftIcon}
          </span>
        </div>
      )}

      <select
        id={id}
        name={name}
        disabled={disabled}
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
          finalLeftIcon ? "pl-12" : "px-4"
        } ${
          selectedValue
            ? "text-gray-800 dark:text-white/90"
            : "text-gray-400 dark:text-gray-400"
        } ${error ? "border-red-500 focus:border-red-500" : ""} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
        value={value !== undefined ? value : selectedValue}
        onChange={handleChange}
      >
        {/* Placeholder option */}
        <option
          value=""
          disabled
          hidden
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Right Icon (Dropdown Arrow) */}
      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
        <DropdownIcon className="w-5 h-5" />
      </span>
    </div>
  );
};

// Main Select component with BaseFormControl integration
const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  onChange,
  className,
  value,
  defaultValue,
  id,
  name,
  disabled,
  leftIcon,
  iconBorder,
  onLeftIconClick,
  onAddItem,
  label,
  error,
  required,
  hasValue,
  hasBeenTouched,
  hint,
}) => {
  // If label is provided, wrap with BaseFormControl
  if (label) {
    return (
      <BaseFormControl
        label={label}
        htmlFor={id || name}
        error={error}
        required={required}
        hasValue={hasValue}
        hasBeenTouched={hasBeenTouched}
        hint={hint}
      >
        <SelectBase
          options={options}
          placeholder={placeholder}
          onChange={onChange}
          className={className}
          value={value}
          defaultValue={defaultValue}
          id={id}
          name={name}
          disabled={disabled}
          leftIcon={leftIcon}
          iconBorder={iconBorder}
          onLeftIconClick={onLeftIconClick}
          onAddItem={onAddItem}
          error={typeof error === "boolean" ? error : !!error}
        />
      </BaseFormControl>
    );
  }

  // If no label, return bare SelectBase (for backward compatibility)
  return (
    <SelectBase
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      value={value}
      defaultValue={defaultValue}
      id={id}
      name={name}
      disabled={disabled}
      leftIcon={leftIcon}
      iconBorder={iconBorder}
      onLeftIconClick={onLeftIconClick}
      onAddItem={onAddItem}
      error={typeof error === "boolean" ? error : !!error}
    />
  );
};

export default Select;
