import React from "react";
import SearchField from "@/components/ui/tables/SearchField";
import PaginationWithIcon from "@/components/ui/tables/PaginationWithIcon";

interface DataTableControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchPlaceholder: string;
  actions?: React.ReactNode;
  addButton?: React.ReactNode;
  // Top pagination props
  showTopPagination?: boolean;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  // Component visibility options
  showSearch?: boolean;
}

const DataTableControls: React.FC<DataTableControlsProps> = ({
  searchTerm,
  setSearchTerm,
  searchPlaceholder,
  actions,
  addButton,
  showTopPagination = false,
  totalPages = 0,
  currentPage = 1,
  onPageChange,
  showSearch = true,
}) => {
  const hasTopPagination = showTopPagination && totalPages > 1 && onPageChange;

  return (
    <div className="pb-7 pl-7 pr-4 flex flex-col gap-3 border-b border-gray-200 dark:border-white/[0.05] sm:flex-row sm:items-center sm:justify-between">
      {showSearch && (
        <SearchField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={searchPlaceholder}
        />
      )}
      <div
        className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
          !showSearch ? "sm:ml-auto" : ""
        }`}
      >
        {/* {actions}
        {actions && (addButton || hasTopPagination) && (
          <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700"></div>
        )} */}
        {addButton && <div className="mr-4">{addButton}</div>}
        {addButton && hasTopPagination && (
          <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700 ml-3"></div>
        )}
        {hasTopPagination && (
          <PaginationWithIcon
            totalPages={totalPages}
            initialPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default DataTableControls;
