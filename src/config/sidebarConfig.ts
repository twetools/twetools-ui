import { createElement } from "react";
import {
  IconHome as HomeIcon,
  IconLock as AuthIcon,
  IconForms as FormElementsIcon,
  IconLayoutSidebar as PageIcon,
  IconComponents as UIElementsIcon,
  IconSettings as AdminIcon,
} from "@tabler/icons-react";
import type { AppSidebarConfig } from "../types/navigation";

export const getTweetoolsUiSidebarConfig = (): AppSidebarConfig => ({
  branding: {
    logo: "/images/logo/logo.svg",
    logoDark: "/images/logo/logo-dark.svg",
    logoIcon: "/images/logo/logo-icon.svg",
    altText: "Twetools UI Logo",
  },
  sections: [
    {
      title: "Menu",
      items: [
        {
          name: "Home",
          icon: createElement(HomeIcon),
          path: "/",
          devOnly: false,
        },
      ],
    },
    {
      title: "Examples",
      devOnly: false,
      items: [
        {
          name: "Admin Examples",
          icon: createElement(AdminIcon, { className: "w-6 h-6" }),
          subItems: [{ name: "User Management", path: "/users" }],
        },
        {
          name: "Form Elements",
          icon: createElement(FormElementsIcon, { className: "w-6 h-6" }),
          subItems: [
            { name: "Checkbox", path: "/checkbox" },
            { name: "Dates", path: "/dates" },
            { name: "Dropzone", path: "/dropzone" },
            { name: "Input", path: "/input" },
            { name: "Phone", path: "/phone" },
            { name: "Select", path: "/select" },
            { name: "Textarea", path: "/textarea" },
            { name: "Toggle", path: "/toggle" },
          ],
        },
        {
          name: "Layout Components",
          icon: createElement(PageIcon),
          subItems: [{ name: "Blank Page", path: "/blank", proOnly: true }],
        },
        {
          name: "UI Elements",
          icon: createElement(UIElementsIcon, { className: "w-6 h-6" }),
          subItems: [
            { name: "Alerts", path: "/alerts" },
            { name: "Avatars", path: "/avatars" },
            { name: "Badges", path: "/badges" },
            { name: "Breadcrumbs", path: "/breadcrumbs" },
            { name: "Buttons", path: "/buttons" },
            { name: "Buttons Group", path: "/buttons-group" },
            { name: "Dropdowns", path: "/dropdowns" },
            { name: "Modals", path: "/modals" },
            { name: "Tables", path: "/tables" },
          ],
        },
      ],
    },
  ],
});
