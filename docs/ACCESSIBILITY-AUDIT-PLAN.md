# 🔍 Accessibility & Behavior Audit Plan for shadcn-angular (57 Components)

> **Goal:** Bring all 57 components to Radix UI-level accessibility standards with proper ARIA, keyboard navigation, focus management, and behavior.

---

## 📊 Executive Summary

After scanning all 57 components, I've identified **significant accessibility gaps** across the library. While some components have basic ARIA attributes, most lack:

- ❌ **Focus Trapping** in modals/overlays
- ❌ **Complete Keyboard Navigation** (Arrow key navigation in lists/menus)
- ❌ **Focus Restoration** when overlays close
- ❌ **Screen Reader Announcements** (live regions)
- ⚠️ **Inconsistent State Handling**
- ⚠️ **Missing ARIA Relationships** (labelledby, describedby, controls)

---

## 🎯 Priority Matrix

### 🔴 P0 - Critical (Overlays & Modals)
| Component | Focus Trap | Escape Key | Focus Restore | Screen Reader | Keyboard Nav |
|-----------|------------|------------|---------------|---------------|--------------|
| Dialog | ❌ Missing | ✅ Has | ❌ Missing | ⚠️ Partial | ⚠️ Partial |
| AlertDialog | ❌ Missing | ❌ Missing | ❌ Missing | ⚠️ Partial | ⚠️ Partial |
| Sheet | ❌ Missing | ✅ Has | ❌ Missing | ⚠️ Partial | ⚠️ Partial |
| Drawer | ❌ Missing | ✅ Has | ❌ Missing | ⚠️ Partial | ❌ Missing |
| DropdownMenu | ❌ Missing | ✅ Has | ❌ Missing | ⚠️ Partial | ❌ Missing |
| ContextMenu | ❌ Missing | ❌ Missing | ❌ Missing | ⚠️ Partial | ❌ Missing |
| Select | ❌ Missing | ✅ Has | ❌ Missing | ⚠️ Partial | ❌ Missing |
| Combobox | ❌ Missing | ❌ Needs Check | ❌ Missing | ⚠️ Partial | ❌ Missing |
| Command | ❌ Missing | ❌ Missing | ❌ Missing | ⚠️ Partial | ❌ Missing |
| Popover | ❌ Missing | ✅ Has | ❌ Missing | ⚠️ Partial | ❌ Missing |

### 🟠 P1 - High Priority (Navigation & Selection)
| Component | ARIA Roles | Keyboard Nav | State Management | Roving Tabindex |
|-----------|------------|--------------|------------------|-----------------|
| Tabs | ⚠️ Partial | ⚠️ Partial (missing arrows) | ✅ Good | ❌ Missing |
| Accordion | ⚠️ Partial | ⚠️ Partial (missing arrows) | ✅ Good | ❌ Missing |
| Menubar | ⚠️ Has role | ❌ Missing arrow nav | ⚠️ Partial | ❌ Missing |
| NavigationMenu | ⚠️ Partial | ❌ Missing | ⚠️ Partial | ❌ Missing |
| RadioGroup | ✅ Has | ⚠️ Partial | ✅ Good | ❌ Missing |
| ToggleGroup | ⚠️ Has role | ❌ Missing arrow nav | ✅ Good | ❌ Missing |
| Pagination | ❌ Missing | ❌ Missing | ⚠️ Partial | ❌ Missing |

### 🟡 P2 - Medium Priority (Form Controls)
| Component | ARIA Attrs | Keyboard | Form Integration | Labels |
|-----------|------------|----------|------------------|--------|
| Checkbox | ✅ Good | ✅ Good | ⚠️ Needs ControlValueAccessor | ⚠️ Manual |
| Switch | ✅ Good | ✅ Good | ⚠️ Needs ControlValueAccessor | ⚠️ Manual |
| Slider | ✅ Good | ✅ Good | ⚠️ Needs ControlValueAccessor | ❌ Missing aria-label |
| Toggle | ✅ Good | ⚠️ Missing focus ring | ⚠️ Partial | ⚠️ Manual |
| Input | ⚠️ Partial | ✅ Native | ✅ Native | ⚠️ Manual |
| Textarea | ⚠️ Partial | ✅ Native | ✅ Native | ⚠️ Manual |
| InputOTP | ⚠️ Partial | ⚠️ Partial | ⚠️ Partial | ❌ Missing |
| DatePicker | ❓ Needs Audit | ❓ Needs Audit | ❓ Needs Audit | ❓ Needs Audit |
| Calendar | ❓ Needs Audit | ❓ Needs Audit | ❓ Needs Audit | ❓ Needs Audit |

