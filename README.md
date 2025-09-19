# twetools-ui

Shared UI component library for twetools applications with focus on modal components and focus management.

## Installation

```bash
npm install twetools-ui
```

## Usage

### Modal Components

```typescript
import {
  FormModal,
  FormModalHeader,
  FormModalContent,
  FormModalActions,
  Modal
} from 'twetools-ui';

// Simple modal
<Modal isOpen={isOpen} onClose={onClose}>
  <div>Modal content</div>
</Modal>

// Form modal with all components
<FormModal
  isOpen={isOpen}
  onClose={onClose}
  title="Create New Item"
  subTitle="Fill out the form below"
  onSave={handleSave}
  isLoading={isLoading}
  CancelButton={YourCancelButton}  // Provide your button components
  SaveButton={YourSaveButton}      // Provide your button components
>
  <div>Your form content here</div>
</FormModal>
```

### Focus Management Hooks

```typescript
import { useFormAutoFocus, useFocusNavigation } from "twetools-ui";

// Auto-focus first field in new records
function MyForm({ isNewRecord }) {
  const formRef = useRef<HTMLDivElement>(null);

  const { autoFocusFirstField } = useFormAutoFocus(formRef, {
    enabled: true,
    isNewRecord,
  });

  return <div ref={formRef}>{/* Your form fields */}</div>;
}

// Enhanced focus navigation
function MyComponent() {
  const { focusFirst, createFocusTrap } = useFocusNavigation();

  // Use focus utilities as needed
}
```

## Component Dependencies

The `FormModalActions` component requires you to provide button components:

```typescript
<FormModalActions
  onClose={handleClose}
  onSave={handleSave}
  CancelButton={YourCancelButtonComponent}
  SaveButton={YourSaveButtonComponent}
/>
```

## TypeScript Support

All components include full TypeScript definitions with exported interfaces:

- `ModalProps`
- `FormModalHeaderProps`
- `FormModalActionsProps`
- `UseFormAutoFocusOptions`
- `FocusNavigationOptions`

## Features

- ✅ Full TypeScript support
- ✅ Focus management and accessibility
- ✅ Modal components with form integration
- ✅ Keyboard navigation support
- ✅ Dark mode compatible styling
- ✅ Tree-shakeable exports
- ✅ React 18 compatible
