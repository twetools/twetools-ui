"use client";

import { useCallback, useRef } from "react";

export interface FocusNavigationOptions {
  skipHeaderNavigation?: boolean;
  enableKeyboardShortcuts?: boolean;
  customSelector?: string;
}

/**
 * Enhanced focus management for better keyboard navigation
 * Provides utilities for managing focus flow throughout the application
 */
export function useFocusNavigation(options: FocusNavigationOptions = {}) {
  const {
    skipHeaderNavigation = true,
    enableKeyboardShortcuts = true,
    customSelector,
  } = options;

  const lastFocusedElement = useRef<HTMLElement | null>(null);

  /**
   * Get focusable elements with improved selector
   */
  const getFocusableElements = useCallback(
    (container?: HTMLElement) => {
      const root = container || document;

      let selector = customSelector;

      if (!selector) {
        const baseSelectors = [
          'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
          'select:not([disabled]):not([tabindex="-1"])',
          'textarea:not([disabled]):not([tabindex="-1"])',
          'button:not([disabled]):not([tabindex="-1"])',
          'a[href]:not([tabindex="-1"])',
          '[tabindex]:not([tabindex="-1"]):not([disabled])',
        ];

        // Optionally exclude header navigation elements
        if (skipHeaderNavigation) {
          selector = baseSelectors.join(", ") + ":not([data-header-nav])";
        } else {
          selector = baseSelectors.join(", ");
        }
      }

      return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => {
          // Additional visibility checks
          const style = window.getComputedStyle(el);
          return (
            el.offsetParent !== null && // Not hidden
            style.visibility !== "hidden" &&
            style.display !== "none" &&
            el.getBoundingClientRect().width > 0 &&
            el.getBoundingClientRect().height > 0
          );
        }
      );
    },
    [customSelector, skipHeaderNavigation]
  );

  /**
   * Focus the first focusable element in a container
   */
  const focusFirst = useCallback(
    (container?: HTMLElement) => {
      const elements = getFocusableElements(container);
      if (elements.length > 0) {
        elements[0].focus();
        return true;
      }
      return false;
    },
    [getFocusableElements]
  );

  /**
   * Focus the last focusable element in a container
   */
  const focusLast = useCallback(
    (container?: HTMLElement) => {
      const elements = getFocusableElements(container);
      if (elements.length > 0) {
        elements[elements.length - 1].focus();
        return true;
      }
      return false;
    },
    [getFocusableElements]
  );

  /**
   * Save the currently focused element
   */
  const saveFocus = useCallback(() => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
  }, []);

  /**
   * Restore focus to the previously saved element
   */
  const restoreFocus = useCallback(() => {
    if (lastFocusedElement.current && lastFocusedElement.current.isConnected) {
      lastFocusedElement.current.focus();
      return true;
    }
    return false;
  }, []);

  /**
   * Create a focus trap within a container
   */
  const createFocusTrap = useCallback(
    (container: HTMLElement) => {
      const elements = getFocusableElements(container);
      if (elements.length === 0) return () => {};

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        // Shift + Tab (backwards)
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab (forwards)
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      container.addEventListener("keydown", handleKeyDown);

      // Focus first element initially
      firstElement.focus();

      // Return cleanup function
      return () => {
        container.removeEventListener("keydown", handleKeyDown);
      };
    },
    [getFocusableElements]
  );

  /**
   * Navigate to next/previous focusable element
   */
  const navigateToNext = useCallback(() => {
    const elements = getFocusableElements();
    const currentIndex = elements.indexOf(
      document.activeElement as HTMLElement
    );

    if (currentIndex >= 0 && currentIndex < elements.length - 1) {
      elements[currentIndex + 1].focus();
      return true;
    }
    return false;
  }, [getFocusableElements]);

  const navigateToPrevious = useCallback(() => {
    const elements = getFocusableElements();
    const currentIndex = elements.indexOf(
      document.activeElement as HTMLElement
    );

    if (currentIndex > 0) {
      elements[currentIndex - 1].focus();
      return true;
    }
    return false;
  }, [getFocusableElements]);

  return {
    getFocusableElements,
    focusFirst,
    focusLast,
    saveFocus,
    restoreFocus,
    createFocusTrap,
    navigateToNext,
    navigateToPrevious,
  };
}
