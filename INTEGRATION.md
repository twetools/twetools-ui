# Integration Example

## How to use twetools-ui in your twetool-frontend project

### 1. Install the library

```bash
npm install file:../twetools-ui
# or when published: npm install twetools-ui
```

### 2. Replace existing modal imports

**Before (using local components):**

```typescript
import FormModal from "@/components/ui/modal/FormModal";
import { Modal } from "@/components/ui/modal";
```

**After (using twetools-ui):**

```typescript
import { FormModal, Modal } from "twetools-ui";
import CancelButton from "@/components/ui/button/CancelButton";
import SaveButton from "@/components/ui/button/SaveButton";
```

### 3. Update component usage

**Before:**

```tsx
<FormModal
  isOpen={isOpen}
  onClose={onClose}
  title="Create Contact"
  onSave={handleSave}
  isLoading={isLoading}
>
  <div>Form content</div>
</FormModal>
```

**After:**

```tsx
<FormModal
  isOpen={isOpen}
  onClose={onClose}
  title="Create Contact"
  onSave={handleSave}
  isLoading={isLoading}
  CancelButton={CancelButton} // Inject your button components
  SaveButton={SaveButton} // Inject your button components
>
  <div>Form content</div>
</FormModal>
```

### 4. Focus management hooks remain the same

```typescript
import { useFormAutoFocus, useFocusNavigation } from "twetools-ui";

// Usage stays identical to before
const { autoFocusFirstField } = useFormAutoFocus(formRef, {
  enabled: true,
  isNewRecord: !contact?.id,
});
```

### 5. Benefits

- ✅ **Single source of truth**: Modal components maintained in one place
- ✅ **Shared across projects**: Use in multiple twetools applications
- ✅ **Type safety**: Full TypeScript support with exported interfaces
- ✅ **Dependency injection**: Your project provides button components
- ✅ **Drop-in replacement**: Minimal code changes required
- ✅ **Version control**: Updates to modals automatically available to all projects

### 6. Complete Example

```tsx
import React, { useState } from "react";
import { FormModal } from "twetools-ui";
import CancelButton from "@/components/ui/button/CancelButton";
import SaveButton from "@/components/ui/button/SaveButton";

function CreateContactModal({ isOpen, onClose, onSave }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Contact"
      subTitle="Enter contact information below"
      onSave={handleSave}
      isLoading={isLoading}
      isNewRecord={true}
      CancelButton={CancelButton}
      SaveButton={SaveButton}
    >
      {/* Your form content here */}
      <ContactFormFields />
    </FormModal>
  );
}
```
