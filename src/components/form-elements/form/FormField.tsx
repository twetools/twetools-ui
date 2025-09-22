import React from "react";
import Label from "@/components/form-elements/input/Label";

/**
 * FormField component props
 */
interface FormFieldProps {
  /** The label text for the form field */
  label: string;
  /** The HTML id that this label is associated with */
  htmlFor: string;
  /** Error message to display below the field */
  error?: string;
  /** Helpful hint text to display below the field */
  hint?: string;
  /** The form input element */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether this field is required */
  required?: boolean;
  /** Whether the field currently has a value (for styling) */
  hasValue?: boolean;
  /** Whether the user has interacted with this field */
  hasBeenTouched?: boolean;
}

/**
 * A reusable form field wrapper that provides consistent styling,
 * labels, error states, and accessibility features.
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   htmlFor="email"
 *   required
 *   error={errors.email}
 * >
 *   <InputField type="email" id="email" />
 * </FormField>
 * ```
 */

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
