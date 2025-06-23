# UI Guidelines Documentation

This document defines the design standards and component guidelines for the NexusAI platform.

## Design System Overview

Our design system ensures consistency, accessibility, and user-friendly interfaces across all platform components.

## Typography

### Font Family
- Primary: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI'
- Monospace: 'Fira Code', 'Monaco', 'Consolas', monospace

### Font Sizes
- **Heading 1**: 32px (2rem) - Page titles
- **Heading 2**: 28px (1.75rem) - Section headers
- **Heading 3**: 24px (1.5rem) - Subsection headers
- **Body Large**: 18px (1.125rem) - Important content
- **Body**: 16px (1rem) - Default text
- **Body Small**: 14px (0.875rem) - Secondary content
- **Caption**: 12px (0.75rem) - Labels, metadata

## Color Palette

### Primary Colors
- **Primary Blue**: #2563eb
- **Primary Blue Hover**: #1d4ed8
- **Primary Blue Light**: #dbeafe

### Neutral Colors
- **Text Primary**: #111827
- **Text Secondary**: #6b7280
- **Text Muted**: #9ca3af
- **Background**: #ffffff
- **Background Alt**: #f9fafb
- **Border**: #e5e7eb

### Semantic Colors
- **Success**: #10b981
- **Warning**: #f59e0b
- **Error**: #ef4444
- **Info**: #3b82f6

## Components

### Button Styles

#### Primary Button
```css
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}
```

#### Mobile Responsive Button (Fixed in NEX-123)
```css
@media (max-width: 480px) {
  .btn-primary {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
}
```

### Input Fields
```css
.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  background-color: #ffffff;
  transition: border-color 0.2s ease;
}

.input-field:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

## Layout Guidelines

### Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Accessibility

### WCAG 2.1 AA Compliance
- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- All interactive elements must be keyboard accessible
- Screen reader compatible semantic markup

### Focus States
All interactive elements must have visible focus indicators with high contrast.

## Implementation Notes

### Login Button Mobile Fix (NEX-123)
The login button alignment issue on mobile screens < 480px has been resolved by:
1. Adding `margin-left: auto` and `margin-right: auto`
2. Setting `display: block` for proper centering
3. Ensuring full-width behavior on mobile devices

## Related Documents
- `login_feature.md` - Specific implementation of login UI components 