"use client";
import React from "react";
import { useSidebar } from "@/components";
import BaseAppSidebar from "@/components/layout/BaseAppSidebar";
import { getTweetoolsUiSidebarConfig } from "@/config/sidebarConfig";

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const config = getTweetoolsUiSidebarConfig();

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
