"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Simulates a user not being logged in (for dev, API not ready).
 * If not authenticated, redirects to /(full-width-pages)/(auth)/signin.
 * Wrap your protected page/component with this.
 */
export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Use absolute URL for redirect as required
      window.location.replace("http://localhost:3000/signin");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}
