"use client";
import { SearchCategory, SearchResult } from "@/components";
import { getAllUsers, User } from "@/lib/users/actions";
import {
  IconUsers as UsersIcon,
  IconSearch as SearchIcon,
  IconFiles as PageIcon,
  IconComponents as ComponentIcon,
} from "@tabler/icons-react";

// Search function for users
const searchUsers = async (query: string): Promise<SearchResult[]> => {
  try {
    const users = await getAllUsers();
    return users
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
        type: "user",
        path: `/users?user=${user.userID}`,
        icon: <UsersIcon className="w-5 h-5" />,
      }));
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};

// Mock search function for components (since this is a UI library demo)
const searchComponents = async (query: string): Promise<SearchResult[]> => {
  const components = [
    {
      name: "Button",
      path: "/examples/ui-elements/buttons",
      description: "Button components with variants",
    },
    {
      name: "Modal",
      path: "/examples/layout-components/modals",
      description: "Modal dialog components",
    },
    {
      name: "Form",
      path: "/examples/form-elements",
      description: "Form input components",
    },
    {
      name: "Table",
      path: "/examples/ui-elements/tables",
      description: "Data table components",
    },
    {
      name: "Card",
      path: "/examples/layout-components/cards",
      description: "Card layout components",
    },
    {
      name: "Badge",
      path: "/examples/ui-elements/badges",
      description: "Badge and status indicators",
    },
    {
      name: "Alert",
      path: "/examples/ui-elements/alerts",
      description: "Alert and notification components",
    },
    {
      name: "Dropdown",
      path: "/examples/ui-elements/dropdowns",
      description: "Dropdown menu components",
    },
  ];

  return components
    .filter((component) => {
      const name = component.name.toLowerCase();
      const description = component.description.toLowerCase();
      const queryLower = query.toLowerCase();

      return name.includes(queryLower) || description.includes(queryLower);
    })
    .map((component) => ({
      id: `component-${component.name.toLowerCase()}`,
      title: component.name,
      subtitle: component.description,
      type: "component",
      path: component.path,
      icon: <ComponentIcon className="w-5 h-5" />,
    }));
};

// Mock search function for examples
const searchExamples = async (query: string): Promise<SearchResult[]> => {
  const examples = [
    {
      name: "Button Examples",
      path: "/examples/ui-elements/buttons",
      description: "Various button implementations",
    },
    {
      name: "Form Examples",
      path: "/examples/form-elements",
      description: "Form field examples and patterns",
    },
    {
      name: "Modal Examples",
      path: "/examples/layout-components/modals",
      description: "Modal dialog examples",
    },
    {
      name: "Table Examples",
      path: "/examples/ui-elements/tables",
      description: "Data table implementations",
    },
  ];

  return examples
    .filter((example) => {
      const name = example.name.toLowerCase();
      const description = example.description.toLowerCase();
      const queryLower = query.toLowerCase();

      return name.includes(queryLower) || description.includes(queryLower);
    })
    .map((example) => ({
      id: `example-${example.name.toLowerCase().replace(/\s+/g, "-")}`,
      title: example.name,
      subtitle: example.description,
      type: "example",
      path: example.path,
      icon: <SearchIcon className="w-5 h-5" />,
    }));
};

// Define search categories for twetools-ui
export const searchCategories: SearchCategory[] = [
  {
    name: "User",
    type: "user",
    searchFunction: searchUsers,
    icon: <UsersIcon className="w-5 h-5 text-blue-500" />,
    badgeColor: "primary",
  },
  {
    name: "Component",
    type: "component",
    searchFunction: searchComponents,
    icon: <ComponentIcon className="w-5 h-5 text-green-500" />,
    badgeColor: "success",
  },
  {
    name: "Example",
    type: "example",
    searchFunction: searchExamples,
    icon: <SearchIcon className="w-5 h-5 text-orange-500" />,
    badgeColor: "warning",
  },
];

// Static pages for navigation
export const staticPages: SearchResult[] = [
  {
    id: "page-users",
    title: "Users",
    subtitle: "User management and administration",
    type: "page",
    path: "/users",
    icon: <UsersIcon className="w-5 h-5 text-gray-500" />,
  },
  {
    id: "page-components",
    title: "Components",
    subtitle: "Browse all UI components",
    type: "page",
    path: "/examples",
    icon: <PageIcon className="w-5 h-5 text-gray-500" />,
  },
  {
    id: "page-buttons",
    title: "Buttons",
    subtitle: "Button component examples",
    type: "page",
    path: "/examples/ui-elements/buttons",
    icon: <ComponentIcon className="w-5 h-5 text-gray-500" />,
  },
  {
    id: "page-forms",
    title: "Forms",
    subtitle: "Form element examples",
    type: "page",
    path: "/examples/form-elements",
    icon: <ComponentIcon className="w-5 h-5 text-gray-500" />,
  },
];
