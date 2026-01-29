import { join, normalize, Path } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { parse as parseJsonc } from 'jsonc-parser';

type ThemeVariant = 'shadcn' | 'github' | 'vercel' | 'apple' | 'openai' | 'clickup' | 'linear';

interface NgAddOptions {
  project?: string;
  theme?: ThemeVariant;
  skipInstall?: boolean;
  skipStyles?: boolean;
  components?: string;  // Can be 'all' or comma-separated list like 'button,card,dialog'
}

// All available components in the registry
const ALL_COMPONENTS = [
  'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar', 'badge',
  'breadcrumb', 'button', 'button-group', 'calendar', 'card', 'carousel',
  'chart', 'checkbox', 'collapsible', 'combobox', 'command', 'context-menu',
  'data-table', 'date-picker', 'dialog', 'drawer', 'dropdown-menu', 'empty',
  'form', 'hover-card', 'input', 'input-group', 'input-otp', 'kbd', 'label',
  'menubar', 'native-select', 'navigation-menu', 'pagination', 'popover',
  'progress', 'radio-group', 'resizable', 'scroll-area', 'segmented', 'select',
  'separator', 'sheet', 'sidebar', 'skeleton', 'slider', 'spinner', 'switch',
  'table', 'tabs', 'textarea', 'toast', 'toggle', 'toggle-group', 'tooltip',
  'typography'
];

// Component registry - maps component names to their file structure (for --components option)
interface ComponentInfo {
  files: string[];
}

