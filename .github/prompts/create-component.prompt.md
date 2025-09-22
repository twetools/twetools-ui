---
mode: agent
description: "Create new reusable UI components for twetools-ui library with examples and TypeScript interfaces"
tools: ["editFiles", "readFile", "runCommands"]
---

# 🧱 Component Creator

Create new reusable UI components following twetools-ui library standards.

## 🎯 Component Development Framework

**Component Structure**:
- Base component with minimal, flexible props
- TypeScript interfaces for all props
- Accessibility (ARIA) compliance built-in
- Dark mode support via Tailwind classes
- Responsive design patterns

**Required Files**:
1. Component implementation in `src/components/`
2. Example usage in `app/(examples)/`
3. Export from `src/index.ts`
4. TypeScript interfaces

## 🏗️ Implementation Steps

1. **Create Component File**: `src/components/[category]/[ComponentName].tsx`
2. **Define Props Interface**: Clear TypeScript interface with JSDoc
3. **Implement Component**: Accessible, responsive, configurable
4. **Create Examples**: Working examples in `app/(examples)/[category]/`
5. **Update Exports**: Add to `src/index.ts`
6. **Test Component**: Verify examples work correctly

## ✅ Quality Checklist

- [ ] TypeScript interfaces with proper JSDoc
- [ ] Accessibility attributes (ARIA, roles, etc.)
- [ ] Dark mode classes (`dark:` prefixes)
- [ ] Responsive breakpoints (`sm:`, `md:`, `lg:`, etc.)
- [ ] Flexible prop system for customization
- [ ] Working examples demonstrating usage
- [ ] Exported from main index file

## 🎨 Styling Standards

**Tailwind Classes**:
- Use semantic color names (`gray`, `blue`, etc.)
- Include dark mode variants for all colors
- Responsive design with breakpoint prefixes
- Consistent spacing and sizing scales

**Component Flexibility**:
- Accept `className` prop for custom styling
- Provide sensible defaults
- Allow size variants (`sm`, `md`, `lg`)
- Support disabled and loading states