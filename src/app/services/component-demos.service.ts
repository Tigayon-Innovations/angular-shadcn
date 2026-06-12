import { Injectable, Type } from '@angular/core';

export interface ComponentDemo {
  component: Type<unknown>;
  title?: string;
}

/**
 * Service that provides demo components for interactive previews.
 * Maps component slugs to their actual demo components.
 */
@Injectable({ providedIn: 'root' })
export class ComponentDemos {
  private readonly demos = new Map<string, () => Promise<ComponentDemo>>();

  constructor() {
    // Register all component demos with lazy loading

    // Layout Components
    this.registerDemo('aspect-ratio', () =>
      import('@/pages/docs/component-detail/demos/aspect-ratio-demo').then((m) => ({
        component: m.AspectRatioDemo,
      })),
    );

    this.registerDemo('card', () =>
      import('@/pages/docs/component-detail/demos/card-demo').then((m) => ({
        component: m.CardDemo,
      })),
    );

    this.registerDemo('collapsible', () =>
      import('@/pages/docs/component-detail/demos/collapsible-demo').then((m) => ({
        component: m.CollapsibleDemo,
      })),
    );

    this.registerDemo('resizable', () =>
      import('@/pages/docs/component-detail/demos/resizable-demo').then((m) => ({
        component: m.ResizableDemo,
      })),
    );

    this.registerDemo('scroll-area', () =>
      import('@/pages/docs/component-detail/demos/scroll-area-demo').then((m) => ({
        component: m.ScrollAreaDemo,
      })),
    );

    this.registerDemo('separator', () =>
      import('@/pages/docs/component-detail/demos/separator-demo').then((m) => ({
        component: m.SeparatorDemo,
      })),
    );

    // Navigation Components
    this.registerDemo('accordion', () =>
      import('@/pages/docs/component-detail/demos/accordion-demo').then((m) => ({
        component: m.AccordionDemo,
      })),
    );

    this.registerDemo('breadcrumb', () =>
      import('@/pages/docs/component-detail/demos/breadcrumb-demo').then((m) => ({
        component: m.BreadcrumbDemo,
      })),
    );

    this.registerDemo('context-menu', () =>
      import('@/pages/docs/component-detail/demos/context-menu-demo').then((m) => ({
        component: m.ContextMenuDemo,
      })),
    );

    this.registerDemo('dropdown-menu', () =>
      import('@/pages/docs/component-detail/demos/dropdown-menu-demo').then((m) => ({
        component: m.DropdownMenuDemo,
      })),
    );

    this.registerDemo('menubar', () =>
      import('@/pages/docs/component-detail/demos/menubar-demo').then((m) => ({
        component: m.MenubarDemo,
      })),
    );

    this.registerDemo('navigation-menu', () =>
      import('@/pages/docs/component-detail/demos/navigation-menu-demo').then((m) => ({
        component: m.NavigationMenuDemo,
      })),
    );

    this.registerDemo('pagination', () =>
      import('@/pages/docs/component-detail/demos/pagination-demo').then((m) => ({
        component: m.PaginationDemo,
      })),
    );

    this.registerDemo('tabs', () =>
      import('@/pages/docs/component-detail/demos/tabs-demo').then((m) => ({
        component: m.TabsDemo,
      })),
    );

    // Form Components
    this.registerDemo('button', () =>
      import('@/pages/docs/component-detail/demos/button-demo').then((m) => ({
        component: m.ButtonDemo,
      })),
    );

    this.registerDemo('checkbox', () =>
      import('@/pages/docs/component-detail/demos/checkbox-demo').then((m) => ({
        component: m.CheckboxDemo,
      })),
    );

    this.registerDemo('combobox', () =>
      import('@/pages/docs/component-detail/demos/combobox-demo').then((m) => ({
        component: m.ComboboxDemo,
      })),
    );

    this.registerDemo('date-picker', () =>
      import('@/pages/docs/component-detail/demos/date-picker-demo').then((m) => ({
        component: m.DatePickerDemo,
      })),
    );

    this.registerDemo('form', () =>
      import('@/pages/docs/component-detail/demos/form-demo').then((m) => ({
        component: m.FormDemo,
      })),
    );

    this.registerDemo('input', () =>
      import('@/pages/docs/component-detail/demos/input-demo').then((m) => ({
        component: m.InputDemo,
      })),
    );

    this.registerDemo('input-otp', () =>
      import('@/pages/docs/component-detail/demos/input-otp-demo').then((m) => ({
        component: m.InputOtpDemo,
      })),
    );

    this.registerDemo('label', () =>
      import('@/pages/docs/component-detail/demos/label-demo').then((m) => ({
        component: m.LabelDemo,
      })),
    );

    this.registerDemo('radio-group', () =>
      import('@/pages/docs/component-detail/demos/radio-group-demo').then((m) => ({
        component: m.RadioGroupDemo,
      })),
    );

    this.registerDemo('select', () =>
      import('@/pages/docs/component-detail/demos/select-demo').then((m) => ({
        component: m.SelectDemo,
      })),
    );

    this.registerDemo('slider', () =>
      import('@/pages/docs/component-detail/demos/slider-demo').then((m) => ({
        component: m.SliderDemo,
      })),
    );

    this.registerDemo('switch', () =>
      import('@/pages/docs/component-detail/demos/switch-demo').then((m) => ({
        component: m.SwitchDemo,
      })),
    );

    this.registerDemo('textarea', () =>
      import('@/pages/docs/component-detail/demos/textarea-demo').then((m) => ({
        component: m.TextareaDemo,
      })),
    );

    this.registerDemo('toggle', () =>
      import('@/pages/docs/component-detail/demos/toggle-demo').then((m) => ({
        component: m.ToggleDemo,
      })),
    );

    this.registerDemo('toggle-group', () =>
      import('@/pages/docs/component-detail/demos/toggle-group-demo').then((m) => ({
        component: m.ToggleGroupDemo,
      })),
    );

    // Feedback Components
    this.registerDemo('alert', () =>
      import('@/pages/docs/component-detail/demos/alert-demo').then((m) => ({
        component: m.AlertDemo,
      })),
    );

    this.registerDemo('alert-dialog', () =>
      import('@/pages/docs/component-detail/demos/alert-dialog-demo').then((m) => ({
        component: m.AlertDialogDemo,
      })),
    );

    this.registerDemo('dialog', () =>
      import('@/pages/docs/component-detail/demos/dialog-demo').then((m) => ({
        component: m.DialogDemo,
      })),
    );

    this.registerDemo('drawer', () =>
      import('@/pages/docs/component-detail/demos/drawer-demo').then((m) => ({
        component: m.DrawerDemo,
      })),
    );

    this.registerDemo('hover-card', () =>
      import('@/pages/docs/component-detail/demos/hover-card-demo').then((m) => ({
        component: m.HoverCardDemo,
      })),
    );

    this.registerDemo('popover', () =>
      import('@/pages/docs/component-detail/demos/popover-demo').then((m) => ({
        component: m.PopoverDemo,
      })),
    );

    this.registerDemo('progress', () =>
      import('@/pages/docs/component-detail/demos/progress-demo').then((m) => ({
        component: m.ProgressDemo,
      })),
    );

    this.registerDemo('sheet', () =>
      import('@/pages/docs/component-detail/demos/sheet-demo').then((m) => ({
        component: m.SheetDemo,
      })),
    );

    this.registerDemo('skeleton', () =>
      import('@/pages/docs/component-detail/demos/skeleton-demo').then((m) => ({
        component: m.SkeletonDemo,
      })),
    );

    this.registerDemo('toast', () =>
      import('@/pages/docs/component-detail/demos/toast-demo').then((m) => ({
        component: m.ToastDemo,
      })),
    );

    this.registerDemo('tooltip', () =>
      import('@/pages/docs/component-detail/demos/tooltip-demo').then((m) => ({
        component: m.TooltipDemo,
      })),
    );

    // Data Display Components
    this.registerDemo('avatar', () =>
      import('@/pages/docs/component-detail/demos/avatar-demo').then((m) => ({
        component: m.AvatarDemo,
      })),
    );

    this.registerDemo('badge', () =>
      import('@/pages/docs/component-detail/demos/badge-demo').then((m) => ({
        component: m.BadgeDemo,
      })),
    );

    this.registerDemo('calendar', () =>
      import('@/pages/docs/component-detail/demos/calendar-demo').then((m) => ({
        component: m.CalendarDemo,
      })),
    );

    this.registerDemo('carousel', () =>
      import('@/pages/docs/component-detail/demos/carousel-demo').then((m) => ({
        component: m.CarouselDemo,
      })),
    );

    this.registerDemo('chart', () =>
      import('@/pages/docs/component-detail/demos/chart-demo').then((m) => ({
        component: m.ChartDemo,
      })),
    );

    this.registerDemo('command', () =>
      import('@/pages/docs/component-detail/demos/command-demo').then((m) => ({
        component: m.CommandDemo,
      })),
    );

    this.registerDemo('data-table', () =>
      import('@/pages/docs/component-detail/demos/data-table-demo').then((m) => ({
        component: m.DataTableDemo,
      })),
    );

    this.registerDemo('table', () =>
      import('@/pages/docs/component-detail/demos/table-demo').then((m) => ({
        component: m.TableDemo,
      })),
    );

    // Extended Components
    this.registerDemo('button-group', () =>
      import('@/pages/docs/component-detail/demos/button-group-demo').then((m) => ({
        component: m.ButtonGroupDemo,
      })),
    );

    this.registerDemo('empty', () =>
      import('@/pages/docs/component-detail/demos/empty-demo').then((m) => ({
        component: m.EmptyDemo,
      })),
    );

    this.registerDemo('input-group', () =>
      import('@/pages/docs/component-detail/demos/input-group-demo').then((m) => ({
        component: m.InputGroupDemo,
      })),
    );

    this.registerDemo('kbd', () =>
      import('@/pages/docs/component-detail/demos/kbd-demo').then((m) => ({
        component: m.KbdDemo,
      })),
    );

    this.registerDemo('native-select', () =>
      import('@/pages/docs/component-detail/demos/native-select-demo').then((m) => ({
        component: m.NativeSelectDemo,
      })),
    );

    this.registerDemo('segmented', () =>
      import('@/pages/docs/component-detail/demos/segmented-demo').then((m) => ({
        component: m.SegmentedDemo,
      })),
    );

    this.registerDemo('sidebar', () =>
      import('@/pages/docs/component-detail/demos/sidebar-demo').then((m) => ({
        component: m.SidebarDemo,
      })),
    );

    this.registerDemo('spinner', () =>
      import('@/pages/docs/component-detail/demos/spinner-demo').then((m) => ({
        component: m.SpinnerDemo,
      })),
    );

    this.registerDemo('typography', () =>
      import('@/pages/docs/component-detail/demos/typography-demo').then((m) => ({
        component: m.TypographyDemo,
      })),
    );
    this.registerDemo('country-selector', () =>
      import('@/pages/docs/component-detail/demos/country-selector-demo').then((m) => ({
        component: m.CountrySelectorDemo,
      })),
    );
    this.registerDemo('phone-input', () =>
      import('@/pages/docs/component-detail/demos/phone-input-demo').then((m) => ({
        component: m.PhoneInputDemo,
      })),
    );

    this.registerDemo('sonner', () =>
      import('@/pages/docs/component-detail/demos/sonner-demo').then((m) => ({
        component: m.SonnerDemo,
      })),
    );

    this.registerDemo('field', () =>
      import('@/pages/docs/component-detail/demos/field-demo').then((m) => ({
        component: m.FieldDemo,
      })),
    );

    this.registerDemo('item', () =>
      import('@/pages/docs/component-detail/demos/item-demo').then((m) => ({
        component: m.ItemDemo,
      })),
    );
  }

  private registerDemo(slug: string, loader: () => Promise<ComponentDemo>): void {
    this.demos.set(slug, loader);
  }

  hasDemo(slug: string): boolean {
    return this.demos.has(slug);
  }

  async getDemo(slug: string): Promise<ComponentDemo | null> {
    const loader = this.demos.get(slug);
    if (!loader) return null;
    return loader();
  }
}
