# Contributing to ng-cn

Thank you for your interest in contributing to ng-cn! This guide will help you get started with developing and submitting contributions.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Angular 21+
- Familiarity with TypeScript and Angular

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tigayon-Innovations/angular-shadcn.git
   cd shadcn-angular
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📋 Code Standards

We follow strict TypeScript and Angular best practices to maintain code quality and consistency.

### TypeScript

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Always provide explicit return types for functions

### Angular Components

- **Always use standalone components** (no NgModules)
- Use `input()` and `output()` functions instead of `@Input` and `@Output` decorators
- Use `signal()`, `computed()`, and `effect()` for state management
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in all components
- Use the `host` object in `@Component` decorator instead of `@HostBinding` and `@HostListener`

### Templates

- Keep templates simple and avoid complex logic
- Use modern control flow: `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`, `*ngSwitch`)
- Use the async pipe to handle observables
- Use `class` and `style` bindings instead of `ngClass` and `ngStyle`

### Services

- Design services around a single responsibility
- Use `providedIn: 'root'` for singleton services
- Use the `inject()` function instead of constructor injection

### Styling

- Use Tailwind CSS v4 with the `@import "tailwindcss"` syntax
- Use the `cn()` utility function to merge class names
- Follow the theme variables defined in `ng-cn.scss`
- Ensure components support dark mode

## 🎨 Creating New Components

### Component Structure

1. **Create a component directory**
   ```bash
   mkdir -p src/app/lib/components/ui/my-component
   ```

2. **Create component files**
   ```
   my-component/
   ├── my-component.ts        # Main component
   ├── my-component.spec.ts   # Tests
   └── index.ts               # Exports
   ```

3. **Use the schematic (recommended)**
   ```bash
   ng g @ng-cn/core:c my-component
   ```

### Component Template

```typescript
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cn-my-component',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-block',
  },
  template: `<div>{{ label() }}</div>`,
})
export class MyComponentComponent {
  label = input<string>('Default');
  action = output<void>();

  onAction() {
    this.action.emit();
  }
}
```

### Documentation

Each component should include:
- Clear description of purpose
- List of inputs and outputs
- Usage examples
- Accessibility notes
- Related components

## ✅ Testing

### Unit Tests

- Write tests for all components using Vitest/Jasmine
- Test component inputs, outputs, and state changes
- Achieve at least 80% code coverage for new code

Example test:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponentComponent } from './my-component';

describe('MyComponentComponent', () => {
  let component: MyComponentComponent;
  let fixture: ComponentFixture<MyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponentComponent);
    component = fixture.componentInstance;
  });

  it('should render with default label', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Default');
  });

  it('should emit action event', () => {
    spyOn(component.action, 'emit');
    component.onAction();
    expect(component.action.emit).toHaveBeenCalled();
  });
});
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🔍 Code Review Process

### Before Submitting a PR

1. **Ensure code quality**
   ```bash
   npm run lint
   npm run build
   npm test
   ```

2. **Follow commit conventions**
   - Use clear, descriptive commit messages
   - Reference issues: `fix: #123`
   - Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

3. **Update documentation**
   - Update README.md if adding new components
   - Add/update component documentation in `docs/`
   - Update CHANGELOG if applicable

### Pull Request Guidelines

1. **Create a descriptive title**
   - ✅ `feat: add tooltip component with keyboard support`
   - ❌ `Update stuff`

2. **Write a detailed description**
   - Explain what changes were made and why
   - Link related issues: `Closes #123`
   - Include screenshots for UI changes

3. **Keep PRs focused**
   - One feature or fix per PR
   - Break large changes into multiple PRs

4. **Ensure tests pass**
   - All tests must pass before merging
   - Add tests for new functionality

## 🎯 Component Checklist

Before submitting a component PR:

- [ ] Component uses standalone API
- [ ] Component has `ChangeDetectionStrategy.OnPush`
- [ ] All inputs/outputs use `input()` and `output()` functions
- [ ] Component is fully typed (no `any`)
- [ ] Component includes proper ARIA attributes
- [ ] Tailwind v4 syntax is used (`@import "tailwindcss"`)
- [ ] Dark mode support is implemented
- [ ] Component has comprehensive tests
- [ ] Tests pass and coverage is ≥80%
- [ ] Documentation is updated
- [ ] No console warnings or errors
- [ ] Component works on mobile and desktop

## 🚀 Accessibility (a11y)

All components must be accessible:

- Use semantic HTML elements
- Include proper ARIA labels and roles
- Support keyboard navigation
- Ensure color contrast meets WCAG AA standards
- Test with screen readers
- Document accessibility features

Resources:
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## 🤖 MCP Integration

If adding new tools or components, update the MCP server:

```bash
npm run build:mcp
```

Update `mcp-server/components-data.ts` with new component metadata.

## 📚 Resources

- [Angular Documentation](https://angular.io)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com/) - Original component reference
- [Project Architecture](docs/ARCHITECTURE-DIAGRAMS.md)

## 🐛 Reporting Bugs

When reporting bugs:

1. Use a clear, descriptive title
2. Describe the exact steps to reproduce
3. Provide expected vs actual behavior
4. Include screenshots or videos
5. Mention your environment (OS, browser, Node version)

## 💡 Feature Requests

We're always open to new component ideas! Before proposing:

1. Check if a similar component exists
2. Describe the use case
3. Provide design mockups if possible
4. Discuss accessibility and responsive design

## 📞 Questions?

- Open an issue with the `question` label
- Check existing issues for similar questions
- Review the [documentation](https://shadcn-angular.tigayon.com/docs)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make ng-cn better! 🎉
