import * as React from "react";
import { Outfit } from "next/font/google";
import { Providers, SidebarProvider } from "../index";
import ThemeScript from "../common/ThemeScript";

const outfit = Outfit({
  subsets: ["latin"],
});

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * AppLayout - Complete application layout with all providers and theme handling
 * This should be used as the root layout in Next.js applications
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Providers>
          <SidebarProvider>{children}</SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
