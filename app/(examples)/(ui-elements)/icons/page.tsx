"use client";

import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import * as TablerIcons from "@tabler/icons-react";

// Get all icon names and components from Tabler Icons
const iconEntries = Object.entries(TablerIcons).filter(
  ([name]) => name.startsWith("Icon") && name !== "IconProps"
);

export default function IconBrowser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const filteredIcons = iconEntries.filter(([name]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (iconName: string) => {
    navigator.clipboard.writeText(
      `import { ${iconName} } from "@tabler/icons-react";`
    );
    setSelectedIcon(iconName);
    setTimeout(() => setSelectedIcon(null), 2000);
  };

  return (
    <ComponentCard
      title="Tabler Icons Browser"
      desc={`Found ${filteredIcons.length} icons. Click any icon to copy its import statement.`}
    >
      <div className="space-y-6">
        {/* Search Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Search Icons
          </h3>
          <div className="max-w-md">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Icons Grid Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Available Icons
          </h3>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-3">
            {filteredIcons.map(([name, IconComponent]) => {
              const Icon = IconComponent as React.ComponentType<{
                size?: number;
                className?: string;
              }>;
              return (
                <div
                  key={name}
                  className={`
                    flex flex-col items-center justify-center 
                    border border-gray-200 dark:border-gray-700 rounded-lg 
                    transition-all duration-200 cursor-pointer 
                    w-full h-16 p-2 bg-white dark:bg-gray-800
                    hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20
                    ${
                      selectedIcon === name
                        ? "bg-blue-500 border-blue-500 text-white dark:bg-blue-600"
                        : "text-gray-700 dark:text-gray-300"
                    }
                  `}
                  onClick={() => copyToClipboard(name)}
                  title={`Click to copy import statement for ${name}`}
                >
                  <Icon size={20} className="mb-1 flex-shrink-0" />
                  <span className="text-xs text-center truncate w-full leading-tight">
                    {name.replace("Icon", "")}
                  </span>
                  {selectedIcon === name && (
                    <div className="absolute top-1 right-1 text-xs text-green-500 animate-pulse">
                      ?
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Usage Instructions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Usage Instructions
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              <strong>Click to Copy:</strong> Click any icon to copy its import
              statement to the clipboard.
            </p>
            <p className="mb-2">
              <strong>Import Format:</strong>{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                import {`{ IconName }`} from &quot;@tabler/icons-react&quot;;
              </code>
            </p>
            <p className="mb-2">
              <strong>Usage Example:</strong>{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                {`<IconHome size={24} className="text-blue-500" />`}
              </code>
            </p>
            <p>
              <strong>Source:</strong> All icons are from{" "}
              <a
                href="https://tabler.io/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Tabler Icons
              </a>
            </p>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}




