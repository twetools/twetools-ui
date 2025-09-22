// app/providers.tsx
"use client";

import { DevModeProvider } from "@/context/DevModeContext";
import { ErrorProvider } from "@/context/ErrorContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import GlobalErrorHandler from "@/components/common/GlobalErrorHandler";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <ThemeProvider>
          <DevModeProvider>
            <AuthProvider>
              {children}
              <GlobalErrorHandler />
            </AuthProvider>
          </DevModeProvider>
        </ThemeProvider>
      </ErrorProvider>
    </ErrorBoundary>
  );
}
