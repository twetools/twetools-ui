import React, { useEffect, useId } from "react";
import Button from "./Button";
import { IconPlus as PlusIcon } from "@tabler/icons-react";

interface AddButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
  variant?: "primary" | "success";
  showIcon?: boolean;
  loading?: boolean;
  disabled?: boolean;
  enableHotkey?: boolean; // Enable Ctrl+A hotkey (default: true)
}

const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  children = "Add",
  className = "",
  size = "sm",
  variant = "primary",
  showIcon = true,
  loading = false,
  disabled = false,
  enableHotkey = true,
}) => {
  // Generate a stable unique identifier for SSR compatibility
  const reactId = useId();
  const buttonId = `add-button-${reactId}`;

  useEffect(() => {
    if (!enableHotkey) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+A (or Cmd+A on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
        // Only trigger if this button is enabled and not loading
        if (!disabled && !loading) {
          // Find the button element using the unique ID
          const buttonElement = document.getElementById(buttonId);
          if (buttonElement) {
            // Check if the button is visible and not hidden
            const isVisible =
              buttonElement.offsetParent !== null &&
              window.getComputedStyle(buttonElement).visibility !== "hidden" &&
              window.getComputedStyle(buttonElement).display !== "none";

            if (isVisible) {
              event.preventDefault(); // Prevent browser's default "select all" behavior
              onClick();
            }
          }
        }
      }
    };

    // Add event listener to document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClick, disabled, loading, enableHotkey]);

  return (
    <Button
      id={buttonId}
      size={size}
      variant={variant}
      onClick={onClick}
      startIcon={showIcon && !loading ? <PlusIcon /> : undefined}
      className={className}
      type="button"
      loading={loading}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default AddButton;
