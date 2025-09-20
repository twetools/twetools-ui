"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { getAllUsers, User } from "@/lib/users/actions";
import {
  IconUsers as UsersIcon,
  IconBriefcase as ClientIcon,
  IconLayoutSidebar as PageIcon,
  IconUserCog as UserCogIcon,
} from "@tabler/icons-react";
import Badge from "@/components/ui/badge/Badge";

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: "user" | "page";
  path: string;
  icon?: React.ReactNode;
}

interface GlobalSearchProps {
  placeholder?: string;
  className?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  placeholder = "Search or type command...",
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 300);

  // Static page navigation data - only user and generic pages for twetools-ui
  const pageData: SearchResult[] = [
    {
      id: "page-users",
      title: "Users",
      subtitle: "User management and administration",
      type: "page",
      path: "/users",
    },
    {
      id: "page-examples",
      title: "Component Examples",
      subtitle: "UI component library examples",
      type: "page",
      path: "/examples",
    },
  ];

  const performSearch = async (
    searchQuery: string
  ): Promise<SearchResult[]> => {
    if (!searchQuery.trim()) return [];

    setIsLoading(true);

    try {
      const query = searchQuery.toLowerCase();
      const allResults: SearchResult[] = [];

      // Search contacts section removed - twetools-ui only includes User data

      // Search users
      try {
        const users = await getAllUsers();
        const userResults = users
          .filter((user: User) => {
            const name = user.name || "";
            const email = user.email || "";
            const phone = user.phone || "";
            return (
              name.toLowerCase().includes(query) ||
              email.toLowerCase().includes(query) ||
              phone.toLowerCase().includes(query)
            );
          })
          .map((user: User) => ({
            id: `user-${user.userID}`,
            title: user.name || "Unknown User",
            subtitle: user.email
              ? `Email: ${user.email}`
              : `Phone: ${user.phone || "N/A"}`,
            type: "user" as const,
            path: "/users",
          }));
        allResults.push(...userResults);
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      // Search accounts section removed - twetools-ui only includes User data

      // Search pages
      const pageResults = pageData.filter(
        (page: SearchResult) =>
          page.title.toLowerCase().includes(query) ||
          page.subtitle?.toLowerCase().includes(query)
      );
      allResults.push(...pageResults);

      setIsLoading(false);
      return allResults.slice(0, 10); // Limit to 10 results
    } catch (error) {
      console.error("Search error:", error);
      setIsLoading(false);
      return [];
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery).then(setResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }

      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          setQuery("");
          inputRef.current?.blur();
          break;
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          event.preventDefault();
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.path);
    setIsOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "contact":
        return <UsersIcon className="text-brand-500 dark:text-brand-400" />;
      case "user":
        return <UserCogIcon className="text-brand-500 dark:text-brand-400" />;
      case "account":
        return <ClientIcon className="text-brand-500 dark:text-brand-400" />;
      case "page":
        return <PageIcon className="text-brand-500 dark:text-brand-400" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "contact":
        return "Contact";
      case "user":
        return "User";
      case "account":
        return "Account";
      case "page":
        return "Page";
      default:
        return "";
    }
  };

  const getBadgeColor = (type: string): "primary" => {
    // Use default badge color for consistency across all search result types
    return "primary";
  };

  return (
    <div className="relative">
      <div className="relative">
        <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
          <svg
            className="fill-gray-500 dark:fill-gray-400"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
              fill=""
            />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder={placeholder}
          className={`dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px] ${className}`}
        />
        <button
          className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400"
          tabIndex={-1}
        >
          <span> ⌘ </span>
          <span> K </span>
        </button>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || results.length > 0) && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xl max-h-96 overflow-y-auto z-50"
        >
          {isLoading && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <div className="inline-flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                Searching...
              </div>
            </div>
          )}

          {!isLoading && query.trim() && results.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 ${
                    index === selectedIndex ? "bg-gray-50 dark:bg-gray-800" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-6 h-6 text-brand-500 dark:text-brand-400 [&>svg]:w-full [&>svg]:h-full">
                    {getResultIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {result.title}
                      </span>
                      <Badge
                        variant="light"
                        color={getBadgeColor(result.type)}
                        size="sm"
                      >
                        {getTypeLabel(result.type)}
                      </Badge>
                    </div>
                    {result.subtitle && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {result.subtitle}
                      </p>
                    )}
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
