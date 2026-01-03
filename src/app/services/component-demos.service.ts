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
    this.registerDemo('button', () =>
      import('@/pages/docs/component-detail/demos/button-demo').then((m) => ({
        component: m.ButtonDemo,
      }))
    );

    this.registerDemo('calendar', () =>
      import('@/pages/docs/component-detail/demos/calendar-demo').then((m) => ({
        component: m.CalendarDemo,
      }))
    );

    this.registerDemo('card', () =>
      import('@/pages/docs/component-detail/demos/card-demo').then((m) => ({
        component: m.CardDemo,
      }))
    );

    this.registerDemo('accordion', () =>
      import('@/pages/docs/component-detail/demos/accordion-demo').then((m) => ({
        component: m.AccordionDemo,
      }))
    );

    this.registerDemo('alert', () =>
      import('@/pages/docs/component-detail/demos/alert-demo').then((m) => ({
        component: m.AlertDemo,
      }))
    );

    this.registerDemo('badge', () =>
      import('@/pages/docs/component-detail/demos/badge-demo').then((m) => ({
        component: m.BadgeDemo,
      }))
    );

    this.registerDemo('checkbox', () =>
      import('@/pages/docs/component-detail/demos/checkbox-demo').then((m) => ({
        component: m.CheckboxDemo,
      }))
    );

    this.registerDemo('input', () =>
      import('@/pages/docs/component-detail/demos/input-demo').then((m) => ({
        component: m.InputDemo,
      }))
    );

    this.registerDemo('label', () =>
      import('@/pages/docs/component-detail/demos/label-demo').then((m) => ({
        component: m.LabelDemo,
      }))
    );

    this.registerDemo('select', () =>
      import('@/pages/docs/component-detail/demos/select-demo').then((m) => ({
        component: m.SelectDemo,
      }))
    );

    this.registerDemo('switch', () =>
      import('@/pages/docs/component-detail/demos/switch-demo').then((m) => ({
        component: m.SwitchDemo,
      }))
    );

    this.registerDemo('tabs', () =>
      import('@/pages/docs/component-detail/demos/tabs-demo').then((m) => ({
        component: m.TabsDemo,
      }))
    );

    this.registerDemo('separator', () =>
      import('@/pages/docs/component-detail/demos/separator-demo').then((m) => ({
        component: m.SeparatorDemo,
      }))
    );

    this.registerDemo('avatar', () =>
      import('@/pages/docs/component-detail/demos/avatar-demo').then((m) => ({
        component: m.AvatarDemo,
      }))
    );

    this.registerDemo('progress', () =>
      import('@/pages/docs/component-detail/demos/progress-demo').then((m) => ({
        component: m.ProgressDemo,
      }))
    );

    this.registerDemo('slider', () =>
      import('@/pages/docs/component-detail/demos/slider-demo').then((m) => ({
        component: m.SliderDemo,
      }))
    );

    this.registerDemo('tooltip', () =>
      import('@/pages/docs/component-detail/demos/tooltip-demo').then((m) => ({
        component: m.TooltipDemo,
      }))
    );

    this.registerDemo('skeleton', () =>
      import('@/pages/docs/component-detail/demos/skeleton-demo').then((m) => ({
        component: m.SkeletonDemo,
      }))
    );

    this.registerDemo('dialog', () =>
      import('@/pages/docs/component-detail/demos/dialog-demo').then((m) => ({
        component: m.DialogDemo,
      }))
    );

    this.registerDemo('sheet', () =>
      import('@/pages/docs/component-detail/demos/sheet-demo').then((m) => ({
        component: m.SheetDemo,
      }))
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
