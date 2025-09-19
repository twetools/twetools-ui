"use client";
import React from "react";

import { Modal } from "./Modal";
import FormModalActions from "./FormModalActions";
import FormModalContent from "./FormModalContent";
import FormModalHeader from "./FormModalHeader";

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  onSave?: () => void;
  saveLabel?: string;
  showFooter?: boolean;
  className?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  additionalActions?: React.ReactNode;
  isNewRecord?: boolean;
  enableAutoFocus?: boolean;
  // Button components to be provided by consuming projects
  CancelButton?: React.ComponentType<any>;
  SaveButton?: React.ComponentType<any>;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  subTitle,
  children,
  onSave,
  saveLabel = "Save Changes",
  showFooter = true,
  className = "",
  isLoading = false,
  icon,
  additionalActions,
  isNewRecord = true,
  enableAutoFocus = true,
  CancelButton,
  SaveButton,
}) => {
  // Prevent double submit
  const handleSave = () => {
    if (!isLoading) {
      onSave?.();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={className || "max-w-[584px] p-5 lg:p-10"}
    >
      <FormModalHeader title={title} subTitle={subTitle} icon={icon} />
      <FormModalContent
        isOpen={isOpen}
        onSubmit={handleSubmit}
        isNewRecord={isNewRecord}
        enableAutoFocus={enableAutoFocus}
      >
        {children}
        {showFooter && (
          <FormModalActions
            onClose={onClose}
            onSave={handleSave}
            saveLabel={saveLabel}
            isLoading={isLoading}
            CancelButton={CancelButton}
            SaveButton={SaveButton}
          >
            {additionalActions}
          </FormModalActions>
        )}
      </FormModalContent>
    </Modal>
  );
};

export default FormModal;
