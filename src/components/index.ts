// Component exports
export * from "./modal";
export * from "./forms";
export * from "./ui/button";

// Form Elements
export { default as BaseFormControl } from "./form-elements/form/BaseFormControl";
export { default as Form } from "./form-elements/form/Form";
export { default as FormField } from "./form-elements/form/FormField";
export { default as InputField } from "./form-elements/input/InputField";
export { default as TextareaField } from "./form-elements/input/TextareaField";
export { default as EmailField } from "./form-elements/input/EmailField";
export { default as PasswordField } from "./form-elements/input/PasswordField";
export { default as NameField } from "./form-elements/input/NameField";
export { default as NotesField } from "./form-elements/input/NotesField";
export { default as WebsiteField } from "./form-elements/input/WebsiteField";
export { default as CreditCardField } from "./form-elements/input/CreditCardField";
export { default as TimeField } from "./form-elements/input/TimeField";
export { default as Checkbox } from "./form-elements/input/Checkbox";
export { default as Radio } from "./form-elements/input/Radio";
export { default as RadioSm } from "./form-elements/input/RadioSm";
export { default as ToggleSwitch } from "./form-elements/input/ToggleSwitch";
export { default as FileInput } from "./form-elements/input/FileInput";
export { default as CopyInput } from "./form-elements/input/CopyInput";
export { default as Label } from "./form-elements/input/Label";
export { default as TextArea } from "./form-elements/input/TextArea";
export { default as TextareaBase } from "./form-elements/input/TextareaBase";

// Date Components
export { default as DateField } from "./form-elements/dates/DateField";
export { default as BirthDateField } from "./form-elements/dates/BirthDateField";
export { default as CreatedDateField } from "./form-elements/dates/CreatedDateField";
export { default as LastContactDateField } from "./form-elements/dates/LastContactDateField";
export { default as LastUpdatedDate } from "./form-elements/dates/LastUpdatedDate";
export { default as DatePicker } from "./form-elements/dates/DatePicker";

// Phone Components
export { default as PhoneField } from "./form-elements/phone/PhoneField";
export { default as MobilePhoneField } from "./form-elements/phone/MobilePhoneField";
export { default as HomePhoneField } from "./form-elements/phone/HomePhoneField";
export { default as WorkPhoneField } from "./form-elements/phone/WorkPhoneField";

// Select Components
export { default as Select } from "./form-elements/select/Select";
export { default as MultiSelect } from "./form-elements/select/MultiSelect";
export { default as CountrySelect } from "./form-elements/select/CountrySelect";
export { default as StateSelect } from "./form-elements/select/StateSelect";

// Dropzone Components
export { default as Dropzone } from "./form-elements/dropzone/Dropzone";

// Header Components
export { default as NotificationDropdown } from "./header/NotificationDropdown";
export { default as UserDropdown } from "./header/UserDropdown";

// Auth Components
export { default as RequireAuth } from "./auth/RequireAuth";
export { default as OtpForm } from "./auth/OtpForm";
export { default as ResetPasswordForm } from "./auth/ResetPasswordForm";
export { default as SignInForm } from "./auth/SignInForm";
export { default as SignUpForm } from "./auth/SignUpForm";
export { AuthProvider } from "../context/AuthContext";

// Form Components
export { default as BaseForm } from "./forms/BaseForm";

// Admin Components
export { default as NewUser } from "./forms/user/NewUser";

// Common Components
export { default as PageBreadcrumb } from "./common/PageBreadCrumb";

// Search Components
export { default as GlobalSearch } from "./search/GlobalSearch";
export type {
  SearchResult,
  SearchCategory,
  GlobalSearchProps,
} from "./search/GlobalSearch";

// UI Components - direct exports like buttons
export { default as AddButton } from "./ui/button/AddButton";
export { default as DataTable } from "./ui/tables/DataTable";
export type { DataTableColumn } from "./ui/tables/DataTable";
export { default as MenuActions } from "./ui/tables/MenuActions";
export { default as Badge } from "./ui/badge/Badge";
export { default as Tooltip } from "./ui/tooltip/Tooltip";

// Tab Components
export { default as Tab } from "./ui/tabs/Tab";
export { default as TabWithUnderline } from "./ui/tabs/TabWithUnderline";

// Common UI Components
export { default as ComponentCard } from "./common/ComponentCard";
export { default as GridShape } from "./common/GridShape";
export { default as CountdownTimer } from "./common/CountdownTimer";
export { default as ErrorBoundary } from "./common/ErrorBoundary";
export { default as GlobalErrorHandler } from "./common/GlobalErrorHandler";
export { ThemeToggleButton } from "./common/ThemeToggleButton";
export { default as ThemeTogglerTwo } from "./common/ThemeTogglerTwo";

// User Profile Components
export { default as UserInfoCard } from "./user-profile/UserInfoCard";
export { default as UserAddressCard } from "./user-profile/UserAddressCard";
export { default as UserMetaCard } from "./user-profile/UserMetaCard";
export { default as UserProfilePage } from "./pages/UserProfilePage";
export type { 
  UserProfileData, 
  UserProfileHandlers, 
  UserProfileConfig 
} from "./pages/UserProfilePage";

// Layout Components
export { default as BaseAppSidebar } from "./layout/BaseAppSidebar";
export { default as AppSidebar } from "./layout/AppSidebar";
export { default as AppHeader } from "./layout/AppHeader";
export { default as AppLayout } from "./layout/AppLayout";
export { default as AppRootLayout } from "./layout/AppRootLayout";
export { default as Backdrop } from "./layout/Backdrop";
export { default as SidebarWidget } from "./layout/SidebarWidget";
export { default as ThemeScript } from "./common/ThemeScript";
export type {
  NavItem,
  NavSection,
  SubNavItem,
  AppSidebarConfig,
} from "../types/navigation";

// Context Providers
export { ErrorProvider, useError } from "../context/ErrorContext";
export { DevModeProvider, useDevMode } from "../context/DevModeContext";
export { ThemeProvider, useTheme } from "../context/ThemeContext";
export { SidebarProvider, useSidebar } from "../context/SidebarContext";
export { default as DevModeToggle } from "../context/DevModeToggle";
export { Providers } from "../providers/providers";

// Hooks
export { default as useFormAutoFocus } from "../hooks/useFormAutoFocus";
export { useFocusNavigation } from "../hooks/useFocusNavigation";
export { useSmartForm } from "../hooks/useSmartForm";
export { useErrorHandler } from "../hooks/useErrorHandler";
export { useDebounce } from "../hooks/useDebounce";
export { default as useGoBack } from "../hooks/useGoBack";
export { useModal } from "../hooks/useModal";

// Hook Types
export type { UseFormAutoFocusOptions } from "../hooks/useFormAutoFocus";
export type { FocusNavigationOptions } from "../hooks/useFocusNavigation";
export type {
  UseSmartFormOptions,
  UseSmartFormReturn,
} from "../hooks/useSmartForm";
