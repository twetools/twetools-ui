"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Badge from "../ui/badge/Badge";
import { useDevMode } from "../../context/DevModeContext";
import type {
  NavItem,
  NavSection,
  AppSidebarConfig,
} from "../../types/navigation";

import {
  IconChevronDown as DropdownIcon,
  IconDots as HorizontalDotsIcon,
} from "@tabler/icons-react";

// Reusable badge components
const DevBadge: React.FC<{ size?: "sm" | "md" }> = ({ size = "sm" }) => (
  <Badge color="primary" size={size === "sm" ? "sm" : undefined}>
    DEV
  </Badge>
);

const NewBadge: React.FC<{ size?: "sm" | "md" }> = ({ size = "sm" }) => (
  <Badge color="success" size={size === "sm" ? "sm" : undefined}>
    NEW
  </Badge>
);

const ProBadge: React.FC<{ size?: "sm" | "md" }> = ({ size = "sm" }) => (
  <Badge color="warning" size={size === "sm" ? "sm" : undefined}>
    PRO
  </Badge>
);

interface BaseAppSidebarProps {
  /** Configuration object containing navigation sections and branding */
  config: AppSidebarConfig;
  /** Sidebar state management */
  sidebarState: {
    isExpanded: boolean;
    isMobileOpen: boolean;
    isHovered: boolean;
    setIsHovered: (hovered: boolean) => void;
  };
  /** Optional custom logo component */
  LogoComponent?: React.ComponentType<{
    isExpanded: boolean;
    isHovered: boolean;
    isMobileOpen: boolean;
  }>;
  /** Optional sidebar widget component */
  SidebarWidget?: React.ComponentType;
}

