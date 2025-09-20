import React, { useEffect, useRef } from "react";

/**
 * Development-only focus debugging utility
 * Helps identify focus management issues during development
 */
interface FocusDebugOptions {
  enabled?: boolean;
  logFocusChanges?: boolean;
  highlightFocusedElement?: boolean;
  showFocusableElements?: boolean;
  componentName?: string;
}

export function useFocusDebug(options: FocusDebugOptions = {}) {
  const {
    enabled = process.env.NODE_ENV === "development",
    logFocusChanges = true,
    highlightFocusedElement = true,
    showFocusableElements = false,
    componentName = "Unknown Component",
  } = options;

  const debugStyle = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Add debug styles for focus highlighting
    if (highlightFocusedElement && !debugStyle.current) {
      debugStyle.current = document.createElement("style");
      debugStyle.current.textContent = `
        .focus-debug-highlight:focus {
          outline: 3px solid #ff6b6b !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 6px rgba(255, 107, 107, 0.2) !important;
        }
        .focus-debug-focusable {
          outline: 1px dashed #4ecdc4 !important;
          outline-offset: 1px !important;
        }
      `;
      document.head.appendChild(debugStyle.current);
    }

    // Focus change logger
    const handleFocusIn = (e: FocusEvent) => {
      if (logFocusChanges) {
        console.log(
          `🎯 [${componentName}] Focus IN:`,
          e.target,
          {
            tagName: (e.target as HTMLElement)?.tagName,
            id: (e.target as HTMLElement)?.id,
            className: (e.target as HTMLElement)?.className,
            tabIndex: (e.target as HTMLElement)?.tabIndex,
          }
        );
      }
      
      if (highlightFocusedElement) {
        (e.target as HTMLElement)?.classList.add("focus-debug-highlight");
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (highlightFocusedElement) {
        (e.target as HTMLElement)?.classList.remove("focus-debug-highlight");
      }
    };

    // Show all focusable elements
    if (showFocusableElements) {
      const focusableSelector = [
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
      ].join(", ");

      const focusableElements = document.querySelectorAll(focusableSelector);
      focusableElements.forEach((el) => {
        (el as HTMLElement).classList.add("focus-debug-focusable");
      });

      console.log(
        `🔍 [${componentName}] Found ${focusableElements.length} focusable elements:`,
        Array.from(focusableElements)
      );
    }

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      
      if (debugStyle.current) {
        debugStyle.current.remove();
        debugStyle.current = null;
      }

      // Clean up debug classes
      document.querySelectorAll(".focus-debug-focusable").forEach((el) => {
        el.classList.remove("focus-debug-focusable");
      });
    };
  }, [enabled, logFocusChanges, highlightFocusedElement, showFocusableElements, componentName]);

  return {
    /**
     * Manually trigger focus debug for a specific container
     */
    debugFocusableElements: (container?: HTMLElement) => {
      if (!enabled) return;
      
      const root = container || document;
      const focusableSelector = [
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
      ].join(", ");

      const elements = root.querySelectorAll(focusableSelector);
      console.log(
        `🔍 [${componentName}] Focusable elements in container:`,
        Array.from(elements).map((el) => ({
          element: el,
          tagName: el.tagName,
          id: (el as HTMLElement).id,
          tabIndex: (el as HTMLElement).tabIndex,
          visible: (el as HTMLElement).offsetParent !== null,
          disabled: (el as HTMLInputElement).disabled,
        }))
      );
    },

    /**
     * Focus the first focusable element in a container
     */
    focusFirst: (container?: HTMLElement) => {
      if (!enabled) return false;
      
      const root = container || document;
      const firstFocusable = root.querySelector<HTMLElement>(
        'input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      
      if (firstFocusable) {
        firstFocusable.focus();
        console.log(`🎯 [${componentName}] Focused first element:`, firstFocusable);
        return true;
      }
      
      console.warn(`⚠️ [${componentName}] No focusable element found`);
      return false;
    },
  };
}

/**
 * React component for debugging focus in development
 */
export function FocusDebugger({ 
  componentName = "Focus Debugger",
  children 
}: { 
  componentName?: string;
  children?: React.ReactNode;
}) {
  const { debugFocusableElements } = useFocusDebug({ componentName });

  if (process.env.NODE_ENV !== "development") {
    return <>{children}</>;
  }

  return (
    <div>
      <div style={{ 
        padding: "8px", 
        background: "#f0f0f0", 
        border: "1px solid #ccc", 
        fontSize: "12px",
        fontFamily: "monospace" 
      }}>
        <strong>🔍 Focus Debug: {componentName}</strong>
        <button 
          onClick={() => debugFocusableElements()} 
          style={{ marginLeft: "8px", padding: "2px 6px" }}
        >
          Log Focusable
        </button>
      </div>
      {children}
    </div>
  );
}