const COMPONENT_REGISTRY: Record<string, ComponentInfo> = {
  accordion: { files: ['accordion.component.ts', 'accordion-content.component.ts', 'accordion-context.ts', 'accordion-item.component.ts', 'accordion-trigger.component.ts', 'index.ts'] },
  alert: { files: ['alert.component.ts', 'alert-title.component.ts', 'alert-description.component.ts', 'alert-variants.ts', 'index.ts'] },
  'alert-dialog': { files: ['alert-dialog.component.ts', 'alert-dialog-action.component.ts', 'alert-dialog-cancel.component.ts', 'alert-dialog-content.component.ts', 'alert-dialog-context.ts', 'alert-dialog-description.component.ts', 'alert-dialog-footer.component.ts', 'alert-dialog-header.component.ts', 'alert-dialog-title.component.ts', 'alert-dialog-trigger.component.ts', 'index.ts'] },
  'aspect-ratio': { files: ['aspect-ratio.component.ts', 'index.ts'] },
  avatar: { files: ['avatar.component.ts', 'avatar-fallback.component.ts', 'avatar-image.component.ts', 'ui-avatar.component.ts', 'index.ts'] },
  badge: { files: ['badge.component.ts', 'badge-variants.ts', 'index.ts'] },
  breadcrumb: { files: ['breadcrumb.component.ts', 'breadcrumb-ellipsis.component.ts', 'breadcrumb-item.component.ts', 'breadcrumb-link.component.ts', 'breadcrumb-list.component.ts', 'breadcrumb-page.component.ts', 'breadcrumb-separator.component.ts', 'index.ts'] },
  button: { files: ['button.component.ts', 'button-variants.ts', 'index.ts'] },
  'button-group': { files: ['button-group.component.ts', 'button-group-variants.ts', 'index.ts'] },
  calendar: { files: ['calendar.component.ts', 'index.ts'] },
  card: { files: ['card.component.ts', 'card-action.component.ts', 'card-content.component.ts', 'card-description.component.ts', 'card-footer.component.ts', 'card-header.component.ts', 'card-title.component.ts', 'index.ts'] },
  carousel: { files: ['carousel.component.ts', 'carousel-content.component.ts', 'carousel-context.ts', 'carousel-item.component.ts', 'carousel-next.component.ts', 'carousel-previous.component.ts', 'index.ts'] },
  chart: { files: ['chart.component.ts', 'chart-container.component.ts', 'chart-context.ts', 'chart-legend.component.ts', 'chart-legend-content.component.ts', 'chart-tooltip.component.ts', 'chart-tooltip-content.component.ts', 'index.ts'] },
  checkbox: { files: ['checkbox.component.ts', 'index.ts'] },
  collapsible: { files: ['collapsible.component.ts', 'collapsible-content.component.ts', 'collapsible-context.ts', 'collapsible-trigger.component.ts', 'index.ts'] },
  combobox: { files: ['combobox.component.ts', 'combobox-content.component.ts', 'combobox-context.ts', 'combobox-empty.component.ts', 'combobox-group.component.ts', 'combobox-input.component.ts', 'combobox-item.component.ts', 'combobox-list.component.ts', 'combobox-trigger.component.ts', 'combobox-value.component.ts', 'index.ts'] },
  command: { files: ['command.component.ts', 'command-context.ts', 'command-dialog.component.ts', 'command-empty.component.ts', 'command-group.component.ts', 'command-input.component.ts', 'command-item.component.ts', 'command-list.component.ts', 'command-separator.component.ts', 'command-shortcut.component.ts', 'index.ts'] },
  'context-menu': { files: ['context-menu.component.ts', 'context-menu-checkbox-item.component.ts', 'context-menu-content.component.ts', 'context-menu-context.ts', 'context-menu-item.component.ts', 'context-menu-label.component.ts', 'context-menu-radio-group.component.ts', 'context-menu-radio-item.component.ts', 'context-menu-separator.component.ts', 'context-menu-shortcut.component.ts', 'context-menu-sub.component.ts', 'context-menu-sub-content.component.ts', 'context-menu-sub-trigger.component.ts', 'context-menu-trigger.component.ts', 'index.ts'] },
  'data-table': { files: ['data-table.component.ts', 'data-table-content.component.ts', 'data-table-context.ts', 'data-table-pagination.component.ts', 'data-table-search.component.ts', 'data-table-toolbar.component.ts', 'data-table-view-options.component.ts', 'index.ts'] },
  'date-picker': { files: ['date-picker.component.ts', 'index.ts'] },
  dialog: { files: ['dialog.component.ts', 'dialog-close.component.ts', 'dialog-content.component.ts', 'dialog-context.ts', 'dialog-description.component.ts', 'dialog-footer.component.ts', 'dialog-header.component.ts', 'dialog-title.component.ts', 'dialog-trigger.component.ts', 'index.ts'] },
  drawer: { files: ['drawer.component.ts', 'drawer-close.component.ts', 'drawer-content.component.ts', 'drawer-context.ts', 'drawer-description.component.ts', 'drawer-footer.component.ts', 'drawer-header.component.ts', 'drawer-title.component.ts', 'drawer-trigger.component.ts', 'index.ts'] },
  'dropdown-menu': { files: ['dropdown-menu.component.ts', 'dropdown-menu-checkbox-item.component.ts', 'dropdown-menu-content.component.ts', 'dropdown-menu-context.ts', 'dropdown-menu-group.component.ts', 'dropdown-menu-item.component.ts', 'dropdown-menu-label.component.ts', 'dropdown-menu-radio-group.component.ts', 'dropdown-menu-radio-item.component.ts', 'dropdown-menu-separator.component.ts', 'dropdown-menu-shortcut.component.ts', 'dropdown-menu-sub.component.ts', 'dropdown-menu-sub-content.component.ts', 'dropdown-menu-sub-trigger.component.ts', 'dropdown-menu-trigger.component.ts', 'index.ts'] },
  empty: { files: ['empty.component.ts', 'empty-action.component.ts', 'empty-description.component.ts', 'empty-icon.component.ts', 'empty-title.component.ts', 'index.ts'] },
  form: { files: ['form.component.ts', 'form-context.ts', 'form-control.component.ts', 'form-description.component.ts', 'form-field.component.ts', 'form-item.component.ts', 'form-label.component.ts', 'form-message.component.ts', 'index.ts'] },
  'hover-card': { files: ['hover-card.component.ts', 'hover-card-content.component.ts', 'hover-card-context.ts', 'hover-card-trigger.component.ts', 'index.ts'] },
  input: { files: ['input.component.ts', 'index.ts'] },
  'input-group': { files: ['input-group.component.ts', 'input-group-addon.component.ts', 'input-group-input.component.ts', 'index.ts'] },
  'input-otp': { files: ['input-otp.component.ts', 'input-otp-context.ts', 'input-otp-group.component.ts', 'input-otp-separator.component.ts', 'input-otp-slot.component.ts', 'index.ts'] },
  kbd: { files: ['kbd.component.ts', 'kbd-variants.ts', 'index.ts'] },
  label: { files: ['label.component.ts', 'index.ts'] },
  menubar: { files: ['menubar.component.ts', 'menubar-checkbox-item.component.ts', 'menubar-content.component.ts', 'menubar-context.ts', 'menubar-item.component.ts', 'menubar-label.component.ts', 'menubar-menu.component.ts', 'menubar-radio-group.component.ts', 'menubar-radio-item.component.ts', 'menubar-separator.component.ts', 'menubar-shortcut.component.ts', 'menubar-sub.component.ts', 'menubar-sub-content.component.ts', 'menubar-sub-trigger.component.ts', 'menubar-trigger.component.ts', 'index.ts'] },
  'native-select': { files: ['native-select.component.ts', 'native-select-variants.ts', 'index.ts'] },
  'navigation-menu': { files: ['navigation-menu.component.ts', 'navigation-menu-content.component.ts', 'navigation-menu-context.ts', 'navigation-menu-indicator.component.ts', 'navigation-menu-item.component.ts', 'navigation-menu-link.component.ts', 'navigation-menu-list.component.ts', 'navigation-menu-trigger.component.ts', 'navigation-menu-trigger-style.ts', 'navigation-menu-viewport.component.ts', 'index.ts'] },
  pagination: { files: ['pagination.component.ts', 'pagination-content.component.ts', 'pagination-ellipsis.component.ts', 'pagination-item.component.ts', 'pagination-link.component.ts', 'pagination-next.component.ts', 'pagination-previous.component.ts', 'index.ts'] },
  popover: { files: ['popover.component.ts', 'popover-anchor.component.ts', 'popover-content.component.ts', 'popover-context.ts', 'popover-trigger.component.ts', 'index.ts'] },
  progress: { files: ['progress.component.ts', 'index.ts'] },
  'radio-group': { files: ['radio-group.component.ts', 'radio-group-context.ts', 'radio-group-item.component.ts', 'index.ts'] },
  resizable: { files: ['resizable-panel-group.component.ts', 'resizable-context.ts', 'resizable-handle.component.ts', 'resizable-panel.component.ts', 'index.ts'] },
  'scroll-area': { files: ['scroll-area.component.ts', 'scroll-bar.component.ts', 'index.ts'] },
  segmented: { files: ['segmented.component.ts', 'segmented-context.ts', 'segmented-item.component.ts', 'segmented-variants.ts', 'index.ts'] },
  select: { files: ['select.component.ts', 'select-content.component.ts', 'select-context.ts', 'select-group.component.ts', 'select-item.component.ts', 'select-label.component.ts', 'select-separator.component.ts', 'select-trigger.component.ts', 'select-value.component.ts', 'index.ts'] },
  separator: { files: ['separator.component.ts', 'index.ts'] },
  sheet: { files: ['sheet.component.ts', 'sheet-close.component.ts', 'sheet-content.component.ts', 'sheet-context.ts', 'sheet-description.component.ts', 'sheet-footer.component.ts', 'sheet-header.component.ts', 'sheet-title.component.ts', 'sheet-trigger.component.ts', 'sheet-variants.ts', 'index.ts'] },
  sidebar: { files: ['sidebar.component.ts', 'sidebar-content.component.ts', 'sidebar-context.ts', 'sidebar-footer.component.ts', 'sidebar-group.component.ts', 'sidebar-group-action.component.ts', 'sidebar-group-content.component.ts', 'sidebar-group-label.component.ts', 'sidebar-header.component.ts', 'sidebar-input.component.ts', 'sidebar-inset.component.ts', 'sidebar-menu.component.ts', 'sidebar-menu-action.component.ts', 'sidebar-menu-badge.component.ts', 'sidebar-menu-button.component.ts', 'sidebar-menu-item.component.ts', 'sidebar-menu-skeleton.component.ts', 'sidebar-menu-sub.component.ts', 'sidebar-menu-sub-button.component.ts', 'sidebar-menu-sub-item.component.ts', 'sidebar-provider.component.ts', 'sidebar-rail.component.ts', 'sidebar-route-active.service.ts', 'sidebar-separator.component.ts', 'sidebar-trigger.component.ts', 'index.ts'] },
  skeleton: { files: ['skeleton.component.ts', 'index.ts'] },
  slider: { files: ['slider.component.ts', 'index.ts'] },
  spinner: { files: ['spinner.component.ts', 'spinner-variants.ts', 'index.ts'] },
  switch: { files: ['switch.component.ts', 'index.ts'] },
  table: { files: ['table.component.ts', 'table-body.component.ts', 'table-caption.component.ts', 'table-cell.component.ts', 'table-footer.component.ts', 'table-head.component.ts', 'table-header.component.ts', 'table-row.component.ts', 'index.ts'] },
  tabs: { files: ['tabs.component.ts', 'tabs-content.component.ts', 'tabs-context.ts', 'tabs-list.component.ts', 'tabs-trigger.component.ts', 'index.ts'] },
  textarea: { files: ['textarea.component.ts', 'index.ts'] },
  toast: { files: ['toast.component.ts', 'toast-action.component.ts', 'toast-description.component.ts', 'toast-title.component.ts', 'toast-variants.ts', 'toast.service.ts', 'toaster.component.ts', 'index.ts'] },
  toggle: { files: ['toggle.component.ts', 'toggle-variants.ts', 'index.ts'] },
  'toggle-group': { files: ['toggle-group.component.ts', 'toggle-group-context.ts', 'toggle-group-item.component.ts', 'index.ts'] },
  tooltip: { files: ['tooltip.component.ts', 'tooltip-content.component.ts', 'tooltip-context.ts', 'tooltip-provider.component.ts', 'tooltip-trigger.component.ts', 'index.ts'] },
  typography: { files: ['typography-blockquote.component.ts', 'typography-h1.component.ts', 'typography-h2.component.ts', 'typography-h3.component.ts', 'typography-h4.component.ts', 'typography-inline-code.component.ts', 'typography-large.component.ts', 'typography-lead.component.ts', 'typography-list.component.ts', 'typography-muted.component.ts', 'typography-p.component.ts', 'typography-small.component.ts', 'index.ts'] },
};

