import React from "react";

export interface FormModalActionsProps {
  onClose?: () => void;
  onSave?: () => void;
  saveLabel?: string;
  showClose?: boolean;
  showSave?: boolean;
  showSaveIcon?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
  // Button components to be provided by consuming projects
  CancelButton?: React.ComponentType<any>;
  SaveButton?: React.ComponentType<any>;
}

const FormModalActions: React.FC<FormModalActionsProps> = ({
  onClose,
  onSave,
  saveLabel = "Save Changes",
  showClose = true,
  showSave = true,
  showSaveIcon = true,
  children,
  isLoading = false,
  CancelButton,
  SaveButton,
}) => {
  return (
    <div className="mt-8 flex justify-between items-center">
      <div className="flex items-center">{children}</div>
      <div className="flex items-center space-x-3">
        {showClose && onClose && CancelButton && (
          <CancelButton onClick={onClose} />
        )}
        {showSave && onSave && SaveButton && (
          <SaveButton
            onClick={onSave}
            type="submit"
            loading={isLoading}
            showIcon={showSaveIcon}
            size="sm"
          >
            {saveLabel}
          </SaveButton>
        )}
      </div>
    </div>
  );
};

export default FormModalActions;
