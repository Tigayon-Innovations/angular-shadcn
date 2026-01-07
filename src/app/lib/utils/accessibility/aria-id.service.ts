import { Injectable, signal } from '@angular/core';

/**
 * Service to generate and manage unique ARIA IDs for accessibility relationships.
 * Handles aria-labelledby, aria-describedby, aria-controls, etc.
 */
@Injectable({ providedIn: 'root' })
export class AriaIdService {
  private readonly counter = signal(0);
  private readonly prefix = 'aria';

  /**
   * Generates a unique ID with an optional prefix.
   * @param customPrefix - Optional prefix for the ID (e.g., 'dialog', 'menu')
   * @returns A unique string ID
   */
  generateId(customPrefix?: string): string {
    const count = this.counter();
    this.counter.set(count + 1);
    const basePrefix = customPrefix ? `${this.prefix}-${customPrefix}` : this.prefix;
    return `${basePrefix}-${count}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Generates a set of related IDs for a component with title and description.
   * Useful for dialogs, alerts, and other components needing ARIA relationships.
   * @param prefix - Component type prefix (e.g., 'dialog', 'alert')
   * @returns Object containing contentId, titleId, and descriptionId
   */
  generateDialogIds(prefix: string = 'dialog'): AriaDialogIds {
    const base = this.generateId(prefix);
    return {
      contentId: `${base}-content`,
      titleId: `${base}-title`,
      descriptionId: `${base}-description`,
    };
  }

  /**
   * Generates IDs for menu/listbox patterns.
   * @param prefix - Component type prefix (e.g., 'menu', 'listbox', 'combobox')
   * @returns Object containing triggerId, contentId, and a function to generate item IDs
   */
  generateMenuIds(prefix: string = 'menu'): AriaMenuIds {
    const base = this.generateId(prefix);
    let itemCounter = 0;

    return {
      triggerId: `${base}-trigger`,
      contentId: `${base}-content`,
      labelId: `${base}-label`,
      generateItemId: () => `${base}-item-${itemCounter++}`,
    };
  }

  /**
   * Generates IDs for tab patterns.
   * @param prefix - Component type prefix
   * @returns Object with functions to generate tab and panel IDs
   */
  generateTabIds(prefix: string = 'tabs'): AriaTabIds {
    const base = this.generateId(prefix);
    let tabCounter = 0;

    return {
      tablistId: `${base}-tablist`,
      generateTabId: () => {
        const id = `${base}-tab-${tabCounter}`;
        tabCounter++;
        return id;
      },
      generatePanelId: (index: number) => `${base}-panel-${index}`,
    };
  }

  /**
   * Generates IDs for accordion patterns.
   * @param prefix - Component type prefix
   * @returns Object with functions to generate trigger and content IDs
   */
  generateAccordionIds(prefix: string = 'accordion'): AriaAccordionIds {
    const base = this.generateId(prefix);
    let itemCounter = 0;

    return {
      generateTriggerId: () => {
        const id = `${base}-trigger-${itemCounter}`;
        itemCounter++;
        return id;
      },
      generateContentId: (index: number) => `${base}-content-${index}`,
    };
  }
}

export interface AriaDialogIds {
  contentId: string;
  titleId: string;
  descriptionId: string;
}

export interface AriaMenuIds {
  triggerId: string;
  contentId: string;
  labelId: string;
  generateItemId: () => string;
}

export interface AriaTabIds {
  tablistId: string;
  generateTabId: () => string;
  generatePanelId: (index: number) => string;
}

export interface AriaAccordionIds {
  generateTriggerId: () => string;
  generateContentId: (index: number) => string;
}