// Registry of all utility files that need to be copied
const UTILS_FILES_REGISTRY = [
  // Core utils
  'cn.ts',
  'index.ts',
  // Animation utilities
  'animation/index.ts',
  'animation/animation.types.ts',
  'animation/animation.utils.ts',
  'animation/animation-tokens.service.ts',
  'animation/animated.directive.ts',
  'animation/presence.component.ts',
  'animation/presence.directive.ts',
  // Accessibility utilities
  'accessibility/index.ts',
  'accessibility/aria-id.service.ts',
  'accessibility/click-outside.directive.ts',
  'accessibility/focus-management.service.ts',
  'accessibility/focus-trap.directive.ts',
  'accessibility/keyboard-navigation.directive.ts',
  'accessibility/live-region.directive.ts',
  'accessibility/touch-target.directive.ts',
  'accessibility/visually-hidden.component.ts',
  // Positioning utilities
  'positioning/index.ts',
];

// Theme color definitions for all variants
interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

interface ThemePalette {
  name: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
}

const THEME_PALETTES: Record<ThemeVariant, ThemePalette> = {
  shadcn: {
    name: 'shadcn',
    description: 'The default shadcn/ui theme - clean, minimal, and professional',
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.145 0 0)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.145 0 0)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.145 0 0)',
      primary: 'oklch(0.205 0 0)',
      primaryForeground: 'oklch(0.985 0 0)',
      secondary: 'oklch(0.97 0 0)',
      secondaryForeground: 'oklch(0.205 0 0)',
      muted: 'oklch(0.97 0 0)',
      mutedForeground: 'oklch(0.556 0 0)',
      accent: 'oklch(0.97 0 0)',
      accentForeground: 'oklch(0.205 0 0)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(0.985 0 0)',
      border: 'oklch(0.922 0 0)',
      input: 'oklch(0.922 0 0)',
      ring: 'oklch(0.708 0 0)',
    },
    dark: {
      background: 'oklch(0.145 0 0)',
      foreground: 'oklch(0.985 0 0)',
      card: 'oklch(0.205 0 0)',
      cardForeground: 'oklch(0.985 0 0)',
      popover: 'oklch(0.205 0 0)',
      popoverForeground: 'oklch(0.985 0 0)',
      primary: 'oklch(0.985 0 0)',
      primaryForeground: 'oklch(0.205 0 0)',
      secondary: 'oklch(0.269 0 0)',
      secondaryForeground: 'oklch(0.985 0 0)',
      muted: 'oklch(0.269 0 0)',
      mutedForeground: 'oklch(0.708 0 0)',
      accent: 'oklch(0.269 0 0)',
      accentForeground: 'oklch(0.985 0 0)',
      destructive: 'oklch(0.396 0.141 25.723)',
      destructiveForeground: 'oklch(0.985 0 0)',
      border: 'oklch(0.269 0 0)',
      input: 'oklch(0.269 0 0)',
      ring: 'oklch(0.439 0 0)',
    },
  },
  github: {
    name: 'GitHub',
    description: "Inspired by GitHub's clean developer-focused design",
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.208 0.042 265.755)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.208 0.042 265.755)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.208 0.042 265.755)',
      primary: 'oklch(0.546 0.192 262.881)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.968 0.007 247.896)',
      secondaryForeground: 'oklch(0.208 0.042 265.755)',
      muted: 'oklch(0.968 0.007 247.896)',
      mutedForeground: 'oklch(0.443 0.024 264.052)',
      accent: 'oklch(0.968 0.007 247.896)',
      accentForeground: 'oklch(0.208 0.042 265.755)',
      destructive: 'oklch(0.577 0.215 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.883 0.012 247.896)',
      input: 'oklch(0.883 0.012 247.896)',
      ring: 'oklch(0.546 0.192 262.881)',
    },
    dark: {
      background: 'oklch(0.177 0.015 265.755)',
      foreground: 'oklch(0.922 0.007 247.896)',
      card: 'oklch(0.208 0.018 265.755)',
      cardForeground: 'oklch(0.922 0.007 247.896)',
      popover: 'oklch(0.208 0.018 265.755)',
      popoverForeground: 'oklch(0.922 0.007 247.896)',
      primary: 'oklch(0.637 0.183 259.533)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.272 0.022 265.755)',
      secondaryForeground: 'oklch(0.922 0.007 247.896)',
      muted: 'oklch(0.272 0.022 265.755)',
      mutedForeground: 'oklch(0.627 0.018 264.052)',
      accent: 'oklch(0.272 0.022 265.755)',
      accentForeground: 'oklch(0.922 0.007 247.896)',
      destructive: 'oklch(0.527 0.215 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.336 0.024 265.755)',
      input: 'oklch(0.336 0.024 265.755)',
      ring: 'oklch(0.637 0.183 259.533)',
    },
  },
  vercel: {
    name: 'Vercel',
    description: "Vercel's bold black and white design aesthetic",
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0 0 0)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0 0 0)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0 0 0)',
      primary: 'oklch(0 0 0)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.968 0 0)',
      secondaryForeground: 'oklch(0 0 0)',
      muted: 'oklch(0.968 0 0)',
      mutedForeground: 'oklch(0.443 0 0)',
      accent: 'oklch(0.968 0 0)',
      accentForeground: 'oklch(0 0 0)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.883 0 0)',
      input: 'oklch(0.883 0 0)',
      ring: 'oklch(0 0 0)',
    },
    dark: {
      background: 'oklch(0 0 0)',
      foreground: 'oklch(1 0 0)',
      card: 'oklch(0.117 0 0)',
      cardForeground: 'oklch(1 0 0)',
      popover: 'oklch(0.117 0 0)',
      popoverForeground: 'oklch(1 0 0)',
      primary: 'oklch(1 0 0)',
      primaryForeground: 'oklch(0 0 0)',
      secondary: 'oklch(0.177 0 0)',
      secondaryForeground: 'oklch(1 0 0)',
      muted: 'oklch(0.177 0 0)',
      mutedForeground: 'oklch(0.627 0 0)',
      accent: 'oklch(0.177 0 0)',
      accentForeground: 'oklch(1 0 0)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.269 0 0)',
      input: 'oklch(0.269 0 0)',
      ring: 'oklch(1 0 0)',
    },
  },
  apple: {
    name: 'Apple',
    description: "Apple's elegant, sophisticated design language",
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.208 0 0)',
      card: 'oklch(0.985 0.003 247.858)',
      cardForeground: 'oklch(0.208 0 0)',
      popover: 'oklch(0.985 0.003 247.858)',
      popoverForeground: 'oklch(0.208 0 0)',
      primary: 'oklch(0.586 0.228 259.815)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.968 0.003 247.858)',
      secondaryForeground: 'oklch(0.208 0 0)',
      muted: 'oklch(0.968 0.003 247.858)',
      mutedForeground: 'oklch(0.506 0 0)',
      accent: 'oklch(0.968 0.003 247.858)',
      accentForeground: 'oklch(0.208 0 0)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.922 0.003 247.858)',
      input: 'oklch(0.922 0.003 247.858)',
      ring: 'oklch(0.586 0.228 259.815)',
    },
    dark: {
      background: 'oklch(0 0 0)',
      foreground: 'oklch(0.985 0 0)',
      card: 'oklch(0.145 0.003 247.858)',
      cardForeground: 'oklch(0.985 0 0)',
      popover: 'oklch(0.145 0.003 247.858)',
      popoverForeground: 'oklch(0.985 0 0)',
      primary: 'oklch(0.637 0.237 259.815)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.227 0.003 247.858)',
      secondaryForeground: 'oklch(0.985 0 0)',
      muted: 'oklch(0.227 0.003 247.858)',
      mutedForeground: 'oklch(0.627 0 0)',
      accent: 'oklch(0.227 0.003 247.858)',
      accentForeground: 'oklch(0.985 0 0)',
      destructive: 'oklch(0.527 0.215 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.295 0.003 247.858)',
      input: 'oklch(0.295 0.003 247.858)',
      ring: 'oklch(0.637 0.237 259.815)',
    },
  },
  openai: {
    name: 'OpenAI',
    description: "OpenAI's modern, tech-forward aesthetic",
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.208 0.01 255.841)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.208 0.01 255.841)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.208 0.01 255.841)',
      primary: 'oklch(0.538 0.163 163.319)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.968 0.005 255.841)',
      secondaryForeground: 'oklch(0.208 0.01 255.841)',
      muted: 'oklch(0.968 0.005 255.841)',
      mutedForeground: 'oklch(0.475 0.01 255.841)',
      accent: 'oklch(0.968 0.005 255.841)',
      accentForeground: 'oklch(0.208 0.01 255.841)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.906 0.006 255.841)',
      input: 'oklch(0.906 0.006 255.841)',
      ring: 'oklch(0.538 0.163 163.319)',
    },
    dark: {
      background: 'oklch(0.168 0.015 255.841)',
      foreground: 'oklch(0.968 0.005 255.841)',
      card: 'oklch(0.208 0.015 255.841)',
      cardForeground: 'oklch(0.968 0.005 255.841)',
      popover: 'oklch(0.208 0.015 255.841)',
      popoverForeground: 'oklch(0.968 0.005 255.841)',
      primary: 'oklch(0.608 0.183 163.319)',
      primaryForeground: 'oklch(0.168 0.015 255.841)',
      secondary: 'oklch(0.268 0.015 255.841)',
      secondaryForeground: 'oklch(0.968 0.005 255.841)',
      muted: 'oklch(0.268 0.015 255.841)',
      mutedForeground: 'oklch(0.627 0.01 255.841)',
      accent: 'oklch(0.268 0.015 255.841)',
      accentForeground: 'oklch(0.968 0.005 255.841)',
      destructive: 'oklch(0.527 0.215 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.336 0.015 255.841)',
      input: 'oklch(0.336 0.015 255.841)',
      ring: 'oklch(0.608 0.183 163.319)',
    },
  },
  clickup: {
    name: 'ClickUp',
    description: "ClickUp's vibrant, colorful productivity aesthetic",
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.229 0.034 277.508)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.229 0.034 277.508)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.229 0.034 277.508)',
      primary: 'oklch(0.638 0.238 288.545)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.962 0.021 288.545)',
      secondaryForeground: 'oklch(0.229 0.034 277.508)',
      muted: 'oklch(0.962 0.021 288.545)',
      mutedForeground: 'oklch(0.475 0.028 277.508)',
      accent: 'oklch(0.807 0.181 85.391)',
      accentForeground: 'oklch(0.229 0.034 277.508)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.906 0.018 277.508)',
      input: 'oklch(0.906 0.018 277.508)',
      ring: 'oklch(0.638 0.238 288.545)',
    },
    dark: {
      background: 'oklch(0.177 0.028 277.508)',
      foreground: 'oklch(0.968 0.008 277.508)',
      card: 'oklch(0.208 0.032 277.508)',
      cardForeground: 'oklch(0.968 0.008 277.508)',
      popover: 'oklch(0.208 0.032 277.508)',
      popoverForeground: 'oklch(0.968 0.008 277.508)',
      primary: 'oklch(0.688 0.238 288.545)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.268 0.038 277.508)',
      secondaryForeground: 'oklch(0.968 0.008 277.508)',
      muted: 'oklch(0.268 0.038 277.508)',
      mutedForeground: 'oklch(0.627 0.018 277.508)',
      accent: 'oklch(0.757 0.181 85.391)',
      accentForeground: 'oklch(0.177 0.028 277.508)',
      destructive: 'oklch(0.527 0.215 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.336 0.038 277.508)',
      input: 'oklch(0.336 0.038 277.508)',
      ring: 'oklch(0.688 0.238 288.545)',
    },
  },
  linear: {
    name: 'Linear',
    description: "Linear's sleek, issue tracking inspired design",
    light: {
      background: 'oklch(0.985 0.003 250)',
      foreground: 'oklch(0.229 0.024 265)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.229 0.024 265)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.229 0.024 265)',
      primary: 'oklch(0.538 0.207 262.881)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.962 0.008 250)',
      secondaryForeground: 'oklch(0.229 0.024 265)',
      muted: 'oklch(0.962 0.008 250)',
      mutedForeground: 'oklch(0.506 0.018 265)',
      accent: 'oklch(0.962 0.008 250)',
      accentForeground: 'oklch(0.229 0.024 265)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.906 0.012 250)',
      input: 'oklch(0.906 0.012 250)',
      ring: 'oklch(0.538 0.207 262.881)',
    },
    dark: {
      background: 'oklch(0.145 0.018 265)',
      foreground: 'oklch(0.962 0.008 250)',
      card: 'oklch(0.177 0.022 265)',
      cardForeground: 'oklch(0.962 0.008 250)',
      popover: 'oklch(0.177 0.022 265)',
      popoverForeground: 'oklch(0.962 0.008 250)',
      primary: 'oklch(0.608 0.217 262.881)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.227 0.028 265)',
      secondaryForeground: 'oklch(0.962 0.008 250)',
      muted: 'oklch(0.227 0.028 265)',
      mutedForeground: 'oklch(0.577 0.015 265)',
      accent: 'oklch(0.227 0.028 265)',
      accentForeground: 'oklch(0.962 0.008 250)',
      destructive: 'oklch(0.527 0.215 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.295 0.028 265)',
      input: 'oklch(0.295 0.028 265)',
      ring: 'oklch(0.608 0.217 262.881)',
    },
  },
};