### 🟢 P3 - Lower Priority (Display & Layout)
| Component | ARIA Attrs | Semantic HTML | Screen Reader |
|-----------|------------|---------------|---------------|
| Card | ⚠️ None | ⚠️ None | ⚠️ None needed |
| Alert | ✅ Has role | ⚠️ Partial | ⚠️ Missing live region |
| Badge | ⚠️ None | ✅ Good | ⚠️ None needed |
| Avatar | ⚠️ None | ⚠️ Needs alt | ⚠️ Partial |
| Progress | ✅ Good | ✅ Good | ⚠️ Missing live |
| Skeleton | ⚠️ None | ❌ Missing aria-busy | ⚠️ Missing |
| Toast | ⚠️ Partial | ⚠️ Partial | ❌ Missing live region |
| Tooltip | ⚠️ Partial | ⚠️ Missing describedby | ⚠️ Partial |
| HoverCard | ⚠️ Partial | ⚠️ Partial | ⚠️ Partial |
| Separator | ✅ Good | ✅ Good | ✅ Good |
| Carousel | ⚠️ Partial | ⚠️ Missing aria-live | ⚠️ Missing |
| Breadcrumb | ⚠️ Partial | ⚠️ Needs nav+aria-label | ⚠️ Partial |
| Table | ⚠️ Partial | ⚠️ Partial | ⚠️ Partial |
| ScrollArea | ⚠️ None | ✅ Good | ✅ Native |

---

## 📋 Detailed Component Audit

### 🔴 P0 CRITICAL: Overlays & Modals

---

#### 1. Dialog

**Current State:**
```typescript
// ✅ Has role="dialog" and aria-modal="true"
// ✅ Has escape key handler
// ❌ NO focus trapping
// ❌ NO focus restoration
// ❌ NO aria-labelledby/describedby linking
```

**Issues Found:**
1. No focus trap - Tab key escapes dialog
2. No focus restoration when closed
3. No aria-labelledby pointing to DialogTitle
4. No aria-describedby pointing to DialogDescription
5. No initial focus management (should focus first focusable or content)
6. Close button missing aria-label

**Radix Reference:**
- Focus trapped using `@radix-ui/react-focus-scope`
- Auto-focuses first focusable element
- Returns focus to trigger on close
- Proper ARIA relationships

**Required Changes:**
```typescript
// NEEDS:
- FocusTrapDirective or Angular CDK FocusTrap
- Focus restoration service
- Auto ID generation for ARIA relationships
- aria-labelledby={titleId}
- aria-describedby={descriptionId}
- Initial focus management
```

---

#### 2. AlertDialog

**Current State:**
```typescript
// ✅ Has role="alertdialog" and aria-modal="true"
// ❌ NO escape key handler (critical for alertdialog!)
// ❌ NO focus trapping
// ❌ NO focus restoration
// ❌ NO close button (by design, but needs action buttons)
```

**Issues Found:**
1. **CRITICAL**: AlertDialog should NOT close on Escape (different from Dialog!)
2. **CRITICAL**: AlertDialog should NOT close on overlay click
3. No focus trap
4. No focus restoration
5. Action/Cancel buttons need proper focus management
6. Missing aria-labelledby/describedby

**Radix Reference:**
- Does NOT close on Escape (requires explicit action)
- Does NOT close on overlay click
- Focus trapped, starts on Cancel button by default
- Must click action or cancel to close

**Required Changes:**
```typescript
// AlertDialog MUST NOT close on Escape or overlay click
// Focus should start on AlertDialogCancel (safe action)
// Must complete action to close
```

---

