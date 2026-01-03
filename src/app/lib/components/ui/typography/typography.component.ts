import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Typography H1 component
 *
 * @example
 * <TypographyH1>Heading 1</TypographyH1>
 */
@Component({
  selector: 'TypographyH1',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyH1 {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      this.class()
    )
  );
}

/**
 * Typography H2 component
 *
 * @example
 * <TypographyH2>Heading 2</TypographyH2>
 */
@Component({
  selector: 'TypographyH2',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyH2 {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      this.class()
    )
  );
}

/**
 * Typography H3 component
 *
 * @example
 * <TypographyH3>Heading 3</TypographyH3>
 */
@Component({
  selector: 'TypographyH3',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyH3 {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('scroll-m-20 text-2xl font-semibold tracking-tight', this.class())
  );
}

/**
 * Typography H4 component
 *
 * @example
 * <TypographyH4>Heading 4</TypographyH4>
 */
@Component({
  selector: 'TypographyH4',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyH4 {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('scroll-m-20 text-xl font-semibold tracking-tight', this.class())
  );
}

/**
 * Typography P (paragraph) component
 *
 * @example
 * <TypographyP>This is a paragraph of text.</TypographyP>
 */
@Component({
  selector: 'TypographyP',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyP {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('leading-7 [&:not(:first-child)]:mt-6', this.class())
  );
}

/**
 * Typography Blockquote component
 *
 * @example
 * <TypographyBlockquote>
 *   "This is a quote from someone important."
 * </TypographyBlockquote>
 */
@Component({
  selector: 'TypographyBlockquote',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyBlockquote {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('mt-6 border-l-2 pl-6 italic', this.class())
  );
}

/**
 * Typography InlineCode component
 *
 * @example
 * <TypographyInlineCode>npm install</TypographyInlineCode>
 */
@Component({
  selector: 'TypographyInlineCode',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyInlineCode {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      this.class()
    )
  );
}

/**
 * Typography Lead component - larger intro text
 *
 * @example
 * <TypographyLead>
 *   A modal dialog that interrupts the user with important content.
 * </TypographyLead>
 */
@Component({
  selector: 'TypographyLead',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyLead {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-xl text-muted-foreground', this.class())
  );
}

/**
 * Typography Large component
 *
 * @example
 * <TypographyLarge>Large text</TypographyLarge>
 */
@Component({
  selector: 'TypographyLarge',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyLarge {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold', this.class())
  );
}

/**
 * Typography Small component
 *
 * @example
 * <TypographySmall>Small text</TypographySmall>
 */
@Component({
  selector: 'TypographySmall',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographySmall {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm font-medium leading-none', this.class())
  );
}

/**
 * Typography Muted component
 *
 * @example
 * <TypographyMuted>Muted helper text</TypographyMuted>
 */
@Component({
  selector: 'TypographyMuted',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyMuted {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

/**
 * Typography List component (unordered list)
 *
 * @example
 * <TypographyList>
 *   <li>Item 1</li>
 *   <li>Item 2</li>
 * </TypographyList>
 */
@Component({
  selector: 'TypographyList',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyList {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('my-6 ml-6 list-disc [&>li]:mt-2', this.class())
  );
}
