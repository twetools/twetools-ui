"use client";
import React from "react";
import { useSidebar } from "@/components";
import BaseAppSidebar from "@/components/layout/BaseAppSidebar";
import type { AppSidebarConfig } from "@/types/navigation";

interface AppSidebarProps {
  config: AppSidebarConfig; // Required - each application must provide its own config
}

const AppSidebar: React.FC<AppSidebarProps> = ({ config }) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

  return (
    <BaseAppSidebar
      config={config}
      sidebarState={{
        isExpanded,
        isMobileOpen,
        isHovered,
        setIsHovered,
      }}
    />
  );
};

export default AppSidebar;
