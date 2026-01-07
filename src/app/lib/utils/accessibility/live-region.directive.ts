import { DOCUMENT } from '@angular/common';
import {
    Directive,
    ElementRef,
    Injectable,
    OnDestroy,
    OnInit,
    inject,
    input,
    signal,
} from '@angular/core';

/**
 * Priority level for announcements.
 * - 'polite': Waits for the user to stop interacting before announcing
 * - 'assertive': Interrupts the user immediately (use sparingly)
 */
export type AnnouncementPriority = 'polite' | 'assertive';

/**
 * Announcement message with metadata.
 */
export interface Announcement {
  message: string;
  priority: AnnouncementPriority;
  timestamp: number;
}

/**
 * Service for making announcements to screen readers via ARIA live regions.
 * Creates and manages hidden live regions for polite and assertive announcements.
 */
@Injectable({ providedIn: 'root' })
export class LiveAnnouncerService implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private politeRegion: HTMLElement | null = null;
  private assertiveRegion: HTMLElement | null = null;
  private readonly announcements = signal<Announcement[]>([]);
  private clearTimeoutId: ReturnType<typeof setTimeout> | null = null;

  /**
   * Makes an announcement to screen readers.
   * @param message - The message to announce
   * @param priority - 'polite' (default) or 'assertive'
   * @param clearAfter - Time in ms to clear the announcement (default: 1000)
   */
  announce(
    message: string,
    priority: AnnouncementPriority = 'polite',
    clearAfter: number = 1000
  ): void {
    this.ensureLiveRegions();

    const region = priority === 'assertive' ? this.assertiveRegion : this.politeRegion;
    if (!region) return;

    // Clear any pending timeout
    if (this.clearTimeoutId) {
      clearTimeout(this.clearTimeoutId);
    }

    // Clear current content first to ensure announcement is made
    region.textContent = '';

    // Use requestAnimationFrame to ensure the clear is processed
    requestAnimationFrame(() => {
      region.textContent = message;

      // Track announcement
      this.announcements.update((list) => [
        ...list,
        { message, priority, timestamp: Date.now() },
      ]);

      // Clear after delay
      this.clearTimeoutId = setTimeout(() => {
        region.textContent = '';
        this.clearTimeoutId = null;
      }, clearAfter);
    });
  }

  /**
   * Makes a polite announcement (waits for user to stop interacting).
   * @param message - The message to announce
   */
  announcePolite(message: string): void {
    this.announce(message, 'polite');
  }

  /**
   * Makes an assertive announcement (interrupts immediately).
   * Use sparingly for critical updates only.
   * @param message - The message to announce
   */
  announceAssertive(message: string): void {
    this.announce(message, 'assertive');
  }

  /**
   * Clears all live regions.
   */
  clear(): void {
    if (this.politeRegion) this.politeRegion.textContent = '';
    if (this.assertiveRegion) this.assertiveRegion.textContent = '';
  }

  /**
   * Gets the announcement history.
   */
  getAnnouncementHistory(): Announcement[] {
    return this.announcements();
  }

  /**
   * Clears the announcement history.
   */
  clearHistory(): void {
    this.announcements.set([]);
  }

  ngOnDestroy(): void {
    if (this.clearTimeoutId) {
      clearTimeout(this.clearTimeoutId);
    }
    this.politeRegion?.remove();
    this.assertiveRegion?.remove();
  }

  /**
   * Ensures live regions exist in the DOM.
   */
  private ensureLiveRegions(): void {
    if (!this.politeRegion) {
      this.politeRegion = this.createLiveRegion('polite');
    }
    if (!this.assertiveRegion) {
      this.assertiveRegion = this.createLiveRegion('assertive');
    }
  }

  /**
   * Creates a hidden live region element.
   */
  private createLiveRegion(priority: AnnouncementPriority): HTMLElement {
    const region = this.document.createElement('div');
    region.setAttribute('aria-live', priority);
    region.setAttribute('aria-atomic', 'true');
    region.setAttribute('role', 'status');
    region.setAttribute('data-live-announcer', priority);
    region.className = 'sr-only';
    region.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;

    this.document.body.appendChild(region);
    return region;
  }
}

/**
 * Directive to turn an element into an ARIA live region.
 * Useful for components that need to announce dynamic content changes.
 *
 * @example
 * ```html
 * <div hlmLiveRegion [livePolite]="true">
 *   {{ dynamicMessage }}
 * </div>
 * ```
 */
@Directive({
  selector: '[hlmLiveRegion]',
  host: {
    '[attr.aria-live]': 'ariaLive()',
    '[attr.aria-atomic]': 'ariaAtomic()',
    '[attr.role]': '"status"',
  },
})
export class LiveRegionDirective implements OnInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Set to true for polite announcements (default) */
  readonly livePolite = input<boolean>(true);

  /** Set to true for assertive announcements */
  readonly liveAssertive = input<boolean>(false);

  /** Whether updates should be announced atomically */
  readonly atomic = input<boolean>(true);

  /** Whether updates are only relevant additions */
  readonly relevant = input<'additions' | 'removals' | 'text' | 'all'>('additions');

  /**
   * Computed aria-live value.
   */
  ariaLive(): AnnouncementPriority {
    return this.liveAssertive() ? 'assertive' : 'polite';
  }

  /**
   * Computed aria-atomic value.
   */
  ariaAtomic(): string {
    return this.atomic() ? 'true' : 'false';
  }

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;
    element.setAttribute('aria-relevant', this.relevant());
  }
}

/**
 * Directive for announcing status messages that appear temporarily.
 * Automatically announces content to screen readers when it changes.
 *
 * @example
 * ```html
 * <div hlmStatusAnnouncer [message]="statusMessage">
 *   {{ statusMessage }}
 * </div>
 * ```
 */
@Directive({
  selector: '[hlmStatusAnnouncer]',
  host: {
    '[attr.role]': '"status"',
    '[attr.aria-live]': '"polite"',
    '[attr.aria-atomic]': '"true"',
  },
})
export class StatusAnnouncerDirective {
  private readonly announcer = inject(LiveAnnouncerService);

  /** The message to announce */
  readonly message = input<string>('');

  /** Priority of the announcement */
  readonly priority = input<AnnouncementPriority>('polite');

  /**
   * Manually triggers an announcement.
   */
  announceNow(customMessage?: string): void {
    const msg = customMessage || this.message();
    if (msg) {
      this.announcer.announce(msg, this.priority());
    }
  }
}