const BaseAppSidebar: React.FC<BaseAppSidebarProps> = ({
  config,
  sidebarState,
  LogoComponent,
  SidebarWidget,
}) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = sidebarState;
  const pathname = usePathname();
  const { enabled: devMode } = useDevMode();

  const [openSubmenu, setOpenSubmenu] = useState<{
    sectionIndex: number;
    itemIndex: number;
  } | null>(null);

  const [manualSubmenu, setManualSubmenu] = useState<boolean>(false);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string, name?: string) => {
      // Only highlight Home when at "/"
      if (name === "Home" && pathname === "/") return true;
      // Prevent other items with path "/" from being highlighted at home
      if (path === "/" && name !== "Home" && pathname === "/") return false;
      // Highlight only if pathname matches and not at root for non-Home
      if (path && name !== "Home") {
        return pathname === path && pathname !== "/";
      }
      return false;
    },
    [pathname]
  );

  const renderMenuItems = (navItems: NavItem[], sectionIndex: number) => (
    <ul className="flex flex-col gap-4 mt-3">
      {navItems.map((nav, itemIndex) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(sectionIndex, itemIndex)}
              className={`menu-item group ${
                openSubmenu?.sectionIndex === sectionIndex &&
                openSubmenu?.itemIndex === itemIndex
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`${
                  openSubmenu?.sectionIndex === sectionIndex &&
                  openSubmenu?.itemIndex === itemIndex
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text inline-flex items-center gap-2 text-sm">
                  <span>{nav.name}</span>
                  <span className="flex gap-1">
                    {nav.devOnly && (
                      <span className="normal-case text-xs leading-none">
                        <DevBadge />
                      </span>
                    )}
                  </span>
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <DropdownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.sectionIndex === sectionIndex &&
                    openSubmenu?.itemIndex === itemIndex
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path, nav.name)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path, nav.name)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text inline-flex items-center gap-2 text-sm">
                    <span>{nav.name}</span>
                    <span className="flex gap-1">
                      {nav.devOnly && <DevBadge size="sm" />}
                    </span>
                  </span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${sectionIndex}-${itemIndex}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.sectionIndex === sectionIndex &&
                  openSubmenu?.itemIndex === itemIndex
                    ? `${subMenuHeight[`${sectionIndex}-${itemIndex}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path, subItem.name)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      <span className="flex items-center space-x-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {subItem.icon && (
                          <span className="flex items-center justify-center text-gray-400 dark:text-gray-500">
                            <span className="w-auto h-5 min-w-[20px] flex items-center justify-center">
                              {subItem.icon}
                            </span>
                          </span>
                        )}
                        <span className="truncate">{subItem.name}</span>
                      </span>

                      <span className="flex items-center gap-1 ml-auto">
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.newOnly && <NewBadge />}
                          {subItem.proOnly && <ProBadge />}
                          {subItem.devOnly && <DevBadge />}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    // Only auto-open submenu if not manually toggled
    if (!manualSubmenu) {
      let found = false;
      let targetSubmenu: { sectionIndex: number; itemIndex: number } | null = null;

      config.sections.forEach((section, sectionIndex) => {
        const filteredItems = section.items.filter(
          (item) => !item.devOnly || devMode
        );

        filteredItems.forEach((nav, itemIndex) => {
          if (
            nav.subItems &&
            nav.subItems.some((subItem) => isActive(subItem.path, subItem.name))
          ) {
            targetSubmenu = { sectionIndex, itemIndex };
            found = true;
          }
        });
      });

      // Only update state if the target submenu is different from current
      setOpenSubmenu((currentSubmenu) => {
        if (!found) {
          return currentSubmenu ? null : currentSubmenu;
        }
        
        if (
          !currentSubmenu ||
          currentSubmenu.sectionIndex !== targetSubmenu!.sectionIndex ||
          currentSubmenu.itemIndex !== targetSubmenu!.itemIndex
        ) {
          return targetSubmenu;
        }
        
        return currentSubmenu;
      });
    }
  }, [
    pathname,
    manualSubmenu,
    config.sections,
    devMode,
    isActive,
  ]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.sectionIndex}-${openSubmenu.itemIndex}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (sectionIndex: number, itemIndex: number) => {
    setManualSubmenu(true);
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.sectionIndex === sectionIndex &&
        prevOpenSubmenu.itemIndex === itemIndex
      ) {
        return null;
      }
      return { sectionIndex, itemIndex };
    });
  };

  // Reset manualSubmenu when pathname changes (user navigates)
  useEffect(() => {
    setManualSubmenu(false);
  }, [pathname]);

  const DefaultLogo: React.FC<{
    isExpanded: boolean;
    isHovered: boolean;
    isMobileOpen: boolean;
  }> = ({ isExpanded, isHovered, isMobileOpen }) => (
    <Link href="/">
      {isExpanded || isHovered || isMobileOpen ? (
        <>
          <Image
            className="dark:hidden"
            src={config.branding?.logo || "/images/logo/logo.svg"}
            alt={config.branding?.altText || "Logo"}
            width={150}
            height={40}
          />
          <Image
            className="hidden dark:block"
            src={config.branding?.logoDark || "/images/logo/logo-dark.svg"}
            alt={config.branding?.altText || "Logo"}
            priority
            width={150}
            height={40}
            style={{ height: "auto" }}
          />
        </>
      ) : (
        <Image
          src={config.branding?.logoIcon || "/images/logo/logo-icon.svg"}
          alt={config.branding?.altText || "Logo"}
          width={32}
          height={32}
        />
      )}
    </Link>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        } items-center`}
        style={{ minHeight: "82px" }}
      >
        {LogoComponent ? (
          <LogoComponent
            isExpanded={isExpanded}
            isHovered={isHovered}
            isMobileOpen={isMobileOpen}
          />
        ) : (
          <DefaultLogo
            isExpanded={isExpanded}
            isHovered={isHovered}
            isMobileOpen={isMobileOpen}
          />
        )}
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="">
          <div className="flex flex-col gap-1">
            {config.sections.map((section, sectionIndex) => {
              const filteredItems = section.items.filter(
                (item) => !item.devOnly || devMode
              );

              if ((!section.devOnly || devMode) && filteredItems.length > 0) {
                return (
                  <div key={section.title}>
                    <SectionDivider
                      label={
                        isExpanded || isHovered || isMobileOpen ? (
                          section.title
                        ) : (
                          <HorizontalDotsIcon className="w-5 h-5" />
                        )
                      }
                      showDevBadge={
                        (isExpanded || isHovered || isMobileOpen) &&
                        section.devOnly &&
                        devMode
                      }
                    />
                    {renderMenuItems(filteredItems, sectionIndex)}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </nav>

        {/* Sidebar widget */}
        {SidebarWidget && (isExpanded || isHovered || isMobileOpen) && (
          <SidebarWidget />
        )}
      </div>
    </aside>
  );
};

export default BaseAppSidebar;

interface SectionDividerProps {
  label: React.ReactNode;
  showDevBadge?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  showDevBadge,
}) => {
  const isIcon = React.isValidElement(label);

  return (
    <div className="flex items-center my-1 select-none">
      {/* Left line */}
      <hr className="flex-1 border-t border-gray-300 dark:border-gray-600" />
      {/* Label or Icon */}
      {isIcon ? (
        <div className="flex items-center justify-center w-8 h-8 mx-2">
          <span className="flex items-center justify-center w-full h-full text-gray-300 dark:text-gray-500">
            {label}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 pl-2 w-auto justify-start">
          <span className="uppercase tracking-wider text-xs font-semibold text-gray-300 dark:text-gray-500 text-left">
            {label}
          </span>
          {showDevBadge && (
            <span className="normal-case text-xs leading-none">
              <DevBadge />
            </span>
          )}
        </div>
      )}
      {/* Right line */}
      <hr className="flex-1 border-t border-gray-300 dark:border-gray-600" />
    </div>
  );
};
