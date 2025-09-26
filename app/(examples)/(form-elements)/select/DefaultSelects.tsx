"use client";
import React, { useState } from "react";
import { IconPlus, IconCategory } from "@tabler/icons-react";
import ComponentCard from "@/components/common/ComponentCard";
import Select from "@/components/form-elements/select/Select";

export default function DefaultSelects() {
  const [basicSelect, setBasicSelect] = useState<string>("");
  const [countrySelect, setCountrySelect] = useState<string>("");
  const [statusSelect, setStatusSelect] = useState<string>("");
  const [prioritySelect, setPrioritySelect] = useState<string>("");
  const [categorySelect, setCategorySelect] = useState<string>("");
  const [productSelect, setProductSelect] = useState<string>("");

  // Mock function for adding new items
  const handleAddCategory = () => {
    alert("Add Category functionality would open a modal here");
  };

  // Sample options data
  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
  ];

  const statuses = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" },
  ];

  const priorities = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" },
  ];

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
    { value: "home", label: "Home & Garden" },
  ];

  const products = [
    { value: "laptop", label: "Laptop" },
    { value: "phone", label: "Smartphone" },
    { value: "tablet", label: "Tablet" },
    { value: "watch", label: "Smart Watch" },
  ];

  return (
    <ComponentCard title="Default Selects">
      <div className="space-y-6">
        {/* Basic Select Usage */}
        <div>
          <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
            Basic Select Examples
          </h4>
          <div className="space-y-4">
            <Select
              label="Basic Select"
              id="basic-select"
              options={countries}
              placeholder="Choose a country"
              value={basicSelect}
              onChange={setBasicSelect}
            />

            <Select
              label="Select with Placeholder"
              id="placeholder-select"
              options={statuses}
              placeholder="Select status"
              value={countrySelect}
              onChange={setCountrySelect}
            />
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800 mt-2">
            All Select components include a dropdown icon (chevron down) on the
            right side for visual consistency and accessibility
          </div>
        </div>

        {/* Required and Validation Examples */}
        <div>
          <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
            Required and Validation
          </h4>
          <div className="space-y-4">
            <Select
              label="Required Select"
              id="required-select"
              options={priorities}
              placeholder="Select priority level"
              value={statusSelect}
              onChange={setStatusSelect}
              required={true}
              hasValue={!!statusSelect?.trim()}
            />

            <Select
              label="Select with Hint"
              id="hint-select"
              options={countries}
              placeholder="Choose your location"
              value={prioritySelect}
              onChange={setPrioritySelect}
              hint="This helps us provide region-specific features"
            />
          </div>
        </div>

        {/* Left Icon Examples */}
        <div>
          <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select with Left Icons
          </h4>
          <div className="space-y-4">
            <Select
              label="Manual Icon Setup"
              id="manual-icon-select"
              options={categories}
              placeholder="Select category"
              value={categorySelect}
              onChange={setCategorySelect}
              leftIcon={<IconPlus className="h-4 w-4" />}
              iconBorder={true}
              onLeftIconClick={handleAddCategory}
            />

            <Select
              label="Convenience Add Item"
              id="add-item-select"
              options={products}
              placeholder="Select product"
              value={productSelect}
              onChange={setProductSelect}
              onAddItem={handleAddCategory}
            />
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800 mt-2">
            <strong>Manual approach:</strong> Use leftIcon, iconBorder, and onLeftIconClick for full control.<br />
            <strong>Convenience approach:</strong> Use onAddItem prop for automatic plus icon setup.
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}




