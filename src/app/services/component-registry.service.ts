import type { ApiProperty } from '@/components/api-reference';
import { Injectable } from '@angular/core';

import {
  type ComponentCategory,
  type ComponentExample,
  type ComponentInfo,
  ADVANCED_COMPONENTS,
  BASIC_COMPONENTS,
  CATEGORY_LABELS,
  COMPLEX_COMPONENTS,
  FORM_COMPONENTS,
  LAYOUT_COMPONENTS,
  OVERLAY_COMPONENTS,
} from './registry';

// Re-export types for backward compatibility
export { ApiProperty };
export type { ComponentCategory, ComponentExample, ComponentInfo };

/**
 * Registry service containing metadata for all 57 components.
 * Components are organized by category for maintainability.
 */
@Injectable({ providedIn: 'root' })
export class ComponentRegistry {
  /** All components combined from category modules */
  private readonly components: ComponentInfo[] = [
    ...BASIC_COMPONENTS,
    ...FORM_COMPONENTS,
    ...LAYOUT_COMPONENTS,
    ...OVERLAY_COMPONENTS,
    ...COMPLEX_COMPONENTS,
    ...ADVANCED_COMPONENTS,
  ];

  /** Category order for display */
  private readonly categoryOrder: ComponentCategory[] = [
    'basic',
    'form',
    'layout',
    'overlay',
    'complex',
    'advanced',
  ];

  /** Get all components */
  getAll(): ComponentInfo[] {
    return this.components;
  }

  /** Get component by slug */
  getBySlug(slug: string): ComponentInfo | undefined {
    return this.components.find((c) => c.slug === slug);
  }

  /** Get components by category */
  getByCategory(category: ComponentCategory): ComponentInfo[] {
    return this.components.filter((c) => c.category === category);
  }

  /** Get all categories with their components */
  getCategories(): { category: ComponentCategory; label: string; components: ComponentInfo[] }[] {
    return this.categoryOrder.map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      components: this.getByCategory(category),
    }));
  }

  /** Search components by name or description */
  search(query: string): ComponentInfo[] {
    const lowerQuery = query.toLowerCase();
    return this.components.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.slug.toLowerCase().includes(lowerQuery)
    );
  }

  /** Get component count */
  getCount(): number {
    return this.components.length;
  }

  /** Get count by category */
  getCountByCategory(category: ComponentCategory): number {
    return this.getByCategory(category).length;
  }
}
