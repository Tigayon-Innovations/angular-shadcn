import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Checkbox } from '@/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Progress } from '@/ui/progress';
import { Separator } from '@/ui/separator';
import { Skeleton } from '@/ui/skeleton';
import { Switch } from '@/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Textarea } from '@/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import { Injectable, Type } from '@angular/core';

export interface ParsedElement {
  type: 'component' | 'html' | 'text';
  tagName?: string;
  component?: Type<unknown>;
  inputs: Record<string, unknown>;
  children: ParsedElement[];
  content?: string;
}

export interface RenderableNode {
  id: string;
  component: Type<unknown> | null;
  tagName: string;
  inputs: Record<string, unknown>;
  children: RenderableNode[];
  textContent?: string;
  isTextNode: boolean;
  isHtmlElement: boolean;
}

/**
 * Service for parsing template strings and mapping them to Angular components.
 * Since Angular cannot compile templates at runtime, this service parses
 * template-like strings and creates a tree of renderable nodes.
 */
@Injectable({ providedIn: 'root' })
export class DynamicRendererService {
  /** Map of component selectors to their types */
  private readonly componentMap = new Map<string, Type<unknown>>([
    // Button
    ['Button', Button],
    ['button', Button],

    // Card
    ['Card', Card],
    ['CardHeader', CardHeader],
    ['CardTitle', CardTitle],
    ['CardDescription', CardDescription],
    ['CardContent', CardContent],
    ['CardFooter', CardFooter],

    // Badge
    ['Badge', Badge],

    // Alert
    ['Alert', Alert],
    ['AlertTitle', AlertTitle],
    ['AlertDescription', AlertDescription],

    // Accordion
    ['Accordion', Accordion],
    ['AccordionItem', AccordionItem],
    ['AccordionTrigger', AccordionTrigger],
    ['AccordionContent', AccordionContent],

    // Tabs
    ['Tabs', Tabs],
    ['TabsList', TabsList],
    ['TabsTrigger', TabsTrigger],
    ['TabsContent', TabsContent],

    // Form elements
    ['Input', Input],
    ['Label', Label],
    ['Checkbox', Checkbox],
    ['Textarea', Textarea],
    ['Switch', Switch],

    // Dialog
    ['Dialog', Dialog],
    ['DialogTrigger', DialogTrigger],
    ['DialogContent', DialogContent],
    ['DialogHeader', DialogHeader],
    ['DialogTitle', DialogTitle],
    ['DialogDescription', DialogDescription],
    ['DialogFooter', DialogFooter],

    // Avatar
    ['Avatar', Avatar],
    ['AvatarImage', AvatarImage],
    ['AvatarFallback', AvatarFallback],

    // Other
    ['Separator', Separator],
    ['Tooltip', Tooltip],
    ['TooltipTrigger', TooltipTrigger],
    ['TooltipContent', TooltipContent],
    ['Progress', Progress],
    ['Skeleton', Skeleton],
  ]);

  /** HTML elements that should be rendered as-is */
  private readonly htmlElements = new Set([
    'div',
    'span',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'section',
    'article',
    'header',
    'footer',
    'nav',
    'main',
    'aside',
    'ul',
    'ol',
    'li',
    'a',
    'img',
    'br',
    'hr',
    'strong',
    'em',
    'code',
    'pre',
  ]);

  /**
   * Parse a template string and return a tree of renderable nodes.
   */
  parse(template: string): RenderableNode[] {
    const trimmed = template.trim();
    if (!trimmed) {
      return [];
    }

    try {
      const parser = new DOMParser();
      // Wrap in a root element to handle multiple top-level elements
      const doc = parser.parseFromString(`<root>${trimmed}</root>`, 'text/html');
      const root = doc.body.querySelector('root');

      if (!root) {
        return [];
      }

      return this.parseChildren(root);
    } catch (error) {
      console.error('Failed to parse template:', error);
      return [];
    }
  }

  private parseChildren(element: Element): RenderableNode[] {
    const nodes: RenderableNode[] = [];

    for (const child of Array.from(element.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent?.trim();
        if (text) {
          nodes.push({
            id: this.generateId(),
            component: null,
            tagName: 'text',
            inputs: {},
            children: [],
            textContent: text,
            isTextNode: true,
            isHtmlElement: false,
          });
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element;
        nodes.push(this.parseElement(el));
      }
    }

    return nodes;
  }

  private parseElement(element: Element): RenderableNode {
    const tagName = element.tagName;

    // Try exact match first, then case-insensitive
    let component = this.componentMap.get(tagName) ?? null;
    let normalizedTagName = tagName;

    if (!component) {
      const key = Array.from(this.componentMap.keys()).find(
        (k) => k.toLowerCase() === tagName.toLowerCase(),
      );
      if (key) {
        component = this.componentMap.get(key) ?? null;
        normalizedTagName = key;
      }
    }

    const isHtmlElement = this.htmlElements.has(tagName.toLowerCase());
    const inputs = this.parseAttributes(element);
    const children = this.parseChildren(element);

    return {
      id: this.generateId(),
      component,
      tagName: normalizedTagName,
      inputs,
      children,
      isTextNode: false,
      isHtmlElement: isHtmlElement || !component,
    };
  }

  private parseAttributes(element: Element): Record<string, unknown> {
    const inputs: Record<string, unknown> = {};

    for (const attr of Array.from(element.attributes)) {
      const name = attr.name;
      const value = attr.value;

      // Handle Angular-style two-way bindings [(prop)]="value"
      if (name.startsWith('[(') && name.endsWith(')]')) {
        const propName = name.slice(2, -2);
        inputs[propName] = this.evaluateValue(value);
      }
      // Handle Angular-style bindings [prop]="value"
      else if (name.startsWith('[') && name.endsWith(']')) {
        const propName = name.slice(1, -1);
        // Try to evaluate the value
        inputs[propName] = this.evaluateValue(value);
      }
      // Handle class attribute
      else if (name === 'class') {
        inputs['class'] = value;
      }
      // Handle boolean attributes (no value means true)
      else if (value === '' || value === name) {
        inputs[name] = true;
      }
      // Handle regular attributes
      else {
        inputs[name] = this.evaluateValue(value);
      }
    }

    return inputs;
  }

  private evaluateValue(value: string): unknown {
    // Handle boolean strings
    if (value === 'true') return true;
    if (value === 'false') return false;

    // Handle numbers
    const num = Number(value);
    if (!isNaN(num) && value !== '') return num;

    // Return as string
    return value;
  }

  private generateId(): string {
    return `node-${Math.random().toString(36).slice(2, 11)}`;
  }

  /**
   * Get a component type by its selector name.
   */
  getComponent(name: string): Type<unknown> | undefined {
    return this.componentMap.get(name);
  }

  /**
   * Check if a tag name is a known component.
   */
  isKnownComponent(tagName: string): boolean {
    return this.componentMap.has(tagName);
  }

  /**
   * Get all available component names.
   */
  getAvailableComponents(): string[] {
    return Array.from(this.componentMap.keys());
  }
}
