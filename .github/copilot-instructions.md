# 🤖 Copilot Pro Instructions for twetools-ui

## 🏗️ Component Library Development Framework

**REQUIRED**: Follow twetools-ui component library development standards:

- **Component Library Focus**: Create reusable, configurable UI components
- **Example-Driven Development**: Every component must have working examples
- **TypeScript First**: Strict type safety and prop interfaces
- **Standards Reference**: `src/components/` structure and patterns

## 🎯 Component Development Approach

**Component Architecture**:
✅ Base components with minimal props for flexibility
✅ Wrapper components for common use cases  
✅ Example implementations in `app/(examples)/`
✅ Consistent prop patterns and naming

**Quality Standards**:
✅ TypeScript interfaces for all props
✅ Accessibility (ARIA) compliance
✅ Dark mode support via Tailwind classes
✅ Responsive design patterns
✅ Performance optimization

## 📚 Standardized Prompts

Development workflow prompts:

- **[Component Creator](./prompts/create-component.prompt.md)** - 🌟 **PRIMARY** - New component development
- **[Example Builder](./prompts/build-examples.prompt.md)** - Component example creation
- **[Component Refactor](./prompts/refactor-component.prompt.md)** - Existing component improvements

## 🚨 Critical Guidelines

**COMPONENT LIBRARY FOCUS**: This is a UI component library - focus on:
- Reusable, configurable components
- Clean prop interfaces and TypeScript types
- Consistent styling patterns
- Comprehensive examples for usage

**NO APPLICATION LOGIC**: Avoid business-specific logic or data handling - keep components generic and reusable.

All prompt files are stored in `.github/prompts/`. Reference component examples for patterns and consistency.