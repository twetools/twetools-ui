import React, { useState, useEffect } from "react";
import {
  IconTrash as DeleteIcon,
  IconX as CloseIcon,
  IconDownload as SaveIcon,
} from "@tabler/icons-react";
import ModalAlertConfirm from "../modal/ModalAlertConfirm";
import { useSmartForm } from "@/hooks/useSmartForm";

// Components that will be provided by the consuming application
export interface BaseFormDependencies {
  SaveButton: React.ComponentType<any>;
  CancelButton: React.ComponentType<any>;
  Button: React.ComponentType<any>;
  PageBreadcrumb: React.ComponentType<any>;
  Tab: React.ComponentType<any>;
  TabItem?: any; // Type will be provided by consuming app
}

// Built-in validation rules that can be reused across forms
const BUILT_IN_VALIDATIONS = {
  email: (value: unknown): string => {
    const email = value as string;
    if (!email || !email.trim()) {
      return ""; // Empty email is valid (not required)
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Please enter a valid email address";
  },

  website: (value: unknown): string => {
    const website = value as string;
    if (!website || !website.trim()) {
      return ""; // Empty website is valid (not required)
    }
    const websiteRegex =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return websiteRegex.test(website) ? "" : "Please enter a valid website URL";
  },

  phone: (value: unknown): string => {
    const phone = value as string;
    if (!phone || !phone.trim()) {
      return ""; // Empty phone is valid (not required)
    }
    // Remove common separators and validate
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, "");

    // Require at least 10 digits for a valid phone number
    if (cleanPhone.length < 10) {
      return "Phone number must be at least 10 digits";
    }

    // Allow up to 15 digits (international numbers) and optional + prefix
    const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
    return phoneRegex.test(cleanPhone)
      ? ""
      : "Please enter a valid phone number";
  },

  password: (value: unknown): string => {
    const password = value as string;
    if (!password || !password.trim()) {
      return ""; // Empty password is valid (not required)
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  },

  required: (value: unknown): string => {
    const stringValue = value as string;
    const isEmpty =
      value === "" ||
      value === null ||
      value === undefined ||
      (typeof value === "string" && stringValue.trim() === "");
    return isEmpty ? "This field is required" : "";
  },
};

// Auto-detect validation rules based on field names
const AUTO_VALIDATION_MAPPING = {
  email: "email",
  Email: "email",
  website: "website",
  Website: "website",
  phone: "phone",
  Phone: "phone",
  password: "password",
  Password: "password",
};

export interface BaseFormProps<T> {
  initialData: T;
  onSave: (data: T) => Promise<void>;
  onDelete?: (data: T) => Promise<void>;
  onClose: () => void;
  renderFields?: (
    form: T,
    errors: { [key: string]: string },
    handleChange: (name: string, value: unknown) => void,
    validateField?: (fieldName: string) => string
  ) => React.ReactNode;
  tabs?: any[]; // Optional tab items for tabbed forms - type provided by consuming app
  defaultActiveTab?: string; // Default active tab key
  onTabChange?: (key: string) => void; // Tab change handler
  showDeleteButton?: boolean;
  showCloseIcon?: boolean; // Show close icon in top right (default: true)
  showSaveIcon?: boolean; // Show save icon in top right (default: true)
  isEdit?: boolean;
  title?: string;
  icon?: React.ReactNode;
  entityLabel?: string; // e.g. "User", "Account", "Contact"
  validationRules?: { [key: string]: (value: unknown) => string };
  requiredFields?: string[];
  fieldLabels?: { [key: string]: string }; // Map field names to display labels for validation messages
  autoValidation?: boolean; // Enable auto-detection of validation rules (default: true)

  // Required dependencies from consuming application
  dependencies: BaseFormDependencies;
}

export default function BaseForm<T extends Record<string, unknown>>({
  initialData,
  onSave,
  onDelete,
  onClose,
  renderFields,
  tabs,
  defaultActiveTab,
  onTabChange,
  showDeleteButton = false,
  showCloseIcon = true,
  showSaveIcon = true,
  title = "",
  icon,
  entityLabel = "Item",
  validationRules = {},
  requiredFields = [],
  fieldLabels = {},
  autoValidation = true,
  dependencies,
}: BaseFormProps<T>) {
  // Extract components from dependencies
  const { SaveButton, CancelButton, Button, PageBreadcrumb, Tab } =
    dependencies;
  const [form, setForm] = useState<T>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Build combined validation rules (auto-detected + custom)
  const buildValidationRules = () => {
    const combined = { ...validationRules };

    if (autoValidation) {
      // Auto-detect validation rules based on field names
      Object.keys(initialData).forEach((fieldName) => {
        // Skip if custom rule already exists
        if (combined[fieldName]) return;

        // Check AUTO_VALIDATION_MAPPING for exact matches
        const mappedValidation =
          AUTO_VALIDATION_MAPPING[
            fieldName as keyof typeof AUTO_VALIDATION_MAPPING
          ];
        if (
          mappedValidation &&
          BUILT_IN_VALIDATIONS[
            mappedValidation as keyof typeof BUILT_IN_VALIDATIONS
          ]
        ) {
          combined[fieldName] =
            BUILT_IN_VALIDATIONS[
              mappedValidation as keyof typeof BUILT_IN_VALIDATIONS
            ];
          return;
        }

        // Check for partial matches (case-insensitive)
        const lowerFieldName = fieldName.toLowerCase();
        if (lowerFieldName.includes("email")) {
          combined[fieldName] = BUILT_IN_VALIDATIONS.email;
        } else if (
          lowerFieldName.includes("website") ||
          lowerFieldName.includes("url")
        ) {
          combined[fieldName] = BUILT_IN_VALIDATIONS.website;
        } else if (lowerFieldName.includes("phone")) {
          combined[fieldName] = BUILT_IN_VALIDATIONS.phone;
        } else if (lowerFieldName.includes("password")) {
          combined[fieldName] = BUILT_IN_VALIDATIONS.password;
        }
      });
    }

    return combined;
  };

  // Smart form validation with combined rules
  const smartForm = useSmartForm({
    initialValues: initialData,
    validationRules: buildValidationRules(),
    requiredFields,
    fieldLabels,
  });

  const handleChange = (name: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Update smart form state
    smartForm.setValue(name, value);
  };

  const validateField = (fieldName: string): string => {
    return smartForm.validateField(fieldName);
  };

  const handleSave = async () => {
    // Run validation before saving
    const isFormValid = smartForm.validateForm();

    // Merge smart form errors with existing errors and update state immediately
    const combinedErrors = { ...errors, ...smartForm.errors };
    setErrors(combinedErrors);

    if (!isFormValid) {
      // Don't proceed with save if validation fails
      return;
    }

    setIsSaving(true);
    try {
      await onSave(form);
      setIsSaving(false);
    } catch (e) {
      setIsSaving(false);
      setErrors((prev) => ({
        ...prev,
        form: e instanceof Error ? e.message : "Unexpected error saving.",
      }));
    }
  };

  const handleDelete = async () => {
    setShowDeleteConfirm(false);
    if (onDelete) {
      try {
        await onDelete(form);
      } catch {
        // ignore
      }
    }
    onClose();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+S for Save
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault(); // Prevent browser's default save behavior
        if (!isSaving) {
          handleSave();
        }
      }
      // Ctrl+Q for Cancel/Close (Quit current screen/modal)
      else if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "q"
      ) {
        event.preventDefault();
        onClose();
      }
    };

    // Add event listener to document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSave, onClose, isSaving]);

  // Auto-focus first tabbable field when form loads
  useEffect(() => {
    const focusFirstField = () => {
      // Small delay to ensure form is rendered
      setTimeout(() => {
        // Find all tabbable form elements, excluding buttons and other non-input elements
        const tabbableElements = document.querySelectorAll(
          'input:not([disabled]):not([tabindex="-1"]):not([type="checkbox"]):not([type="radio"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"])'
        );

        if (tabbableElements.length > 0) {
          const firstElement = tabbableElements[0] as HTMLElement;
          firstElement.focus();
        }
      }, 150);
    };

    focusFirstField();
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <PageBreadcrumb pageTitle={title || ""} icon={icon} />
      </div>
      <div className="max-w-5xl mx-auto bg-white dark:bg-white/[0.03] rounded-xl shadow pt-8 pb-6 px-6 py-6 space-y-8">
        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 relative">
            {showSaveIcon && (
              <button
                type="button"
                onClick={handleSave}
                className="absolute top-1.75 right-10 p-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Save"
                tabIndex={-1}
              >
                <SaveIcon className="h-6 w-6" />
              </button>
            )}
            {showCloseIcon && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-2 right-2 p-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Close"
                tabIndex={-1}
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            )}
            {tabs ? (
              <Tab
                items={tabs}
                defaultActiveKey={defaultActiveTab}
                noBorder={true}
                onChange={onTabChange}
              />
            ) : (
              renderFields &&
              renderFields(
                form,
                { ...errors, ...smartForm.errors },
                handleChange,
                validateField
              )
            )}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {showDeleteButton && onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  startIcon={<DeleteIcon />}
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-red-600"
                  type="button"
                  tabIndex={-1}
                >
                  {`Delete ${entityLabel}`}
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <CancelButton onClick={onClose} size="sm" />
              <SaveButton onClick={handleSave} loading={isSaving} size="sm">
                Save
              </SaveButton>
            </div>
          </div>
        </div>
        {showDeleteConfirm && (
          <ModalAlertConfirm
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            title={`Delete ${entityLabel}`}
            message={
              form.name
                ? `Are you sure you want to delete ${form.name}? This action cannot be undone.`
                : `Are you sure you want to delete this ${entityLabel.toLowerCase()}? This action cannot be undone.`
            }
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
            confirmText="Delete"
            cancelText="Cancel"
            variant="danger"
          />
        )}
      </div>
    </>
  );
}
