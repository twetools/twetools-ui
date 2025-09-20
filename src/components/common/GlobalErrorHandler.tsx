"use client";
import React from "react";
import { useError } from "../../context/ErrorContext";
import ModalAlertDanger from "@/components/modal/ModalAlertDanger";
import ModalAlertWarning from "@/components/modal/ModalAlertWarning";
import ModalAlertInfo from "@/components/modal/ModalAlertInfo";

export default function GlobalErrorHandler() {
  const { error, clearError } = useError();

  if (!error) {
    return null;
  }

  // Use appropriate modal component based on error variant
  switch (error.variant) {
    case "danger":
      return (
        <ModalAlertDanger
          isOpen={true}
          onClose={clearError}
          title={error.title}
          message={error.message}
        />
      );
    case "warning":
      return (
        <ModalAlertWarning
          isOpen={true}
          onClose={clearError}
          title={error.title}
          message={error.message}
        />
      );
    case "info":
      return (
        <ModalAlertInfo
          isOpen={true}
          onClose={clearError}
          title={error.title}
          message={error.message}
        />
      );
    default:
      // Default to danger for unknown variants
      return (
        <ModalAlertDanger
          isOpen={true}
          onClose={clearError}
          title={error.title}
          message={error.message}
        />
      );
  }
}
