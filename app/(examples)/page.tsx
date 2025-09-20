import Link from "next/link";

export default function ExamplesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Component Examples
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore interactive examples and documentation for all twetools-ui
          components.
        </p>
      </div>

      {/* Form Elements Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Form Elements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/input"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Input Fields
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Text inputs, email, password fields
            </p>
          </Link>
          <Link
            href="/checkbox"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Checkboxes
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Checkbox groups and custom styling
            </p>
          </Link>
          <Link
            href="/radio"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Radio Buttons
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Radio groups and form integration
            </p>
          </Link>
          <Link
            href="/select"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Select Dropdowns
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Single and multi-select options
            </p>
          </Link>
          <Link
            href="/dates"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Date Inputs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Date pickers and range selection
            </p>
          </Link>
          <Link
            href="/phone"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Phone Inputs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Phone formatting and validation
            </p>
          </Link>
          <Link
            href="/textarea"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Textarea Fields
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Multi-line text inputs
            </p>
          </Link>
          <Link
            href="/toggle"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Toggle Switches
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Toggle switches and groups
            </p>
          </Link>
          <Link
            href="/file-input"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              File Input
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              File upload components
            </p>
          </Link>
          <Link
            href="/dropzone"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Dropzone
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Drag and drop file uploads
            </p>
          </Link>
        </div>
      </div>

      {/* UI Elements Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          UI Elements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/buttons"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Buttons
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Button components and interactions
            </p>
          </Link>
          <Link
            href="/buttons-group"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Buttons & Groups
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Button variants and grouping
            </p>
          </Link>
          <Link
            href="/alerts"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Alerts
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Alert messages and notifications
            </p>
          </Link>
          <Link
            href="/badges"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Badges
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Status badges and indicators
            </p>
          </Link>
          <Link
            href="/avatars"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Avatars
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              User avatars and status indicators
            </p>
          </Link>
          <Link
            href="/breadcrumbs"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Breadcrumbs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Navigation breadcrumbs
            </p>
          </Link>
          <Link
            href="/tables"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Data Tables
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Sortable tables and pagination
            </p>
          </Link>
          <Link
            href="/dropdowns"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Dropdowns
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Dropdown menus and navigation
            </p>
          </Link>
          <Link
            href="/list"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Lists
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Styled lists and list items
            </p>
          </Link>
          <Link
            href="/modals"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Modals
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Modal dialogs and overlays
            </p>
          </Link>
          <Link
            href="/tabs"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Tabs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Tab navigation and panels
            </p>
          </Link>
          <Link
            href="/progress-bar"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Progress & Spinners
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Progress bars and loading states
            </p>
          </Link>
          <Link
            href="/pagination"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Pagination
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Page navigation controls
            </p>
          </Link>
          <Link
            href="/tooltip"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Tooltips
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Hover tooltips and popovers
            </p>
          </Link>
          <Link
            href="/links"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Links
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Styled links and navigation
            </p>
          </Link>
          <Link
            href="/icons"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Icons
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Icon library and usage patterns
            </p>
          </Link>
          <Link
            href="/ribbons"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Ribbons
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Promotional ribbons and banners
            </p>
          </Link>
          <Link
            href="/notification"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Global notification system
            </p>
          </Link>
          <Link
            href="/error-handling"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Error Handling
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Error boundaries and states
            </p>
          </Link>
        </div>
      </div>

      {/* Layout Components Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Layout Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/layout-components"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Layout Components
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Cards, modals, and layout building blocks
            </p>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
            50+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Components
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
            170+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Examples
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
            1300+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Tabler Icons
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
            100%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            TypeScript
          </div>
        </div>
      </div>
    </div>
  );
}