#### 3. Sheet

**Current State:**
```typescript
// ✅ Has role="dialog"
// ✅ Has escape key handler
// ❌ NO focus trapping
// ❌ NO focus restoration
// ❌ NO aria-labelledby/describedby
```

**Issues Found:**
1. Same issues as Dialog
2. Side variants (top/bottom/left/right) work correctly
3. Animation states handled correctly

---

#### 4. Drawer

**Current State:**
```typescript
// ✅ Has role="dialog"
// ✅ Has escape key handler
// ❌ NO focus trapping
// ❌ NO focus restoration
// ⚠️ Missing aria-modal="true"
```

**Issues Found:**
1. Missing aria-modal="true"
2. No focus management
3. Same overlay issues

---

#### 5. DropdownMenu

**Current State:**
```typescript
// ✅ Has role="menu" on content
// ✅ Has role="menuitem" on items
// ✅ Has escape key handler
// ✅ Has aria-expanded on trigger
// ❌ NO keyboard navigation (arrow keys)
// ❌ NO focus management
// ❌ NO roving tabindex
// ❌ NO typeahead search
```

**Issues Found:**
1. **CRITICAL**: No arrow key navigation through menu items
2. No Home/End key support
3. No typeahead (type "S" to jump to "Settings")
4. No roving tabindex pattern
5. Menu doesn't trap focus
6. Submenus not accessible

**Radix Reference:**
- Arrow keys navigate items
- Home/End jump to first/last
- Typeahead search
- Roving tabindex
- Submenu keyboard support

**Required Changes:**
```typescript
// Need:
- Arrow Down/Up navigation
- Home/End support
- Typeahead search
- Roving tabindex (only focused item is tabbable)
- Focus first item on open
- Focus trap within menu
```

---

#### 6. ContextMenu

**Current State:**
```typescript
// ⚠️ Basic structure only
// ❌ NO escape key handler
// ❌ NO keyboard navigation
// ❌ Same issues as DropdownMenu
```

**Issues Found:**
1. All DropdownMenu issues apply
2. No escape key handling
3. No keyboard trigger (Shift+F10 convention)

---

#### 7. Select

**Current State:**
```typescript
// ✅ Has role="listbox" on content
// ✅ Has escape key handler
// ❌ NO keyboard navigation
// ❌ NO typeahead
// ❌ NO roving tabindex
// ❌ NO focus management
```

**Issues Found:**
1. No arrow key navigation through options
2. No typeahead search
3. No keyboard selection (Enter)
4. Trigger missing proper ARIA (combobox pattern)

**Required Changes:**
```typescript
// Trigger needs:
- role="combobox"
- aria-controls={listboxId}
- aria-activedescendant={selectedOptionId}

// Content needs:
- aria-labelledby={triggerId}

// Items need:
- role="option"
- aria-selected
- unique IDs
```

---

#### 8. Popover

**Current State:**
```typescript
// ✅ Has role="dialog"
// ✅ Has escape key handler
// ❌ NO focus trapping
// ❌ NO focus restoration
```

**Issues Found:**
1. Same as Dialog minus the modal requirements
2. Popover may not need focus trap (depends on content)
3. Should still restore focus

---

#### 9. Command (Command Palette)

**Current State:**
```typescript
// ⚠️ Basic structure only
// ❌ NO keyboard navigation
// ❌ NO search/filter feedback
// ❌ NO ARIA live regions for results
```

**Issues Found:**
1. No arrow key navigation
2. No screen reader feedback for filtered results
3. No aria-activedescendant pattern
4. Missing combobox pattern for search

---

### 🟠 P1 HIGH: Navigation & Selection

---

#### 10. Tabs

**Current State:**
```typescript
// ✅ Has role="tab" on triggers
// ✅ Has aria-selected
// ✅ Has tabindex management
// ⚠️ PARTIAL keyboard support (Enter/Space only)
// ❌ NO arrow key navigation
// ❌ NO Home/End support
// ❌ NO automatic/manual activation modes
```

**Issues Found:**
1. Missing Left/Right arrow navigation
2. Missing Home/End support
3. TabsList missing role="tablist"
4. TabsContent missing role="tabpanel"
5. No aria-labelledby on tabpanel
6. No aria-controls on tab

