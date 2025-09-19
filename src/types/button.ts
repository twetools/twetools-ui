// Button interfaces for external dependency injection
// Projects using twetools-ui must provide these button components

export interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md";
  variant?: "primary" | "outline" | "ghost" | "success";
  startIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export interface CancelButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  showIcon?: boolean;
  size?: "sm" | "md";
  variant?: "outline" | "ghost";
  disabled?: boolean;
}

export interface SaveButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  showIcon?: boolean;
  size?: "sm" | "md";
  variant?: "primary" | "success";
  loading?: boolean;
  disabled?: boolean;
}
