# UI Guidelines

This document outlines the design standards and guidelines for the NexusAI platform interface.

## Design Principles

1. **Consistency**: Maintain uniform patterns across all components
2. **Accessibility**: Ensure usability for all users including those with disabilities
3. **Responsiveness**: Adapt seamlessly to different screen sizes and devices
4. **Performance**: Optimize for fast loading and smooth interactions

## Color Palette

### Primary Colors
- **Primary Blue**: #007bff (Brand color for primary actions)
- **Secondary Gray**: #6c757d (Supporting text and secondary actions)
- **Success Green**: #28a745 (Success states and confirmations)
- **Warning Orange**: #ffc107 (Warnings and alerts)
- **Danger Red**: #dc3545 (Errors and destructive actions)

### Neutral Colors
- **Dark**: #343a40 (Primary text)
- **Light**: #f8f9fa (Background)
- **White**: #ffffff (Card backgrounds)

## Typography

### Font Family
- Primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
- Monospace: 'Fira Code', 'Courier New', monospace

### Font Sizes
- **Heading 1**: 2.5rem (40px)
- **Heading 2**: 2rem (32px)
- **Heading 3**: 1.75rem (28px)
- **Body Large**: 1.125rem (18px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)

## Button Styles

### Primary Button
```css
.btn-primary {
  background-color: #007bff;
  border: 1px solid #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
```

### Mobile Button Adjustments
- Minimum height: 44px (touch target)
- Padding: 12px 16px
- Font-size: 16px (prevents zoom on iOS)

## Spacing System

Based on 8px grid system:
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

## Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Component Guidelines

### Login Button (NEX-123 Reference)
- Desktop: Standard width with left alignment
- Mobile: Full width (90% with max-width 300px) and center alignment
- Height: 48px minimum for touch accessibility
- Border-radius: 4px for consistency

### Form Elements
- Input height: 40px minimum
- Label positioning: Above input field
- Error messages: Below input with red color
- Focus states: Blue border with box-shadow

## Accessibility Standards

- WCAG 2.1 AA compliance
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators clearly visible

## Related Issues

- **NEX-123**: Mobile login button alignment fixed
- Focus on responsive design improvements ongoing 