"use client";

import React, { useEffect, useRef } from "react";
import useFormAutoFocus from "@/hooks/useFormAutoFocus";

interface FormModalContentProps {
  children: React.ReactNode;
  isOpen: boolean;
  onSubmit: (e: React.FormEvent) => void;
  isNewRecord?: boolean;
  enableAutoFocus?: boolean;
}

const FormModalContent: React.FC<FormModalContentProps> = ({
  children,
  isOpen,
  onSubmit,
  isNewRecord = true, // Default to true for modals (usually creating new records)
  enableAutoFocus = true,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  // Use standardized focus management hook
  useFormAutoFocus(formRef as React.RefObject<HTMLElement>, {
    enabled: enableAutoFocus && isOpen,
    isNewRecord,
    delay: 150, // Slightly longer delay for modal animations
  });

  useEffect(() => {
    if (isOpen) {
      // Compensate for scrollbar width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.marginRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.marginRight = ""; // Reset margin
    }

    return () => {
      document.body.style.marginRight = ""; // Clean up on unmount
    };
  }, [isOpen]);

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormModalContent;