**Radix Reference:**
- Arrow Left/Right navigate tabs
- Home/End go to first/last
- `activationMode` prop for auto vs manual
- Proper ARIA relationships

**Required Changes:**
```typescript
// TabsList needs:
- role="tablist"
- aria-orientation

// TabsTrigger needs:
- aria-controls={panelId}
- Arrow key handlers

// TabsContent needs:
- role="tabpanel"
- aria-labelledby={tabId}
- tabindex="0" (for focus)
```

---

#### 11. Accordion

**Current State:**
```typescript
// ✅ Has aria-expanded on trigger
// ✅ Has data-state
// ✅ Has Enter/Space handlers
// ⚠️ Has role="button" on trigger
// ❌ NO arrow key navigation
// ❌ NO Home/End support
// ❌ Missing ARIA relationships
```

**Issues Found:**
1. Missing Up/Down arrow navigation
2. Missing Home/End
3. AccordionContent needs role="region"
4. AccordionContent needs aria-labelledby
5. Trigger needs aria-controls
6. Item needs heading structure (h3, etc.)

**Radix Reference:**
- Arrow Up/Down navigate items
- Home/End go to first/last
- Proper heading hierarchy

**Required Changes:**
```typescript
// AccordionTrigger needs:
- aria-controls={contentId}
- Arrow Up/Down handlers

// AccordionContent needs:
- role="region"
- aria-labelledby={triggerId}
- ID for aria-controls reference
```

---

#### 12. RadioGroup

**Current State:**
```typescript
// ✅ Has role="radiogroup"
// ✅ Has role="radio" on items
// ✅ Has aria-checked
// ✅ Has Enter/Space handlers
// ❌ NO arrow key navigation
// ❌ NO roving tabindex
```

**Issues Found:**
1. Missing arrow key navigation (standard for radio groups)
2. All items are tabbable (should use roving tabindex)
3. Missing aria-orientation

**Required Changes:**
```typescript
// RadioGroup needs:
- Arrow Up/Down/Left/Right navigation
- Roving tabindex (only selected is tabbable)
- Wrap around behavior
```

---

#### 13. Menubar

**Current State:**
```typescript
// ✅ Has role="menubar"
// ❌ NO keyboard navigation
// ❌ NO submenu management
```

**Issues Found:**
1. No Left/Right navigation between menus
2. No Down to open menu
3. No keyboard submenu support

---

#### 14. ToggleGroup

**Current State:**
```typescript
// ✅ Has role="group"
// ❌ NO keyboard navigation
// ❌ NO roving tabindex
```

**Issues Found:**
1. Should follow toolbar pattern for keyboard nav
2. Missing arrow key navigation
3. All items tabbable (should use roving)

---

### 🟡 P2 MEDIUM: Form Controls

---

#### 15. Checkbox

**Current State:**
```typescript
// ✅ Has role="checkbox"
// ✅ Has aria-checked
// ✅ Has aria-disabled
// ✅ Has keyboard (Space/Enter)
// ✅ Has proper tabindex
// ⚠️ No ControlValueAccessor (no ngModel/formControl)
```

**Issues Found:**
1. No Angular forms integration (ControlValueAccessor)
2. Indeterminate state not fully accessible
3. Missing aria-label support (for icon-only)

---

#### 16. Switch

**Current State:**
```typescript
// ✅ Has role="switch"
// ✅ Has aria-checked
// ✅ Good keyboard support
// ⚠️ No ControlValueAccessor
```

**Issues Found:**
1. No Angular forms integration
2. Missing aria-label support

---

#### 17. Slider

**Current State:**
```typescript
// ✅ Has role="slider"
// ✅ Has aria-valuemin/max/now
// ✅ Good keyboard (arrows, Page, Home/End)
// ⚠️ No ControlValueAccessor
// ❌ Missing aria-label
// ❌ Missing aria-valuetext for custom labels
```

**Issues Found:**
1. No aria-label or aria-labelledby
2. No aria-valuetext for formatted values (e.g., "50%")
3. No forms integration

