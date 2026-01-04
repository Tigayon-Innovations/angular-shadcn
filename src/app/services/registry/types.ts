import type { ApiProperty } from '@/components/api-reference';

export type ComponentCategory =
  | 'basic'
  | 'form'
  | 'layout'
  | 'overlay'
  | 'complex'
  | 'advanced';

export interface ComponentInfo {
  name: string;
  slug: string;
  description: string;
  category: ComponentCategory;
  imports: string[];
  examples: ComponentExample[];
  props: ApiProperty[];
  package?: string;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
}

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  basic: 'Basic',
  form: 'Form',
  layout: 'Layout',
  overlay: 'Overlay',
  complex: 'Complex',
  advanced: 'Advanced',
};
