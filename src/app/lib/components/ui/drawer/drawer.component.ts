import { AriaIdService } from '@/lib/utils/accessibility';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DRAWER_CONTEXT, type DrawerContextValue } from './drawer-context';

/**
 * Drawer component - a modal drawer that slides up from the bottom.
 * Matches shadcn/ui React Drawer exactly with enhanced accessibility.
 *
 * @example
 * <Drawer>
 *   <DrawerTrigger>
 *     <Button variant="outline">Open Drawer</Button>
 *   </DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Drawer Title</DrawerTitle>
 *       <DrawerDescription>Description</DrawerDescription>
 *     </DrawerHeader>
 *     Content here...
 *     <DrawerFooter>
 *       <Button>Submit</Button>
 *       <DrawerClose>
 *         <Button variant="outline">Cancel</Button>
 *       </DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 */
@Component({
  selector: 'Drawer',
  template: `<ng-content />`,
  providers: [
    {
      provide: DRAWER_CONTEXT,
      useExisting: forwardRef(() => Drawer),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer implements DrawerContextValue {
  private readonly ariaIdService = inject(AriaIdService);
  private readonly ariaIds = this.ariaIdService.generateDialogIds('drawer');

  /** Default open state */
  readonly defaultOpen = input<boolean>(false);

  /** Controlled open state */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  /** Direction the drawer appears from */
  readonly direction: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  /** Whether to show the handle bar */
  readonly shouldScaleBackground = input<boolean>(true);

  /** Open change event */
  readonly openChange = output<boolean>();

  readonly open = signal(false);

  /** ARIA IDs for accessibility */
  readonly titleId = this.ariaIds.titleId;
  readonly descriptionId = this.ariaIds.descriptionId;
  readonly contentId = this.ariaIds.contentId;

  /** Reference to the trigger element for focus restoration */
  readonly triggerElement = signal<HTMLElement | null>(null);

  constructor() {
    if (this.defaultOpen()) {
      this.open.set(true);
    }
  }

  setOpen(open: boolean): void {
    if (this.controlledOpen() === undefined) {
      this.open.set(open);
    }
    this.openChange.emit(open);
  }

  isOpen(): boolean {
    return this.controlledOpen() !== undefined ? this.controlledOpen()! : this.open();
  }
}