---

#### 18. Toggle

**Current State:**
```typescript
// ✅ Has aria-pressed
// ✅ Has data-state
// ⚠️ Missing focus visible styles consistently
```

**Issues Found:**
1. Focus ring styles may be inconsistent
2. Should announce state change

---

#### 19. InputOTP

**Current State:**
```typescript
// ⚠️ Hidden input approach (good)
// ⚠️ Partial keyboard support
// ❌ Missing aria-label
// ❌ Missing error state ARIA
```

**Issues Found:**
1. Missing aria-label for the group
2. Missing aria-invalid for error states
3. Paste handling needs verification

---

### 🟢 P3 LOWER: Display & Feedback

---

#### 20. Toast

**Current State:**
```typescript
// ⚠️ No aria-live region
// ❌ Screen readers won't announce toasts
```

**Issues Found:**
1. **CRITICAL for a11y**: No aria-live="polite" on container
2. Toasts should be in a live region to announce
3. Swipe-to-dismiss needs keyboard alternative

**Required Changes:**
```typescript
// Toaster container needs:
- role="region"
- aria-label="Notifications"
- aria-live="polite"
- aria-relevant="additions"
```

---

#### 21. Tooltip

**Current State:**
```typescript
// ⚠️ Shows on hover only
// ❌ Missing aria-describedby link
// ❌ No keyboard trigger (focus)
```

**Issues Found:**
1. Should also show on focus
2. Trigger needs aria-describedby pointing to tooltip
3. Tooltip content needs ID

---

#### 22. Progress

**Current State:**
```typescript
// ✅ Has role="progressbar"
// ✅ Has aria-valuemin/max/now
// ⚠️ Missing aria-label
// ⚠️ Missing aria-live for updates
```

---

#### 23. Skeleton

**Current State:**
```typescript
// ❌ Missing aria-busy="true"
// ❌ Missing aria-hidden consideration
```

---

#### 24. Alert

**Current State:**
```typescript
// ✅ Has role="alert"
// ⚠️ May want aria-live="assertive" for dynamic alerts
```

---

#### 25. Carousel

**Current State:**
```typescript
// ✅ Has role="region" and aria-roledescription
// ✅ Has basic keyboard (arrows)
// ❌ Missing aria-live for slide changes
// ❌ Missing slide indicators ARIA
```

---

#### 26. Breadcrumb

**Current State:**
```typescript
// ⚠️ Missing nav wrapper
// ❌ Missing aria-label="Breadcrumb"
// ❌ Current page missing aria-current="page"
```

---

---

## 🛠️ Implementation Phases

### Phase 0: Foundation — Accessibility Primitives (Week 1-2)

> **Goal:** Build reusable accessibility infrastructure that all components will leverage.

**Create shared accessibility utilities:**

```typescript
// src/app/lib/primitives/accessibility/

1. focus-trap.directive.ts
   - Trap focus within container
   - Handle Tab/Shift+Tab cycling
   - Support for initial focus element
   - Support for final focus restoration

2. focus-management.service.ts
   - Save/restore focus state
   - Track focus history
   - Handle focus on open/close

3. keyboard-navigation.directive.ts
   - Roving tabindex pattern
   - Arrow key navigation
   - Home/End support
   - Typeahead search

4. aria-id.service.ts
   - Auto-generate unique IDs
   - Link aria-labelledby/describedby
   - Manage ARIA relationships

5. live-region.directive.ts
   - Create aria-live regions
   - Queue announcements
   - Handle priority (polite vs assertive)
```

---

### Phase 1: P0 Critical — Overlays & Modals (Week 2-3)

> **Goal:** Fix all overlay components that trap user interaction.

1. **Dialog/Sheet/Drawer**
   - Add focus trap
   - Add focus restoration
   - Add ARIA relationships
   - Add initial focus management

2. **AlertDialog**
   - REMOVE escape close behavior
   - REMOVE overlay click close
   - Add focus trap starting on cancel
   - Add ARIA relationships

3. **DropdownMenu/ContextMenu**
   - Add arrow key navigation
   - Add roving tabindex
   - Add typeahead
   - Add focus management

