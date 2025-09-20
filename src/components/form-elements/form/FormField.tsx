import React from "react";
import Label from "@/components/form-elements/input/Label";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean; // New prop to show asterisk
  hasValue?: boolean; // New prop to indicate if field has content
  hasBeenTouched?: boolean; // New prop to track user interaction
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  hint,
  children,
  className = "",
  required = false,
  hasValue = false,
  hasBeenTouched = false,
}) => {
  // Determine asterisk state based on UX best practices
  const getAsteriskState = () => {
    if (!required) return null;

    // Always show red asterisk for required fields for consistency
    return (
      <span className="text-error-500 ml-1" aria-label="required field">
        *
      </span>
    );
  };

  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>
        {label}
        {getAsteriskState()}
      </Label>
      {children}
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
      )}
    </div>
  );
};

export default FormField;




