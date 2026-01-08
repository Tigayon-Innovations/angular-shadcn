import { ComponentDocsRegistry } from '@/services/component-docs';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ComponentDetailPage } from './component-detail.component';
import { ComponentDocPage } from './component-doc.component';

/**
 * Smart wrapper component that dispatches to either:
 * - ComponentDocPage: New Radix-style documentation (when available)
 * - ComponentDetailPage: Legacy documentation (fallback)
 *
 * This allows gradual migration to the new documentation format
 * without breaking existing component pages.
 */
@Component({
  selector: 'ComponentDetailRouter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComponentDetailPage, ComponentDocPage],
  template: `
    @if (hasRadixDocs()) {
      <ComponentDocPage [slug]="slug()" />
    } @else {
      <ComponentDetailPage [slug]="slug()" />
    }
  `,
})
export class ComponentDetailRouter {
  private readonly docsRegistry = inject(ComponentDocsRegistry);

  readonly slug = input.required<string>();

  protected readonly hasRadixDocs = computed(() => {
    return this.docsRegistry.hasDocumentation(this.slug());
  });
}
