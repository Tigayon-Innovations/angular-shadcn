import { BLOCK_LOADERS } from '@/blocks/block-loaders';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
   ElementRef,
  effect,
  inject,
  input,
  PLATFORM_ID,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

/**
 * Renders a live block component scaled to fit a card-sized thumbnail —
 * the same approach shadcn/ui uses for its block gallery (a full-width
 * render cropped/scaled into a preview window), instead of a placeholder.
 */
@Component({
  selector: 'app-block-thumbnail',
  template: `
    <div
      #frame
      class="absolute top-0 left-0 origin-top-left overflow-hidden bg-background pointer-events-none select-none"
      [style.width.px]="DESIGN_WIDTH"
      [style.height.px]="DESIGN_HEIGHT"
      [style.transform]="'scale(' + scale() + ')'"
    >
      <ng-container #vc />
    </div>
    @if (!loaded()) {
      <div class="absolute inset-0 flex items-center justify-center bg-muted">
        <span class="text-sm text-muted-foreground">Preview</span>
      </div>
    }
  `,
  host: {
    class: 'block relative w-full aspect-video overflow-hidden bg-background',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockThumbnail {
  /** The reference render width; block components are full-page layouts. */
  protected readonly DESIGN_WIDTH = 1440;
  protected readonly DESIGN_HEIGHT = 810; // 16:9

  slug = input.required<string>();

  protected readonly scale = signal(0.25);
  protected readonly loaded = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly vc = viewChild('vc', { read: ViewContainerRef });

  constructor() {
    effect(async () => {
      if (!this.isBrowser) return;
      const container = this.vc();
      const slug = this.slug();
      if (!container) return;

      // Keep the scale in sync with the actual rendered card width.
      const el = this.host.nativeElement as HTMLElement;
      const apply = () => this.scale.set(el.clientWidth / this.DESIGN_WIDTH);
      apply();
      const ro = new ResizeObserver(apply);
      ro.observe(el);

      container.clear();
      try {
        const loader = BLOCK_LOADERS[slug];
        if (loader) {
          const cmp = await loader();
          container.createComponent(cmp);
          this.loaded.set(true);
        }
      } catch {
        this.loaded.set(false);
      }
    });
  }
}
