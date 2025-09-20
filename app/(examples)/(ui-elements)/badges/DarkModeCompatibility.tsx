"use client";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";

export default function DarkModeCompatibility() {
  return (
    <ComponentCard title="Dark Mode Compatibility">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Badge components are fully compatible with dark mode and automatically
          adjust their colors, borders, and text contrast for optimal
          readability in both light and dark themes. All color variants maintain
          their semantic meaning across themes.
        </p>
      </div>
    </ComponentCard>
  );
}




