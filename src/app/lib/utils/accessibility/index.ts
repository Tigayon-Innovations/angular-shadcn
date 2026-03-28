// Accessibility utilities for shadcn-angular
// Provides WCAG AA compliant accessibility infrastructure

// Services
export {
  AriaIdService,
  type AriaAccordionIds,
  type AriaDialogIds,
  type AriaMenuIds,
  type AriaTabIds,
} from './aria-id.service';
export { FocusManagementService, type FocusOptions } from './focus-management.service';
export {
  LiveAnnouncerService,
  type Announcement,
  type AnnouncementPriority,
} from './live-region.directive';

// Directives
export { ClickOutsideDirective } from './click-outside.directive';
export { FocusTrapDirective } from './focus-trap.directive';
export {
  KeyboardNavigationDirective,
  type KeyboardNavigationConfig,
  type NavigationDirection,
  type NavigationEvent,
} from './keyboard-navigation.directive';
export { LiveRegionDirective, StatusAnnouncerDirective } from './live-region.directive';

// Visually Hidden Components
export { VisuallyHidden, VisuallyHiddenInput } from './visually-hidden.component';

// Touch Target Utilities
export { MinTouchTarget, TouchTargetDirective } from './touch-target.directive';