4. **Select/Combobox**
   - Fix combobox pattern
   - Add keyboard navigation
   - Add typeahead
   - Add ARIA relationships

5. **Popover**
   - Add optional focus trap
   - Add focus restoration

---

### Phase 2: P1 High — Navigation & Selection (Week 3-4)

> **Goal:** Fix all navigation and selection patterns with proper keyboard support.

1. **Tabs**
   - Add arrow navigation
   - Fix ARIA roles and relationships
   - Add roving tabindex

2. **Accordion**
   - Add arrow navigation
   - Fix ARIA relationships
   - Add heading structure

3. **RadioGroup**
   - Add arrow navigation
   - Add roving tabindex

4. **Menubar/NavigationMenu**
   - Add complete keyboard support
   - Add submenu management

5. **ToggleGroup**
   - Add arrow navigation
   - Add roving tabindex

---

### Phase 3: P2 Medium — Form Controls (Week 4-5)

> **Goal:** Ensure all form controls have proper Angular forms integration and labeling.

1. **Form Controls** (Checkbox, Switch, Slider)
   - Add ControlValueAccessor
   - Add proper labeling support
   - Add aria-valuetext where needed

2. **InputOTP**
   - Fix ARIA labels
   - Add error state support

3. **Calendar/DatePicker**
   - Full keyboard navigation
   - Proper ARIA grid pattern

---

### Phase 4: P3 Lower — Display & Feedback (Week 5-6)

> **Goal:** Polish display components with proper screen reader support.

1. **Toast** - Add live region
2. **Tooltip** - Add describedby link
3. **Progress** - Add live updates
4. **Skeleton** - Add aria-busy
5. **Carousel** - Add live region
6. **Breadcrumb** - Add nav and aria-current

---

## 📝 Component Checklist Template

For each component, verify:

### ARIA Attributes
- [ ] Correct role attribute
- [ ] Required states (expanded, selected, checked, pressed)
- [ ] Required properties (labelledby, describedby, controls)
- [ ] Dynamic state updates

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Logical tab order
- [ ] Arrow key navigation where applicable
- [ ] Enter/Space activation
- [ ] Escape to close/cancel
- [ ] Home/End where applicable

### Focus Management
- [ ] Visible focus indicator
- [ ] Focus trap in modals
- [ ] Focus restoration on close
- [ ] Initial focus on open

### Screen Reader
- [ ] Meaningful announcements
- [ ] Live regions where needed
- [ ] Hidden decorative elements
- [ ] Sufficient context

### Behavior
- [ ] Consistent with Radix/WAI-ARIA patterns
- [ ] Predictable interactions
- [ ] Error handling
- [ ] Loading states

---

## 📚 Reference Resources

### WAI-ARIA Patterns
- [Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Alert Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)
- [Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)
- [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

### Radix UI Reference
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [Radix Source Code](https://github.com/radix-ui/primitives)

### Angular CDK
- [A11y Module](https://material.angular.io/cdk/a11y/overview)
- [FocusTrap](https://material.angular.io/cdk/a11y/overview#focustrap)
- [LiveAnnouncer](https://material.angular.io/cdk/a11y/overview#liveannouncer)
- [ListKeyManager](https://material.angular.io/cdk/a11y/overview#listkeymanager)

---

## ✅ Next Steps

1. **Review this audit** - Validate findings
2. **Prioritize** - Confirm P0 components are truly critical
3. **Create tracking issues** - One issue per component
4. **Start Phase 1** - Build shared infrastructure
5. **Test with screen readers** - VoiceOver, NVDA, JAWS
6. **Write accessibility tests** - Unit + Integration

---

## 🧪 Testing Strategy

### Manual Testing
- VoiceOver (macOS)
- NVDA (Windows)
- JAWS (Windows)
- Keyboard-only navigation

### Automated Testing
- axe-core integration
- Lighthouse accessibility audits
- Angular CDK a11y test harnesses
- Custom keyboard navigation tests

---

*Generated: January 7, 2026*
*Components Scanned: 57*
*Critical Issues: ~40+ accessibility gaps identified*