// Generate CSS Variables template based on selected theme
function generateCssVariablesTemplate(theme: ThemeVariant): string {
  const palette = THEME_PALETTES[theme];
  const { light, dark } = palette;

  return `/* ng-cn/core - shadcn-angular styles */
/* Theme: ${palette.name} - ${palette.description} */
@use "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: ${light.background};
  --foreground: ${light.foreground};
  --card: ${light.card};
  --card-foreground: ${light.cardForeground};
  --popover: ${light.popover};
  --popover-foreground: ${light.popoverForeground};
  --primary: ${light.primary};
  --primary-foreground: ${light.primaryForeground};
  --secondary: ${light.secondary};
  --secondary-foreground: ${light.secondaryForeground};
  --muted: ${light.muted};
  --muted-foreground: ${light.mutedForeground};
  --accent: ${light.accent};
  --accent-foreground: ${light.accentForeground};
  --destructive: ${light.destructive};
  --destructive-foreground: ${light.destructiveForeground};
  --border: ${light.border};
  --input: ${light.input};
  --ring: ${light.ring};
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: ${light.background};
  --sidebar-foreground: ${light.foreground};
  --sidebar-primary: ${light.primary};
  --sidebar-primary-foreground: ${light.primaryForeground};
  --sidebar-accent: ${light.accent};
  --sidebar-accent-foreground: ${light.accentForeground};
  --sidebar-border: ${light.border};
  --sidebar-ring: ${light.ring};
}

.dark {
  --background: ${dark.background};
  --foreground: ${dark.foreground};
  --card: ${dark.card};
  --card-foreground: ${dark.cardForeground};
  --popover: ${dark.popover};
  --popover-foreground: ${dark.popoverForeground};
  --primary: ${dark.primary};
  --primary-foreground: ${dark.primaryForeground};
  --secondary: ${dark.secondary};
  --secondary-foreground: ${dark.secondaryForeground};
  --muted: ${dark.muted};
  --muted-foreground: ${dark.mutedForeground};
  --accent: ${dark.accent};
  --accent-foreground: ${dark.accentForeground};
  --destructive: ${dark.destructive};
  --destructive-foreground: ${dark.destructiveForeground};
  --border: ${dark.border};
  --input: ${dark.input};
  --ring: ${dark.ring};
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: ${dark.card};
  --sidebar-foreground: ${dark.foreground};
  --sidebar-primary: ${dark.primary};
  --sidebar-primary-foreground: ${dark.primaryForeground};
  --sidebar-accent: ${dark.accent};
  --sidebar-accent-foreground: ${dark.accentForeground};
  --sidebar-border: ${dark.border};
  --sidebar-ring: ${dark.ring};
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; font-feature-settings: "rlig" 1, "calt" 1; }
  html { scroll-behavior: smooth; }
  :focus-visible { @apply outline-2 outline-ring outline-offset-2; }
}

@layer utilities {
  .animate-accordion-down { animation: accordion-down 0.2s ease-out; }
  .animate-accordion-up { animation: accordion-up 0.2s ease-out; }
  @keyframes accordion-down { from { height: 0; } to { height: var(--accordion-content-height); } }
  @keyframes accordion-up { from { height: var(--accordion-content-height); } to { height: 0; } }
  .animate-collapsible-down { animation: collapsible-down 0.2s ease-out; }
  .animate-collapsible-up { animation: collapsible-up 0.2s ease-out; }
  @keyframes collapsible-down { from { height: 0; } to { height: var(--collapsible-content-height); } }
  @keyframes collapsible-up { from { height: var(--collapsible-content-height); } to { height: 0; } }
}
`;
}

