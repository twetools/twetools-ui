"use client";
import React, { useState } from "react";
import DataTable from "../ui/tables/DataTable";
import type { DataTableColumn } from "../ui/tables/DataTable";
import Button from "../ui/button/Button";
import AddButton from "../ui/button/AddButton";
import Badge from "../ui/badge/Badge";
import InputField from "../form-elements/input/InputField";
import Select from "../form-elements/select/Select";

// User data interface for list display
export interface UserListData {
  id: number;
  name: string;
  email: string;
  role?: string;
  department?: string;
  status?: "active" | "inactive" | "pending";
  lastActive?: string;
  avatar?: string;
  phone?: string;
  joinDate?: string;
}

// Action handlers - applications provide business logic
export interface UserListHandlers {
  onAdd?: () => void;
  onEdit?: (user: UserListData) => void;
  onDelete?: (user: UserListData) => Promise<void>;
  onBulkDelete?: (users: UserListData[]) => Promise<void>;
  onStatusChange?: (user: UserListData, newStatus: string) => Promise<void>;
  onExport?: (users: UserListData[]) => void;
  onSearch?: (query: string) => Promise<UserListData[]>;
  onFilter?: (filters: Record<string, any>) => Promise<UserListData[]>;
}

// Configuration for customization
export interface UserListConfig {
  title?: string;
  showAddButton?: boolean;
  showBulkActions?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  showExport?: boolean;
  columns?: string[]; // Which columns to display
  pageSize?: number;
  allowStatusChange?: boolean;
  customActions?: (user: UserListData) => React.ReactNode;
  customFilters?: React.ReactNode;
  customBulkActions?: (selectedUsers: UserListData[]) => React.ReactNode;
}

interface UserListPageProps {
  users: UserListData[]; // Required - application provides user data
  handlers?: UserListHandlers; // Optional - application provides business logic
  config?: UserListConfig; // Optional - application can customize behavior
  loading?: boolean;
}

const UserListPage: React.FC<UserListPageProps> = ({
  users,
  handlers = {},
  config = {},
  loading = false,
}) => {
  const {
    title = "Users",
    showAddButton = true,
    showBulkActions = true,
    showSearch = true,
    showFilters = true,
    showExport = false,
    columns = ["name", "email", "role", "status", "lastActive"],
    pageSize = 25,
    allowStatusChange = true,
    customActions,
    customFilters,
    customBulkActions,
  } = config;

  const [selectedUsers, setSelectedUsers] = useState<UserListData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !searchQuery ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Define table columns based on config
  const getColumns = (): DataTableColumn<UserListData>[] => {
    const allColumns: Record<string, DataTableColumn<UserListData>> = {
      name: {
        key: "name",
        label: "Name",
        render: (user: UserListData) => (
          <div className="flex items-center gap-3">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {user.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </div>
            </div>
          </div>
        ),
      },
      email: {
        key: "email",
        label: "Email",
      },
      role: {
        key: "role",
        label: "Role",
      },
      department: {
        key: "department",
        label: "Department",
      },
      status: {
        key: "status",
        label: "Status",
        render: (user: UserListData) => {
          const status = user.status;
          const statusColors = {
            active: "success",
            inactive: "light",
            pending: "warning",
          } as const;

          return (
            <Badge
              color={
                statusColors[status || "inactive"] as
                  | "success"
                  | "warning"
                  | "light"
              }
            >
              {status || "inactive"}
            </Badge>
          );
        },
      },
      lastActive: {
        key: "lastActive",
        label: "Last Active",
      },
      actions: {
        key: "actions",
        label: "Actions",
        render: (user: UserListData) => (
          <div className="flex items-center gap-2">
            {handlers.onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlers.onEdit?.(user)}
              >
                Edit
              </Button>
            )}
            {customActions?.(user)}
            {handlers.onDelete && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlers.onDelete?.(user)}
              >
                Delete
              </Button>
            )}
          </div>
        ),
      },
    };

    return [...columns, "actions"]
      .map((col) => allColumns[col])
      .filter(Boolean);
  };

  // Get unique roles and statuses for filters
  const roles = [...new Set(users.map((u) => u.role).filter(Boolean))];
  const statuses = [...new Set(users.map((u) => u.status).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
        <div className="flex items-center gap-3">
          {showExport && handlers.onExport && (
            <Button
              variant="outline"
              onClick={() => handlers.onExport?.(filteredUsers)}
            >
              Export
            </Button>
          )}
          {showAddButton && handlers.onAdd && (
            <AddButton onClick={handlers.onAdd}>Add User</AddButton>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {showSearch && (
            <div className="flex-1 max-w-md">
              <InputField
                type="search"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {showFilters && (
            <div className="flex items-center gap-3">
              {roles.length > 0 && (
                <Select
                  value={filterRole}
                  onChange={(value) => setFilterRole(value)}
                  options={[
                    { value: "", label: "All Roles" },
                    ...roles
                      .filter(Boolean)
                      .map((role) => ({ value: role!, label: role! })),
                  ]}
                />
              )}

              {statuses.length > 0 && (
                <Select
                  value={filterStatus}
                  onChange={(value) => setFilterStatus(value)}
                  options={[
                    { value: "", label: "All Statuses" },
                    ...statuses
                      .filter(Boolean)
                      .map((status) => ({ value: status!, label: status! })),
                  ]}
                />
              )}

              {customFilters}
            </div>
          )}
        </div>
      )}

      {/* Bulk Actions */}
      {showBulkActions && selectedUsers.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <span className="text-sm text-blue-700 dark:text-blue-300">
            {selectedUsers.length} users selected
          </span>

          {handlers.onBulkDelete && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handlers.onBulkDelete?.(selectedUsers)}
            >
              Delete Selected
            </Button>
          )}

          {customBulkActions?.(selectedUsers)}
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <DataTable
          data={filteredUsers}
          columns={getColumns()}
          loading={loading}
          selectableRows={showBulkActions}
          onSelectedRowsChange={
            showBulkActions
              ? (selected) => {
                  if (
                    Array.isArray(selected) &&
                    selected.length > 0 &&
                    typeof selected[0] === "object"
                  ) {
                    setSelectedUsers(selected as UserListData[]);
                  } else {
                    setSelectedUsers([]);
                  }
                }
              : undefined
          }
          defaultRowsPerPage={pageSize}
        />
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
};

export default UserListPage;
