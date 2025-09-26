"use client";

import React from "react";
import Select from "./Select";

interface Option {
  value: string;
  label: string;
}

interface SelectWithAddProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  onAddItem: () => void; // Required callback when add item button is clicked
  className?: string;
  value?: string;
  defaultValue?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  // FormField props (inherited from BaseFormControl)
  label?: string;
  error?: boolean | string;
  required?: boolean;
  hasValue?: boolean;
  hasBeenTouched?: boolean;
  hint?: string;
}

// SelectWithAdd component - wrapper around base Select with onAddItem
const SelectWithAdd: React.FC<SelectWithAddProps> = ({
  onAddItem,
  ...props
}) => {
  return <Select {...props} onAddItem={onAddItem} />;
};

export default SelectWithAdd;