// PostCSS config template for Tailwind CSS v4
const POSTCSS_CONFIG_TEMPLATE = `/** @type {import('postcss').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
`;

// cn utility template
const CN_UTILITY_TEMPLATE = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 *
 * @example
 * cn('px-4 py-2', 'px-6') // => 'py-2 px-6'
 * cn('bg-red-500', condition && 'bg-blue-500') // conditional classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`;

const UTILS_INDEX_TEMPLATE = `export { cn } from './cn';
`;

export function ngAdd(options: NgAddOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('');
    context.logger.info('╭──────────────────────────────────────────────────╮');
    context.logger.info('│                                                  │');
    context.logger.info('│   🎨  @ng-cn/core - shadcn for Angular          │');
    context.logger.info('│                                                  │');
    context.logger.info('╰──────────────────────────────────────────────────╯');
    context.logger.info('');

    // Add dependencies to package.json
    const packageJsonPath = '/package.json';
    if (tree.exists(packageJsonPath)) {
      const packageJson = JSON.parse(tree.read(packageJsonPath)!.toString('utf-8'));

      // Detect Angular version to determine CDK version
      const angularCoreVersion = packageJson.dependencies?.['@angular/core'] || packageJson.devDependencies?.['@angular/core'] || '';
      const angularMajorVersion = parseInt(angularCoreVersion.replace(/[\^~]/, '').split('.')[0], 10) || 21;

      // Use compatible CDK version based on Angular version
      const cdkVersion = angularMajorVersion >= 21 ? '^21.0.5' : angularMajorVersion >= 20 ? '^20.0.0' : '^19.0.0';

      const requiredDependencies: Record<string, string> = {
        'lucide-angular': '^0.562.0',
        'class-variance-authority': '^0.7.1',
        'clsx': '^2.1.1',
        'tailwind-merge': '^3.4.0',
        '@angular/cdk': cdkVersion,
        'tailwindcss': '^4.1.18',
        '@tailwindcss/postcss': '^4.1.18'
      };

      // Check and add missing dependencies
      let needsInstall = false;
      context.logger.info('📦 Dependencies');
      for (const [pkg, version] of Object.entries(requiredDependencies)) {
        if (!packageJson.dependencies?.[pkg]) {
          packageJson.dependencies = packageJson.dependencies || {};
          packageJson.dependencies[pkg] = version;
          needsInstall = true;
          context.logger.info(`   + ${pkg}@${version}`);
        }
      }

      if (needsInstall) {
        tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2));
        if (!options.skipInstall) {
          context.addTask(new NodePackageInstallTask());
        }
      } else {
        context.logger.info('   ✓ All dependencies already installed');
      }
    }

    // Create lib/utils folder structure
    context.logger.info('');
    context.logger.info('📁 Project Structure');

    const utilsPath = '/src/app/lib/utils';
    const uiPath = '/src/app/lib/components/ui';

    // Copy all utility files from the package
    const sourceUtilsBase = 'node_modules/@ng-cn/core/src/app/lib/utils';
    let utilsFilesCopied = 0;

    for (const utilFile of UTILS_FILES_REGISTRY) {
      const sourcePath = join(normalize(sourceUtilsBase), normalize(utilFile)) as Path;
      const targetPath = join(normalize(utilsPath), normalize(utilFile)) as Path;

      const content = tree.read(sourcePath);
      if (content) {
        if (tree.exists(targetPath)) {
          tree.overwrite(targetPath, content);
        } else {
          tree.create(targetPath, content);
        }
        utilsFilesCopied++;
      }
    }

    if (utilsFilesCopied > 0) {
      context.logger.info(`   + src/app/lib/utils/ (${utilsFilesCopied} files)`);
    } else {
      // Fallback to creating basic files if package files not found
      if (!tree.exists(`${utilsPath}/cn.ts`)) {
        tree.create(`${utilsPath}/cn.ts`, CN_UTILITY_TEMPLATE);
        context.logger.info(`   + src/app/lib/utils/cn.ts`);
      }
      if (!tree.exists(`${utilsPath}/index.ts`)) {
        tree.create(`${utilsPath}/index.ts`, UTILS_INDEX_TEMPLATE);
        context.logger.info(`   + src/app/lib/utils/index.ts`);
      }
    }

    // Create ui components directory
    if (!tree.exists(`${uiPath}/.gitkeep`)) {
      tree.create(`${uiPath}/.gitkeep`, '');
      context.logger.info(`   + src/app/lib/components/ui/`);
    }

    // Setup styles
    if (!options.skipStyles) {
      context.logger.info('');
      context.logger.info('🎨 Styles');

      // Get the selected theme (default to shadcn)
      const selectedTheme: ThemeVariant = options.theme || 'shadcn';
      const themePalette = THEME_PALETTES[selectedTheme];

      context.logger.info(`   Theme: ${themePalette.name} - ${themePalette.description}`);

      const ngCnStylesPath = '/src/ng-cn.scss';
      const stylesPath = '/src/styles.scss';
      const stylesCssPath = '/src/styles.css';

      // Create ng-cn.scss with CSS variables based on selected theme
      const cssTemplate = generateCssVariablesTemplate(selectedTheme);
      tree.create(ngCnStylesPath, cssTemplate);
      context.logger.info(`   + src/ng-cn.scss (${themePalette.name} theme variables)`);

      // Import in styles.scss or styles.css
      if (tree.exists(stylesPath)) {
        const stylesContent = tree.read(stylesPath)!.toString('utf-8');
        if (!stylesContent.includes('ng-cn.scss')) {
          const newContent = `@use './ng-cn.scss';\n\n${stylesContent}`;
          tree.overwrite(stylesPath, newContent);
          context.logger.info(`   ✓ Imported in styles.scss`);
        }
      } else if (tree.exists(stylesCssPath)) {
        const stylesContent = tree.read(stylesCssPath)!.toString('utf-8');
        if (!stylesContent.includes('ng-cn.scss')) {
          const newContent = `@use './ng-cn.scss';\n\n${stylesContent}`;
          tree.overwrite(stylesCssPath, newContent);
          context.logger.info(`   ✓ Imported in styles.css`);
        }
      }
    }

    // Create postcss.config.mjs for Tailwind CSS v4
    context.logger.info('');
    context.logger.info('🔧 PostCSS Configuration');

    const postcssConfigPath = '/postcss.config.mjs';
    if (!tree.exists(postcssConfigPath)) {
      tree.create(postcssConfigPath, POSTCSS_CONFIG_TEMPLATE);
      context.logger.info(`   + postcss.config.mjs (Tailwind CSS v4)`);
    } else {
      const existingConfig = tree.read(postcssConfigPath)!.toString('utf-8');
      if (!existingConfig.includes('@tailwindcss/postcss')) {
        // Update existing config to use Tailwind CSS v4
        tree.overwrite(postcssConfigPath, POSTCSS_CONFIG_TEMPLATE);
        context.logger.info(`   ✓ postcss.config.mjs updated for Tailwind CSS v4`);
      } else {
        context.logger.info(`   ✓ postcss.config.mjs already configured`);
      }
    }

    // Update tsconfig paths
    context.logger.info('');
    context.logger.info('⚙️  TypeScript Config');

    const tsconfigPath = '/tsconfig.json';
    if (tree.exists(tsconfigPath)) {
      const tsconfigContent = tree.read(tsconfigPath)!.toString('utf-8');
      const tsconfig = parseJsonc(tsconfigContent) as Record<string, any>;
      tsconfig.compilerOptions = tsconfig.compilerOptions || {};

      // Set baseUrl for path aliases to work
      if (!tsconfig.compilerOptions.baseUrl) {
        tsconfig.compilerOptions.baseUrl = '.';
      }

      tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};

      const pathAliases: Record<string, string[]> = {
        '@/*': ['./src/*'],
        '@/lib/*': ['./src/app/lib/*'],
        '@/ui/*': ['./src/app/lib/components/ui/*'],
        '@/utils/*': ['./src/app/lib/utils/*']
      };

      let pathsUpdated = false;
      for (const [alias, paths] of Object.entries(pathAliases)) {
        if (!tsconfig.compilerOptions.paths[alias]) {
          tsconfig.compilerOptions.paths[alias] = paths;
          pathsUpdated = true;
        }
      }

      if (pathsUpdated) {
        tree.overwrite(tsconfigPath, JSON.stringify(tsconfig, null, 2));
        context.logger.info('   ✓ Path aliases configured');
      } else {
        context.logger.info('   ✓ Path aliases already set');
      }
    }

    // Copy selected components from @ng-cn/core
    const componentsToInstall = parseComponentsOption(options.components);
    if (componentsToInstall.length > 0) {
      context.logger.info('');
      if (options.components === 'all') {
        context.logger.info(`🚀 Copying ALL ${componentsToInstall.length} components... (Magic Mode)`);
      } else {
        context.logger.info('📦 Selected Components');
      }

      // Actually copy the component files
      const componentBasePath = 'node_modules/@ng-cn/core/src/app/lib/components/ui';
      const fallbackBasePath = 'src/app/lib/components/ui';
      let totalFilesCopied = 0;

      for (const componentName of componentsToInstall) {
        const componentInfo = COMPONENT_REGISTRY[componentName];
        if (!componentInfo) {
          context.logger.warn(`   ⚠ Unknown component: ${componentName}`);
          continue;
        }

        const targetComponentPath = `/src/app/lib/components/ui/${componentName}`;
        let filesCopied = 0;

        for (const file of componentInfo.files) {
          // Try package path first, then fallback to local dev path
          let sourcePath = `${componentBasePath}/${componentName}/${file}`;
          const targetPath = `${targetComponentPath}/${file}`;

          let content = tree.read(sourcePath);
          if (!content) {
            // Fallback to local development path
            sourcePath = `${fallbackBasePath}/${componentName}/${file}`;
            content = tree.read(sourcePath);
          }

          if (content) {
            if (tree.exists(targetPath)) {
              tree.overwrite(targetPath, content);
            } else {
              tree.create(targetPath, content);
            }
            filesCopied++;
          }
        }

        if (filesCopied > 0) {
          context.logger.info(`   ✓ ${componentName} (${filesCopied} files)`);
          totalFilesCopied += filesCopied;
        } else {
          context.logger.warn(`   ⚠ ${componentName} - no files found (use: ng g @ng-cn/core:c ${componentName})`);
        }
      }

      context.logger.info('');
      if (totalFilesCopied > 0) {
        context.logger.info(`   📦 ${totalFilesCopied} total files copied`);
      } else {
        context.logger.info('💡 To copy components after install, use:');
        context.logger.info(`   ng g @ng-cn/core:component button`);
        context.logger.info(`   ng g @ng-cn/core:component card`);
      }
    }

    // Success message with ASCII art banner
    context.logger.info('');
    context.logger.info('');
    context.logger.info('  ███╗   ██╗ ██████╗        ██████╗███╗   ██╗');
    context.logger.info('  ████╗  ██║██╔════╝       ██╔════╝████╗  ██║');
    context.logger.info('  ██╔██╗ ██║██║  ███╗█████╗██║     ██╔██╗ ██║');
    context.logger.info('  ██║╚██╗██║██║   ██║╚════╝██║     ██║╚██╗██║');
    context.logger.info('  ██║ ╚████║╚██████╔╝      ╚██████╗██║ ╚████║');
    context.logger.info('  ╚═╝  ╚═══╝ ╚═════╝        ╚═════╝╚═╝  ╚═══╝');
    context.logger.info('');
    context.logger.info('  ✅ Setup complete! shadcn for Angular');

    // Show theme info
    const selectedTheme: ThemeVariant = options.theme || 'shadcn';
    const themePalette = THEME_PALETTES[selectedTheme];
    context.logger.info(`  🎨 Theme: ${themePalette.name}`);
    context.logger.info('');

    // Show selected components summary if any were installed
    const componentsInstalled = parseComponentsOption(options.components);
    if (componentsInstalled.length > 0) {
      if (options.components === 'all') {
        context.logger.info('╭──────────────────────────────────────────────────╮');
        context.logger.info('│  ✨ MAGIC MODE - All components installed!       │');
        context.logger.info('│                                                  │');
        context.logger.info(`│     ${componentsInstalled.length} components ready to use                   │`);
        context.logger.info('│                                                  │');
        context.logger.info('╰──────────────────────────────────────────────────╯');
      } else {
        context.logger.info('╭──────────────────────────────────────────────────╮');
        context.logger.info('│  ✨ Components installed:                        │');
        context.logger.info('│                                                  │');
        for (const component of componentsInstalled) {
          const paddedComponent = `@ng-cn/${component}`.padEnd(40);
          context.logger.info(`│     ${paddedComponent}│`);
        }
        context.logger.info('│                                                  │');
        context.logger.info('╰──────────────────────────────────────────────────╯');
      }
      context.logger.info('');
    }

    context.logger.info('╭──────────────────────────────────────────────────╮');
    context.logger.info('│  ✅ Tailwind CSS v4 configured automatically!   │');
    context.logger.info('│                                                  │');
    context.logger.info('│  🚀 Next steps:                                  │');
    context.logger.info('│                                                  │');
    context.logger.info('│  1. Add more components:                         │');
    context.logger.info('│     ng g @ng-cn/core:c button                    │');
    context.logger.info('│     ng g @ng-cn/core:c card                      │');
    context.logger.info('│                                                  │');
    context.logger.info('│  2. Or install individual packages:              │');
    context.logger.info('│     npm i @ng-cn/button @ng-cn/card              │');
    context.logger.info('│                                                  │');
    context.logger.info('│  3. Import and use:                              │');
    context.logger.info("│     import { Button } from '@ng-cn/button';      │");
    context.logger.info('│                                                  │');
    context.logger.info('│  📚 Docs: https://shadcn-angular.tigayon.com     │');
    context.logger.info('╰──────────────────────────────────────────────────╯');
    context.logger.info('');

    return tree;
  };
}

/**
 * Parse the components option which can be:
 * - 'all' - install all components
 * - comma-separated list like 'button,card,dialog'
 * - empty string - no components
 */
function parseComponentsOption(components?: string): string[] {
  if (!components || components.trim() === '') {
    return [];
  }

  if (components.toLowerCase() === 'all') {
    return ALL_COMPONENTS;
  }

  // Parse comma-separated list
  return components
    .split(',')
    .map(c => c.trim().toLowerCase())
    .filter(c => c.length > 0 && ALL_COMPONENTS.includes(c));
}
