import { BLOCK_LOADERS } from '@/blocks/block-loaders';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'block-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative overflow-hidden bg-background" style="height: 200px">
      <div
        #container
        class="absolute top-0 left-0 pointer-events-none"
        style="transform: scale(0.3); transform-origin: top left; width: calc(100% / 0.3); height: 667px"
      ></div>
    </div>
  `,
})
export class BlockPreview {
  readonly slug = input.required<string>();

  private readonly container = viewChild<any, ViewContainerRef>('container', {
    read: ViewContainerRef,
  });

  constructor() {
    effect(async () => {
      const slug = this.slug();
      const container = this.container();
      if (!container) return;
      container.clear();
      const loader = BLOCK_LOADERS[slug];
      if (loader) {
        try {
          const componentClass = await loader();
          container.createComponent(componentClass);
        } catch (e) {
          console.error('Failed to load block preview:', slug, e);
        }
      }
    });
  }
}
