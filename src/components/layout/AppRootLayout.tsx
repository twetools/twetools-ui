import * as React from "react";
import { Providers, SidebarProvider, ThemeScript } from "../index";

interface AppRootLayoutProps {
  children: React.ReactNode;
  className?: string;
  fontClassName?: string;
}

/**
 * AppRootLayout - Root layout component for applications
 * Provides all necessary providers and theme handling
 * Applications can control their own CSS imports and font handling
 */
export default function AppRootLayout({
  children,
  className = "dark:bg-gray-900",
  fontClassName = "",
}: AppRootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${fontClassName} ${className}`.trim()}>
        <Providers>
          <SidebarProvider>{children}</SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
