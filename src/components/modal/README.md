# Modal Components

This directory contains modal-related components organized by functionality.

## Structure

```
modal/
├── FormModal.tsx           # Main form modal component
├── FormModalHeader.tsx     # Modal header with title/subtitle
├── FormModalContent.tsx    # Form wrapper with focus management
├── FormModalActions.tsx    # Modal footer with action buttons
├── index.tsx              # Base Modal component
├── index.ts               # Barrel exports
└── README.md              # This documentation
```

## Components

### FormModal

Main form modal component that composes all sub-components.

```typescript
<FormModal
  isOpen={isOpen}
  onClose={onClose}
  title="Create New Item"
  subTitle="Fill out the form below"
  onSave={handleSave}
  saveLabel="Create"
  isLoading={isSubmitting}
>
  {/* Form content */}
</FormModal>
```

### FormModalHeader

Renders the modal title and optional subtitle.

```typescript
<FormModalHeader
  title="Edit Profile"
  subTitle="Update your personal information"
/>
```

### FormModalContent

Wraps form content with focus management and form submission handling.

```typescript
<FormModalContent isOpen={isOpen} onSubmit={handleSubmit}>
  {/* Form fields */}
</FormModalContent>
```

### FormModalActions

Renders action buttons (Cancel/Save) with loading states.

```typescript
<FormModalActions
  onClose={onClose}
  onSave={onSave}
  saveLabel="Update"
  isLoading={isLoading}
/>
```

## Features

- **Enhanced Focus Management**: Uses `useFormAutoFocus` hook for consistent, configurable focus behavior
- **Conditional Auto-Focus**: Only focuses first field for new records by default
- **Focus Trap Support**: Optional focus trapping for modal isolation
- **Scrollbar Compensation**: Prevents layout shift when modal opens
- **Loading States**: Built-in support for loading indicators
- **Form Submission**: Handles form submission and prevents double-submit
- **Keyboard Navigation**: ESC key closes modal, Tab navigation works properly
- **Composition**: Components can be used independently or together
- **Development Debugging**: Built-in focus debugging tools in development mode

## Usage Patterns

### Simple Form Modal

```typescript
<FormModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Add New Contact"
  onSave={handleCreateContact}
  isLoading={isCreating}
  isNewRecord={true} // Auto-focus enabled for new records
  enableAutoFocus={true}
>
  <ContactForm />
</FormModal>
```

### Edit Form Modal (No Auto-Focus)

```typescript
<FormModal
  isOpen={showEditModal}
  onClose={() => setShowEditModal(false)}
  title="Edit Contact"
  onSave={handleUpdateContact}
  isLoading={isUpdating}
  isNewRecord={false} // No auto-focus for editing
>
  <ContactForm contact={selectedContact} />
</FormModal>
```

### Custom Actions

```typescript
<FormModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Advanced Settings"
  showFooter={false}
>
  <AdvancedSettings />
  <FormModalActions
    onClose={() => setShowModal(false)}
    onSave={handleSave}
    saveLabel="Apply Settings"
  >
    <button onClick={handleReset}>Reset</button>
  </FormModalActions>
</FormModal>
```
