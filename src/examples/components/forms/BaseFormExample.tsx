"use client";
import React from "react";
import BaseForm from "../../../components/forms/BaseForm";
import Button from "../../../components/button/Button";
import SaveButton from "../../../components/button/SaveButton";
import CancelButton from "../../../components/button/CancelButton";
import { IconUser as UserIcon } from "@tabler/icons-react";

// Example ComponentCard for twetools-ui examples
const ComponentCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
    {children}
  </div>
);

// Simple input field for example
const SimpleInput = ({ 
  label, 
  value, 
  onChange, 
  error,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md text-sm ${
        error 
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
      }`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
    )}
  </div>
);

export default function BaseFormExample() {
  const handleSave = async (formData: any) => {
    // Simulate API call
    console.log("Saving form data:", formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate validation error occasionally
    if (formData.name === "error") {
      throw new Error("Name cannot be 'error'");
    }
  };

  const handleClose = () => {
    console.log("Form closed");
  };

  return (
    <div className="space-y-6">
      <ComponentCard title="BaseForm Component">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The BaseForm component provides a consistent form wrapper with validation, 
          keyboard shortcuts, and automatic save/cancel handling.
        </p>

        <BaseForm
          initialData={{
            name: "",
            email: "",
            phone: ""
          }}
          onSave={handleSave}
          onClose={handleClose}
          title="Example Form"
          icon={<UserIcon className="h-6 w-6 text-blue-500" />}
          renderFields={(form, errors, handleChange) => (
            <div className="space-y-4">
              <SimpleInput
                label="Full Name"
                value={form.name}
                onChange={(value) => handleChange("name", value)}
                error={errors.name}
                placeholder="Enter your full name"
              />
              
              <SimpleInput
                label="Email Address"
                value={form.email}
                onChange={(value) => handleChange("email", value)}
                error={errors.email}
                placeholder="Enter your email"
              />
              
              <SimpleInput
                label="Phone Number"
                value={form.phone}
                onChange={(value) => handleChange("phone", value)}
                error={errors.phone}
                placeholder="Enter your phone number"
              />
            </div>
          )}
          dependencies={{
            SaveButton: SaveButton as any,
            CancelButton: CancelButton as any,
            Button: Button as any,
            // These would be provided by the consuming app:
            PageBreadcrumb: (() => null) as any,
            Tab: (() => null) as any,
          }}
        />
      </ComponentCard>

      <ComponentCard title="Form Features">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Keyboard Shortcuts
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+S</kbd> - Save form</li>
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+Enter</kbd> - Save and close</li>
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Escape</kbd> - Cancel/close</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Built-in Features
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Automatic loading states</li>
              <li>• Error handling and display</li>
              <li>• Form validation</li>
              <li>• Focus management</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Try it out:</strong> Enter "error" as the name to see error handling in action.
          </p>
        </div>
      </ComponentCard>
    </div>
  );
}