import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Empty component - empty state placeholder for when there's no content.
 *
 * @example
 * <!-- Basic empty state -->
 * <Empty>
 *   <EmptyIcon>
 *     <svg>...</svg>
 *   </EmptyIcon>
 *   <EmptyTitle>No results found</EmptyTitle>
 *   <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
 * </Empty>
 *
 * <!-- With action -->
 * <Empty>
 *   <EmptyIcon>
 *     <svg>...</svg>
 *   </EmptyIcon>
 *   <EmptyTitle>No projects yet</EmptyTitle>
 *   <EmptyDescription>Create your first project to get started.</EmptyDescription>
 *   <EmptyAction>
 *     <Button>Create Project</Button>
 *   </EmptyAction>
 * </Empty>
 */
@Component({
  selector: 'Empty',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Empty {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50',
      this.class()
    )
  );
}

/**
 * EmptyIcon component - container for the empty state icon.
 */
@Component({
  selector: 'EmptyIcon',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyIcon {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-6',
      this.class()
    )
  );
}

/**
 * EmptyTitle component - title for the empty state.
 */
@Component({
  selector: 'EmptyTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyTitle {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('mt-4 text-lg font-semibold', this.class())
  );
}

/**
 * EmptyDescription component - description for the empty state.
 */
@Component({
  selector: 'EmptyDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyDescription {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'mb-4 mt-2 text-sm text-muted-foreground max-w-sm mx-auto',
      this.class()
    )
  );
}

/**
 * EmptyAction component - container for action buttons in empty state.
 */
@Component({
  selector: 'EmptyAction',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyAction {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('mt-2', this.class())
  );
}
