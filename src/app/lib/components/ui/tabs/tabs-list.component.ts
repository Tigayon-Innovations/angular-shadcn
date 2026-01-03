import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * TabsList component - container for tab triggers.
 *
 * @example
 * <TabsList>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 */
@Component({
  selector: 'TabsList',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'role': 'tablist',
    '[attr.aria-orientation]': '"horizontal"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsList {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1',
      this.class()
    )
  );
}
