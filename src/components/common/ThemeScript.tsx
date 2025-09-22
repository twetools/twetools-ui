"use client";
import React from "react";

/**
 * ThemeScript - Prevents flash of unstyled content during theme initialization
 * This script runs before React hydration to apply the correct theme immediately
 */
export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
                document.body.style.background = '#18181b';
              } else {
                document.documentElement.classList.remove('dark');
                document.body.style.background = '#fff';
              }
            } catch(e) {}
          })();
        `,
      }}
    />
  );
}
